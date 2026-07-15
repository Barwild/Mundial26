const express = require('express');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

let dbMemory = null;
let pgPool = null;
let lastDbError = null;

function getPool() {
  if (!pgPool) {
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (dbUrl) {
      pgPool = new Pool({
        connectionString: dbUrl,
        ssl: { rejectUnauthorized: false },
        max: 5, // Vercel low connection count limit
        idleTimeoutMillis: 15000,
        connectionTimeoutMillis: 2000,
      });
    }
  }
  return pgPool;
}

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.VERCEL || process.env.VERCEL_ENV ? '/tmp/data.json' : path.join(__dirname, 'data.json');
// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from current directory
app.use(express.static(__dirname));

// Initial Database Template
const INITIAL_DB = {
  adminPassword: 'admin',
  autoSync: true,
  participants: [],
  actualResults: {
    name: 'Resultados Reales',
    contact: 'ADMIN_REAL_RESULTS',
    avatar: '🏆',
    resolvedGroups: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    groups: {
      A: ["MEX", "RSA", "KOR", "CZE"],
      B: ["SUI", "CAN", "BIH", "QAT"],
      C: ["BRA", "MAR", "SCO", "HAI"],
      D: ["USA", "AUS", "PAR", "TUR"],
      E: ["GER", "CIV", "ECU", "CUW"],
      F: ["NED", "JPN", "SWE", "TUN"],
      G: ["BEL", "EGY", "IRN", "NZL"],
      H: ["ESP", "CPV", "URU", "KSA"],
      I: ["FRA", "NOR", "SEN", "IRQ"],
      J: ["ARG", "AUT", "ALG", "JOR"],
      K: ["COL", "POR", "COD", "UZB"],
      L: ["ENG", "CRO", "GHA", "PAN"]
    },
    wildcards: ["COD", "SWE", "ECU", "GHA", "BIH", "ALG", "PAR", "SEN"],
    bracket: {
      r32: Array(16).fill(null),
      r16: Array(8).fill(null),
      qf: Array(4).fill(null),
      sf: Array(2).fill(null),
      f: null
    },
    extras: {
      scorer: '',
      mvp: '',
      goals: 280
    },
    realR16Teams: ["PAR", "FRA", "CAN", "MAR", "BRA", "NOR", "MEX", "ENG", "POR", "ESP", "USA", "BEL", "ARG", "EGY", "SUI", "COL"],
    realQFTeams: ["FRA", "MAR", "ESP", "BEL", "NOR", "ENG", "ARG", "SUI"],
    realSFTeams: [],
    realFinalTeams: [],
    realChampion: null
  }
};

// Initialize DB file if not exists
async function initDB() {
  const pool = getPool();
  if (pool) {
    console.log('🔌 Base de datos detectada (DATABASE_URL o POSTGRES_URL). Configurando conexión con PostgreSQL...');
    try {
      // Crear tabla si no existe
      await pool.query('CREATE TABLE IF NOT EXISTS mundial_2026_data (key VARCHAR(255) PRIMARY KEY, value TEXT)');

      // Cargar base de datos desde PostgreSQL
      const res = await pool.query('SELECT value FROM mundial_2026_data WHERE key = $1', ['db']);
      if (res.rows.length > 0) {
        dbMemory = JSON.parse(res.rows[0].value);
        console.log('📂 Datos de la porra cargados exitosamente desde PostgreSQL.');
      } else {
        // Inicializar por primera vez
        dbMemory = JSON.parse(JSON.stringify(INITIAL_DB));
        await pool.query('INSERT INTO mundial_2026_data (key, value) VALUES ($1, $2)', ['db', JSON.stringify(dbMemory)]);
        console.log('🆕 Base de datos inicializada por primera vez en PostgreSQL.');
      }

      // Guardar una copia local de respaldo
      fs.writeFileSync(DB_FILE, JSON.stringify(dbMemory, null, 2), 'utf8');
      lastDbError = null;
      return;
    } catch (err) {
      console.error('❌ Error de conexión o inicialización de PostgreSQL:', err.message);
      lastDbError = err.message;
      console.log('⚠️ Rebotando a base de datos de archivos local (data.json)...');
    }
  }

  // Caída a base de datos local
  if (!fs.existsSync(DB_FILE)) {
    dbMemory = JSON.parse(JSON.stringify(INITIAL_DB));
    fs.writeFileSync(DB_FILE, JSON.stringify(dbMemory, null, 2), 'utf8');
    console.log('Base de datos inicializada: data.json creado.');
  } else {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      dbMemory = JSON.parse(data);
    } catch (err) {
      console.error('Error leyendo base de datos local:', err);
      dbMemory = JSON.parse(JSON.stringify(INITIAL_DB));
    }
  }

  // Autorelleno de campos
  if (dbMemory.autoSync === undefined) dbMemory.autoSync = true;
  if (!dbMemory.actualResults.resolvedGroups) dbMemory.actualResults.resolvedGroups = [];
  if (!dbMemory.actualResults.wildcards) dbMemory.actualResults.wildcards = [];
}

// Read database
function readDB() {
  if (!dbMemory) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      dbMemory = JSON.parse(data);
    } catch (err) {
      dbMemory = JSON.parse(JSON.stringify(INITIAL_DB));
    }
  }
  
  if (dbMemory.autoSync === undefined) dbMemory.autoSync = true;
  
  // Garantizar que actualResults contenga los datos cargados del Mundial 2026 de forma predeterminada
  if (!dbMemory.actualResults) {
    dbMemory.actualResults = JSON.parse(JSON.stringify(INITIAL_DB.actualResults));
  }
  if (!dbMemory.actualResults.realR16Teams || dbMemory.actualResults.realR16Teams.length === 0) {
    dbMemory.actualResults.realR16Teams = [...INITIAL_DB.actualResults.realR16Teams];
  }
  if (!dbMemory.actualResults.realQFTeams || dbMemory.actualResults.realQFTeams.length === 0) {
    dbMemory.actualResults.realQFTeams = [...INITIAL_DB.actualResults.realQFTeams];
  }
  if (!dbMemory.actualResults.resolvedGroups || dbMemory.actualResults.resolvedGroups.length === 0) {
    dbMemory.actualResults.resolvedGroups = [...INITIAL_DB.actualResults.resolvedGroups];
  }
  if (!dbMemory.actualResults.wildcards || dbMemory.actualResults.wildcards.length === 0) {
    dbMemory.actualResults.wildcards = [...INITIAL_DB.actualResults.wildcards];
  }
  if (!dbMemory.actualResults.groups || Object.keys(dbMemory.actualResults.groups).length === 0) {
    dbMemory.actualResults.groups = { ...INITIAL_DB.actualResults.groups };
  }
  if (dbMemory.actualResults.extras.goals === null || dbMemory.actualResults.extras.goals === undefined) {
    dbMemory.actualResults.extras.goals = INITIAL_DB.actualResults.extras.goals;
  }
  
  return dbMemory;
}

// Write database
async function writeDB(data) {
  dbMemory = data;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error escribiendo en la base de datos local:', err);
  }

  const pool = getPool();
  if (pool) {
    try {
      await pool.query('INSERT INTO mundial_2026_data (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', ['db', JSON.stringify(data)]);
    } catch (err) {
      console.error('❌ Error persistiendo datos en PostgreSQL:', err.message);
      throw err; // Propagate error so API requests fail when DB fails to write!
    }
  }
}

// Helper: Check admin auth header
function verifyAdmin(req, res, next) {
  const password = req.headers['x-admin-password'];
  const db = readDB();
  const serverPassword = db.adminPassword || 'admin';
  if (password === serverPassword) {
    next();
  } else {
    res.status(401).json({ error: 'Contraseña de administrador incorrecta.' });
  }
}

// ==========================================
// WORLD CUP 2026 STANDINGS & GAMES SYNC (EXTERNAL API)
// ==========================================

const TEAM_MAP = {
  "1": "MEX", "2": "RSA", "3": "KOR", "4": "CZE", "5": "CAN", "6": "BIH",
  "7": "QAT", "8": "SUI", "9": "BRA", "10": "MAR", "11": "HAI", "12": "SCO",
  "13": "USA", "14": "PAR", "15": "AUS", "16": "TUR", "17": "GER", "18": "CUW",
  "19": "CIV", "20": "ECU", "21": "NED", "22": "JPN", "23": "SWE", "24": "TUN",
  "25": "BEL", "26": "EGY", "27": "IRN", "28": "NZL", "29": "ESP", "30": "CPV",
  "31": "KSA", "32": "URU", "33": "FRA", "34": "SEN", "35": "IRQ", "36": "NOR",
  "37": "ARG", "38": "ALG", "39": "AUT", "40": "JOR", "41": "POR", "42": "COD",
  "43": "UZB", "44": "COL", "45": "ENG", "46": "CRO", "47": "GHA", "48": "PAN"
};

const R32_MATCH_DEFS = [
  { id: 0, title: 'Partido 1', t1: { source: 'group-rank', group: 'A', rank: 1 }, t2: { source: 'wildcard', index: 0 } },
  { id: 1, title: 'Partido 2', t1: { source: 'group-rank', group: 'B', rank: 1 }, t2: { source: 'group-rank', group: 'C', rank: 2 } },
  { id: 2, title: 'Partido 3', t1: { source: 'group-rank', group: 'C', rank: 1 }, t2: { source: 'wildcard', index: 1 } },
  { id: 3, title: 'Partido 4', t1: { source: 'group-rank', group: 'D', rank: 1 }, t2: { source: 'group-rank', group: 'E', rank: 2 } },
  { id: 4, title: 'Partido 5', t1: { source: 'group-rank', group: 'E', rank: 1 }, t2: { source: 'wildcard', index: 2 } },
  { id: 5, title: 'Partido 6', t1: { source: 'group-rank', group: 'F', rank: 1 }, t2: { source: 'group-rank', group: 'G', rank: 2 } },
  { id: 6, title: 'Partido 7', t1: { source: 'group-rank', group: 'G', rank: 1 }, t2: { source: 'wildcard', index: 3 } },
  { id: 7, title: 'Partido 8', t1: { source: 'group-rank', group: 'H', rank: 1 }, t2: { source: 'group-rank', group: 'I', rank: 2 } },
  { id: 8, title: 'Partido 9', t1: { source: 'group-rank', group: 'I', rank: 1 }, t2: { source: 'wildcard', index: 4 } },
  { id: 9, title: 'Partido 10', t1: { source: 'group-rank', group: 'J', rank: 1 }, t2: { source: 'group-rank', group: 'K', rank: 2 } },
  { id: 10, title: 'Partido 11', t1: { source: 'group-rank', group: 'K', rank: 1 }, t2: { source: 'wildcard', index: 5 } },
  { id: 11, title: 'Partido 12', t1: { source: 'group-rank', group: 'L', rank: 1 }, t2: { source: 'group-rank', group: 'A', rank: 2 } },
  { id: 12, title: 'Partido 13', t1: { source: 'group-rank', group: 'B', rank: 2 }, t2: { source: 'wildcard', index: 6 } },
  { id: 13, title: 'Partido 14', t1: { source: 'group-rank', group: 'D', rank: 2 }, t2: { source: 'group-rank', group: 'F', rank: 2 } },
  { id: 14, title: 'Partido 15', t1: { source: 'group-rank', group: 'H', rank: 2 }, t2: { source: 'wildcard', index: 7 } },
  { id: 15, title: 'Partido 16', t1: { source: 'group-rank', group: 'J', rank: 2 }, t2: { source: 'group-rank', group: 'L', rank: 2 } }
];

async function syncExternalData() {
  console.log('🔄 Iniciando sincronización de datos con el servidor de internet (https://worldcup26.ir)...');
  try {
    const db = readDB();
    if (db.autoSync === false) {
      console.log('ℹ️ Sincronización automática desactivada por el administrador (Manual Override).');
      return { success: false, reason: 'manual_override' };
    }

    // 1. Obtener posiciones de grupos
    const resGroups = await fetch('https://worldcup26.ir/get/groups');
    if (!resGroups.ok) throw new Error(`HTTP ${resGroups.status} obteniendo grupos.`);
    const dataGroups = await resGroups.json();
    const groupsList = dataGroups.groups;

    if (!groupsList || !Array.isArray(groupsList)) {
      throw new Error('Formato de grupos recibido inválido.');
    }

    const resolvedGroups = [];
    const thirdPlacesInfo = [];

    // Parsear cada grupo
    groupsList.forEach(group => {
      const groupName = group.name; // "A", "B", etc.
      const teams = group.teams;   // Array de 4 equipos

      if (!groupName || !teams || teams.length !== 4) return;

      // Ordenar equipos por puntos desc, gd desc, gf desc, w desc
      const sortedTeams = [...teams].sort((a, b) => {
        const ptsA = parseInt(a.pts || 0);
        const ptsB = parseInt(b.pts || 0);
        if (ptsB !== ptsA) return ptsB - ptsA;
        const gdA = parseInt(a.gd || 0);
        const gdB = parseInt(b.gd || 0);
        if (gdB !== gdA) return gdB - gdA;
        const gfA = parseInt(a.gf || 0);
        const gfB = parseInt(b.gf || 0);
        if (gfB !== gfA) return gfB - gfA;
        const wA = parseInt(a.w || 0);
        const wB = parseInt(b.w || 0);
        return wB - wA;
      });

      // Actualizar clasificación en bd
      db.actualResults.groups[groupName] = sortedTeams.map(t => TEAM_MAP[t.team_id]).filter(Boolean);

      // Comprobar si el grupo ha finalizado (suma de partidos jugados >= 12)
      const totalMP = teams.reduce((sum, t) => sum + parseInt(t.mp || 0), 0);
      if (totalMP >= 12) {
        resolvedGroups.push(groupName);
      }

      // Recoger estadísticas de terceros
      const thirdTeam = sortedTeams[2];
      if (thirdTeam) {
        thirdPlacesInfo.push({
          team_id: thirdTeam.team_id,
          pts: parseInt(thirdTeam.pts || 0),
          gd: parseInt(thirdTeam.gd || 0),
          gf: parseInt(thirdTeam.gf || 0),
          w: parseInt(thirdTeam.w || 0)
        });
      }
    });

    db.actualResults.resolvedGroups = resolvedGroups;
    console.log(`✅ Grupos finalizados: [${resolvedGroups.join(', ')}]`);

    // 2. Calcular mejores terceros
    if (resolvedGroups.length === 12) {
      thirdPlacesInfo.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return b.w - a.w;
      });
      db.actualResults.wildcards = thirdPlacesInfo.slice(0, 8).map(t => TEAM_MAP[t.team_id]).filter(Boolean);
      console.log('✅ Mejores terceros (wildcards) actualizados:', db.actualResults.wildcards);
    }

    // 3. Obtener partidos y calcular eliminatorias
    const resGames = await fetch('https://worldcup26.ir/get/games');
    if (!resGames.ok) throw new Error(`HTTP ${resGames.status} obteniendo partidos.`);
    const dataGames = await resGames.json();
    const games = dataGames.games;

    if (!games || !Array.isArray(games)) {
      throw new Error('Formato de partidos recibido inválido.');
    }

    // Extraer sets de equipos que llegaron a cada eliminatoria real
    const getAdvancedTeamsForRound = (roundType) => {
      const advanced = new Set();
      games.forEach(g => {
        if (g.type === roundType) {
          if (g.home_team_id && g.home_team_id !== "0") {
            const code = TEAM_MAP[g.home_team_id];
            if (code) advanced.add(code);
          }
          if (g.away_team_id && g.away_team_id !== "0") {
            const code = TEAM_MAP[g.away_team_id];
            if (code) advanced.add(code);
          }
        }
      });
      return advanced;
    };

    const realR16Teams = getAdvancedTeamsForRound('r16');
    const realQFTeams = getAdvancedTeamsForRound('qf');
    const realSFTeams = getAdvancedTeamsForRound('sf');
    const realFinalTeams = getAdvancedTeamsForRound('final');

    // Propagación del Bracket
    // R32
    const r32Pairs = R32_MATCH_DEFS.map(def => {
      const t1 = db.actualResults.groups[def.t1.group][0];
      const t2 = def.t2.source === 'wildcard' ? db.actualResults.wildcards[def.t2.index] : db.actualResults.groups[def.t2.group][1];
      return [t1 || null, t2 || null];
    });
    const r32Winners = r32Pairs.map(pair => {
      if (!pair[0] || !pair[1]) return null;
      if (realR16Teams.has(pair[0])) return 0;
      if (realR16Teams.has(pair[1])) return 1;
      return null;
    });
    db.actualResults.bracket.r32 = r32Winners;

    // R16
    const r16Pairs = [];
    for (let i = 0; i < 8; i++) {
      const w1 = r32Winners[2 * i] !== null ? r32Pairs[2 * i][r32Winners[2 * i]] : null;
      const w2 = r32Winners[2 * i + 1] !== null ? r32Pairs[2 * i + 1][r32Winners[2 * i + 1]] : null;
      r16Pairs.push([w1, w2]);
    }
    const r16Winners = r16Pairs.map(pair => {
      if (!pair[0] || !pair[1]) return null;
      if (realQFTeams.has(pair[0])) return 0;
      if (realQFTeams.has(pair[1])) return 1;
      return null;
    });
    db.actualResults.bracket.r16 = r16Winners;

    // QF
    const qfPairs = [];
    for (let i = 0; i < 4; i++) {
      const w1 = r16Winners[2 * i] !== null ? r16Pairs[2 * i][r16Winners[2 * i]] : null;
      const w2 = r16Winners[2 * i + 1] !== null ? r16Pairs[2 * i + 1][r16Winners[2 * i + 1]] : null;
      qfPairs.push([w1, w2]);
    }
    const qfWinners = qfPairs.map(pair => {
      if (!pair[0] || !pair[1]) return null;
      if (realSFTeams.has(pair[0])) return 0;
      if (realSFTeams.has(pair[1])) return 1;
      return null;
    });
    db.actualResults.bracket.qf = qfWinners;

    // SF
    const sfPairs = [];
    for (let i = 0; i < 2; i++) {
      const w1 = qfWinners[2 * i] !== null ? qfPairs[2 * i][qfWinners[2 * i]] : null;
      const w2 = qfWinners[2 * i + 1] !== null ? qfPairs[2 * i + 1][qfWinners[2 * i + 1]] : null;
      sfPairs.push([w1, w2]);
    }
    const sfWinners = sfPairs.map(pair => {
      if (!pair[0] || !pair[1]) return null;
      if (realFinalTeams.has(pair[0])) return 0;
      if (realFinalTeams.has(pair[1])) return 1;
      return null;
    });
    db.actualResults.bracket.sf = sfWinners;

    // Final y Campeón
    const finalPair = [
      sfWinners[0] !== null ? sfPairs[0][sfWinners[0]] : null,
      sfWinners[1] !== null ? sfPairs[1][sfWinners[1]] : null
    ];
    let finalWinnerIdx = null;
    let realWinnerCode = null;

    const finalGame = games.find(g => g.type === 'final');
    if (finalGame && finalGame.finished === "TRUE") {
      const hScoreStr = finalGame.home_score || "0";
      const aScoreStr = finalGame.away_score || "0";
      
      const parseGoals = (scoreStr) => {
        const match = scoreStr.match(/(\d+)\s*\((\d+)\)/);
        if (match) {
          return { main: parseInt(match[1]), penalty: parseInt(match[2]) };
        }
        return { main: parseInt(scoreStr), penalty: null };
      };

      const hGoals = parseGoals(hScoreStr);
      const aGoals = parseGoals(aScoreStr);
      const homeCode = TEAM_MAP[finalGame.home_team_id];
      const awayCode = TEAM_MAP[finalGame.away_team_id];

      realWinnerCode = null;
      if (hGoals.main > aGoals.main) {
        realWinnerCode = homeCode;
      } else if (aGoals.main > hGoals.main) {
        realWinnerCode = awayCode;
      } else if (hGoals.penalty !== null && aGoals.penalty !== null) {
        if (hGoals.penalty > aGoals.penalty) realWinnerCode = homeCode;
        else if (aGoals.penalty > hGoals.penalty) realWinnerCode = awayCode;
      }

      if (realWinnerCode) {
        if (finalPair[0] === realWinnerCode) finalWinnerIdx = 0;
        else if (finalPair[1] === realWinnerCode) finalWinnerIdx = 1;
      }
    }
    db.actualResults.bracket.f = finalWinnerIdx;

    // 4. Sumar Goles Totales del Mundial
    let totalGoals = 0;
    let anyFinished = false;
    games.forEach(g => {
      if (g.finished === "TRUE") {
        anyFinished = true;
        const parseMainGoals = (scoreStr) => {
          const match = scoreStr.match(/(\d+)/);
          return match ? parseInt(match[1]) : 0;
        };
        totalGoals += parseMainGoals(g.home_score || "0") + parseMainGoals(g.away_score || "0");
      }
    });

    if (anyFinished) {
      db.actualResults.extras.goals = totalGoals;
    }

    db.actualResults.realR16Teams = Array.from(realR16Teams);
    db.actualResults.realQFTeams = Array.from(realQFTeams);
    db.actualResults.realSFTeams = Array.from(realSFTeams);
    db.actualResults.realFinalTeams = Array.from(realFinalTeams);
    db.actualResults.realChampion = realWinnerCode || null;

    await writeDB(db);
    console.log('✅ Sincronización finalizada correctamente.');
    return { success: true, resolvedGroupsCount: resolvedGroups.length, totalGoals };
  } catch (err) {
    console.error('❌ Error durante la sincronización:', err.message);
    throw err;
  }
}

// ==========================================
// REST API ENDPOINTS
// ==========================================

let isDbInitialized = false;
let dbInitPromise = null;

async function ensureDbInit(req, res, next) {
  if (!isDbInitialized) {
    if (!dbInitPromise) {
      dbInitPromise = initDB().then(() => {
        isDbInitialized = true;
      }).catch(err => {
        console.error('Error inicializando base de datos en middleware:', err);
        dbInitPromise = null; // Permitir reintentar
      });
    }
    await dbInitPromise;
  }

  // Check health: if Postgres is configured but offline, and local cache is empty, fail to prevent serving blank data.
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (dbUrl && lastDbError) {
    const isLocalEmpty = !dbMemory || !dbMemory.participants || dbMemory.participants.length <= 1;
    if (isLocalEmpty) {
      return res.status(503).json({
        error: 'La base de datos PostgreSQL no está disponible y el almacenamiento local está vacío.',
        dbConnected: false,
        dbUrlPresent: true,
        dbError: lastDbError
      });
    }
  }

  // Reload the database state from PostgreSQL on every request if pgClient is connected
  // to avoid serving stale in-memory data in stateless/serverless instances!
  const pool = getPool();
  if (pool) {
    try {
      const resDb = await pool.query('SELECT value FROM mundial_2026_data WHERE key = $1', ['db']);
      if (resDb.rows.length > 0) {
        dbMemory = JSON.parse(resDb.rows[0].value);
        // Also update local copy
        try {
          fs.writeFileSync(DB_FILE, JSON.stringify(dbMemory, null, 2), 'utf8');
        } catch (fsErr) {}
      }
      lastDbError = null; // Reset error on successful query
    } catch (dbErr) {
      console.error('❌ Error recargando datos desde PostgreSQL en middleware:', dbErr.message);
      lastDbError = dbErr.message;
    }
  }

  const db = readDB();
  const now = Date.now();
  // Auto-sincronizar y AWAIT para asegurar que termine antes de que Vercel congele la función
  // Forzamos la sincronización si faltan las listas reales de clasificados en actualResults
  const needsRealTeamsSync = db.autoSync !== false && (!db.actualResults.realR16Teams || db.actualResults.realR16Teams.length === 0);
  if (db.autoSync !== false && (!db.lastSyncTime || now - db.lastSyncTime > 600000 || needsRealTeamsSync)) {
    db.lastSyncTime = now;
    await writeDB(db);
    console.log('🔄 Activando sincronización por solicitud de API...');
    try {
      await syncExternalData();
    } catch (err) {
      console.error('Error en sincronización automática activa:', err.message);
    }
  }

  next();
}

app.use('/api', ensureDbInit);

// POST change password
app.post('/api/change-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Faltan campos: contraseña antigua y nueva.' });
  }
  
  const db = readDB();
  const serverPassword = db.adminPassword || 'admin';
  
  if (oldPassword !== serverPassword) {
    return res.status(401).json({ error: 'La contraseña actual es incorrecta.' });
  }
  
  db.adminPassword = newPassword;
  await writeDB(db);
  console.log('Contraseña de administrador modificada correctamente.');
  res.json({ success: true, message: 'Contraseña cambiada con éxito.' });
});

// GET participants
app.get('/api/participants', (req, res) => {
  const db = readDB();
  res.json(db.participants);
});

// POST participant (create/update)
app.post('/api/participants', async (req, res) => {
  const newBet = req.body;
  
  if (!newBet || !newBet.name || !newBet.contact) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: nombre o contacto.' });
  }
  
  const db = readDB();
  
  // Check if administrator password is provided
  const password = req.headers['x-admin-password'];
  const serverPassword = db.adminPassword || 'admin';
  const isAdmin = password === serverPassword;
  
  if (!isAdmin) {
    return res.status(403).json({ error: 'El registro y modificación de apuestas está cerrado.' });
  }
  
  // Find if already exists by contact (unique key)
  const existingIdx = db.participants.findIndex(p => p.contact === newBet.contact);
  
  if (existingIdx > -1) {
    // Preserve paid status and current server score from existing entry
    const existing = db.participants[existingIdx];
    db.participants[existingIdx] = {
      ...newBet,
      paid: existing.paid,
      score: existing.score
    };
    console.log(`Apuesta actualizada por Admin para: ${newBet.name} (${newBet.contact})`);
  } else {
    // Push new
    db.participants.push({
      ...newBet,
      paid: false,
      score: 0
    });
    console.log(`Nueva apuesta registrada por Admin: ${newBet.name} (${newBet.contact})`);
  }
  
  await writeDB(db);
  res.json({ success: true, message: '¡Apuesta guardada con éxito!' });
});

// GET actual results
app.get('/api/results', (req, res) => {
  const db = readDB();
  res.json({
    ...db.actualResults,
    autoSync: db.autoSync !== false,
    dbConnected: getPool() !== null && !lastDbError,
    dbUrlPresent: !!process.env.DATABASE_URL || !!process.env.POSTGRES_URL,
    dbError: lastDbError,
    isVercel: !!(process.env.VERCEL || process.env.VERCEL_ENV)
  });
});

// POST actual results (Admin only)
app.post('/api/results', verifyAdmin, async (req, res) => {
  const newResults = req.body;
  
  if (!newResults) {
    return res.status(400).json({ error: 'Datos de resultados inválidos.' });
  }
  
  const db = readDB();
  db.actualResults = newResults;
  
  // Limpiar arrays reales para forzar la propagación manual basada en el cuadro
  delete db.actualResults.realR16Teams;
  delete db.actualResults.realQFTeams;
  delete db.actualResults.realSFTeams;
  delete db.actualResults.realFinalTeams;
  delete db.actualResults.realChampion;
  
  // Desactivar sincronización automática para respetar la modificación manual
  db.autoSync = false;
  
  await writeDB(db);
  
  console.log('Resultados oficiales del Mundial actualizados manualmente por el Administrador. Sincronización automática DESACTIVADA.');
  res.json({ success: true, message: 'Resultados reales guardados con éxito y sincronización automática desactivada.', autoSync: false });
});

// POST force sync results from API (Admin only)
app.post('/api/sync', verifyAdmin, async (req, res) => {
  try {
    const db = readDB();
    db.autoSync = true; // Activar de nuevo al solicitar sync manual
    await writeDB(db);
    
    const result = await syncExternalData();
    res.json({ success: true, message: 'Sincronización manual realizada.', result });
  } catch (err) {
    res.status(500).json({ error: 'Error al conectar con la API del Mundial: ' + err.message });
  }
});

// POST toggle auto-sync (Admin only)
app.post('/api/toggle-autosync', verifyAdmin, async (req, res) => {
  const { enabled } = req.body;
  if (enabled === undefined) return res.status(400).json({ error: 'Falta parámetro: enabled.' });
  
  const db = readDB();
  db.autoSync = !!enabled;
  await writeDB(db);
  
  console.log(`Estado de Sincronización Automática cambiado a: ${db.autoSync ? 'ACTIVADO' : 'DESACTIVADO'}`);
  res.json({ success: true, autoSync: db.autoSync });
});

// POST toggle paid status (Admin only)
app.post('/api/participants/toggle-paid', verifyAdmin, async (req, res) => {
  const { contact } = req.body;
  if (!contact) return res.status(400).json({ error: 'Contacto requerido.' });
  
  const db = readDB();
  const idx = db.participants.findIndex(p => p.contact === contact);
  
  if (idx > -1) {
    db.participants[idx].paid = !db.participants[idx].paid;
    await writeDB(db);
    res.json({ success: true, paid: db.participants[idx].paid });
    console.log(`Estado de pago de ${db.participants[idx].name} cambiado a: ${db.participants[idx].paid ? 'PAGADO' : 'PENDIENTE'}`);
  } else {
    res.status(404).json({ error: 'Participante no encontrado.' });
  }
});

// POST delete participant (Admin only)
app.post('/api/participants/delete', verifyAdmin, async (req, res) => {
  const { contact } = req.body;
  if (!contact) return res.status(400).json({ error: 'Contacto requerido.' });
  
  const db = readDB();
  const initialCount = db.participants.length;
  db.participants = db.participants.filter(p => p.contact !== contact);
  
  if (db.participants.length < initialCount) {
    await writeDB(db);
    res.json({ success: true });
    console.log(`Participante con contacto ${contact} eliminado.`);
  } else {
    res.status(404).json({ error: 'Participante no encontrado.' });
  }
});

// POST reset system (Admin only)
app.post('/api/reset', verifyAdmin, async (req, res) => {
  await writeDB(INITIAL_DB);
  console.log('Base de datos restablecida completamente a valores de fábrica.');
  res.json({ success: true, message: 'Base de datos restablecida.' });
});

// POST restore backup (Admin only)
app.post('/api/restore', verifyAdmin, async (req, res) => {
  const backup = req.body;
  if (!backup || !backup.participants || !Array.isArray(backup.participants)) {
    return res.status(400).json({ error: 'Formato de backup inválido. Debe contener un array de participantes.' });
  }

  const db = readDB();
  db.participants = backup.participants;
  if (backup.actualResults) {
    db.actualResults = backup.actualResults;
  }
  
  await writeDB(db);
  console.log('Copia de seguridad restaurada correctamente.');
  res.json({ success: true, message: '¡Copia de seguridad restaurada con éxito!' });
});


// Start listening
initDB().then(() => {
  // Sincronización inicial al arrancar el servidor
  if (readDB().autoSync !== false) {
    syncExternalData().catch(err => console.error('Error en sincronización inicial en arranque:', err.message));
  }

  // Bucle de sincronización de fondo cada 10 minutos (600000ms)
  setInterval(() => {
    if (readDB().autoSync !== false) {
      syncExternalData().catch(err => console.error('Error en bucle de sincronización automática:', err.message));
    }
  }, 600000);

  app.listen(PORT, () => {
    console.log('========================================================');
    console.log(`🚀 SERVIDOR EJECUTÁNDOSE EN EL PUERTO: ${PORT}`);
    console.log(`🔗 Local: http://localhost:${PORT}`);
    console.log('--------------------------------------------------------');
    console.log('Tus amigos en la misma red local pueden acceder con:');
    console.log(`🔗 http://<TU-IP-LOCAL>:${PORT}`);
    console.log('Ejemplo de contraseña de Administrador: admin');
    console.log('========================================================');
  });
}).catch(err => {
  console.error('❌ Error crítico inicializando base de datos en arranque:', err);
});

module.exports = app;
