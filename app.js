// ==========================================
// DATA: World Cup 2026 Teams and Groups
// ==========================================

const TEAMS = {
  // Group A
  MEX: { name: 'México', flag: '🇲🇽' },
  RSA: { name: 'Sudáfrica', flag: '🇿🇦' },
  KOR: { name: 'Corea del Sur', flag: '🇰🇷' },
  CZE: { name: 'Rep. Checa', flag: '🇨🇿' },
  // Group B
  CAN: { name: 'Canadá', flag: '🇨🇦' },
  SUI: { name: 'Suiza', flag: '🇨🇭' },
  QAT: { name: 'Qatar', flag: '🇶🇦' },
  BIH: { name: 'Bosnia y Herc.', flag: '🇧🇦' },
  // Group C
  BRA: { name: 'Brasil', flag: '🇧🇷' },
  MAR: { name: 'Marruecos', flag: '🇲🇦' },
  SCO: { name: 'Escocia', flag: '🏴\u200D󠁢󠁳󠁣󠁴󠁿' },
  HAI: { name: 'Haití', flag: '🇭🇹' },
  // Group D
  USA: { name: 'EE.UU.', flag: '🇺🇸' },
  PAR: { name: 'Paraguay', flag: '🇵🇾' },
  AUS: { name: 'Australia', flag: '🇦🇺' },
  TUR: { name: 'Turquía', flag: '🇹🇷' },
  // Group E
  GER: { name: 'Alemania', flag: '🇩🇪' },
  CUW: { name: 'Curazao', flag: '🇨🇼' },
  CIV: { name: 'Costa de Marfil', flag: '🇨🇮' },
  ECU: { name: 'Ecuador', flag: '🇪🇨' },
  // Group F
  JPN: { name: 'Japón', flag: '🇯🇵' },
  NED: { name: 'Países Bajos', flag: '🇳🇱' },
  SWE: { name: 'Suecia', flag: '🇸🇪' },
  TUN: { name: 'Túnez', flag: '🇹🇳' },
  // Group G
  BEL: { name: 'Bélgica', flag: '🇧🇪' },
  EGY: { name: 'Egipto', flag: '🇪🇬' },
  IRN: { name: 'Irán', flag: '🇮🇷' },
  NZL: { name: 'Nueva Zelanda', flag: '🇳🇿' },
  // Group H
  ESP: { name: 'España', flag: '🇪🇸' },
  URU: { name: 'Uruguay', flag: '🇺🇾' },
  KSA: { name: 'Arabia Saudí', flag: '🇸🇦' },
  CPV: { name: 'Cabo Verde', flag: '🇨🇻' },
  // Group I
  FRA: { name: 'Francia', flag: '🇫🇷' },
  SEN: { name: 'Senegal', flag: '🇸🇳' },
  NOR: { name: 'Noruega', flag: '🇳🇴' },
  IRQ: { name: 'Irak', flag: '🇮🇶' },
  // Group J
  ARG: { name: 'Argentina', flag: '🇦🇷' },
  ALG: { name: 'Argelia', flag: '🇩🇿' },
  AUT: { name: 'Austria', flag: '🇦🇹' },
  JOR: { name: 'Jordania', flag: '🇯🇴' },
  // Group K
  POR: { name: 'Portugal', flag: '🇵🇹' },
  COL: { name: 'Colombia', flag: '🇨🇴' },
  UZB: { name: 'Uzbekistán', flag: '🇺🇿' },
  COD: { name: 'R.D. Congo', flag: '🇨🇩' },
  // Group L
  ENG: { name: 'Inglaterra', flag: '🏴\u200D󠁢󠁥󠁮󠁧󠁿' },
  CRO: { name: 'Croacia', flag: '🇭🇷' },
  GHA: { name: 'Ghana', flag: '🇬🇭' },
  PAN: { name: 'Panamá', flag: '🇵🇦' }
};

const INITIAL_GROUPS = {
  A: ['MEX', 'RSA', 'KOR', 'CZE'],
  B: ['CAN', 'SUI', 'QAT', 'BIH'],
  C: ['BRA', 'MAR', 'SCO', 'HAI'],
  D: ['USA', 'PAR', 'AUS', 'TUR'],
  E: ['GER', 'CUW', 'CIV', 'ECU'],
  F: ['JPN', 'NED', 'SWE', 'TUN'],
  G: ['BEL', 'EGY', 'IRN', 'NZL'],
  H: ['ESP', 'URU', 'KSA', 'CPV'],
  I: ['FRA', 'SEN', 'NOR', 'IRQ'],
  J: ['ARG', 'ALG', 'AUT', 'JOR'],
  K: ['POR', 'COL', 'UZB', 'COD'],
  L: ['ENG', 'CRO', 'GHA', 'PAN']
};

// Bracket pairings definition (declarative)
// 12 group winners (1A-1L), 12 runners-up (2A-2L), 8 third place wildcards (W1-W8)
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

// ==========================================
// STATE MANAGEMENT & DATA PERSISTENCE
// ==========================================

// Blank Template for a Prediction / Result State
function createEmptyState() {
  return {
    name: '',
    contact: '',
    avatar: '⚽',
    groups: JSON.parse(JSON.stringify(INITIAL_GROUPS)), // deep copy initial
    wildcards: [], // 8 selected team IDs
    bracket: {
      r32: Array(16).fill(null), // 0 or 1 index indicating winner
      r16: Array(8).fill(null),
      qf: Array(4).fill(null),
      sf: Array(2).fill(null),
      f: null
    },
    extras: {
      scorer: '',
      mvp: '',
      goals: null
    }
  };
}

// State variables
let userPredictorState = createEmptyState();
let actualResults = createEmptyState(); // Real results managed by admin
let participants = []; // Registered players
let adminMode = false; // Is admin mode toggled ON?
let activeStep = 1; // Current predictor step (1-6)
let activeBracketTab = 'r32'; // 'r32', 'r16', 'qf', 'sf'
let adminPassword = localStorage.getItem('porra_admin_password') || '';
let leaderboardInterval = null;
let autoSyncEnabled = true;

// Computed brackets cache
let bracketTeamsCache = {
  r32: [], // Array of 16 pairs: [{id, name, flag}, {id, name, flag}]
  r16: [], // Array of 8 pairs
  qf: [],  // Array of 4 pairs
  sf: [],  // Array of 2 pairs
  f: [],   // Array of 1 pair
  champion: null
};

// Fetch data from server
async function fetchServerData() {
  try {
    const resResults = await fetch('/api/results');
    if (resResults.ok) {
      const data = await resResults.json();
      autoSyncEnabled = data.autoSync !== false;
      actualResults = data;
      localStorage.setItem('porra_actual_results', JSON.stringify(actualResults));
      updateSyncDisplay();
      
      // Update DB status badge
      updateDbStatusBadge(data.dbConnected, false, data.dbUrlPresent, data.dbError, data.isVercel);
    } else {
      updateDbStatusBadge(false, true, false, null, false);
    }
    
    const resParticipants = await fetch('/api/participants');
    if (resParticipants.ok) {
      const serverParticipants = await resParticipants.json();
      
      // Load current local participants from localStorage
      const savedParticipants = localStorage.getItem('porra_participants');
      let localParticipants = [];
      try {
        localParticipants = savedParticipants ? JSON.parse(savedParticipants) : [];
      } catch (e) {
        console.error("Error parsing porra_participants from localStorage:", e);
      }
      
      // Find participants that are in local storage but missing from server (by contact)
      const missingInServer = localParticipants.filter(lp => 
        lp && lp.contact && !serverParticipants.some(sp => sp && sp.contact === lp.contact)
      );
      
      if (missingInServer.length > 0) {
        console.log(`[Sync] Encontrados ${missingInServer.length} participantes locales no en el servidor.`);
        participants = [...serverParticipants];
        
        missingInServer.forEach(lp => {
          // Keep it but mark it as localOnly
          participants.push({ ...lp, isLocalOnly: true });
        });
        
        localStorage.setItem('porra_participants', JSON.stringify(participants));
        showSyncLocalToWebBanner(missingInServer.length);
      } else {
        participants = serverParticipants;
        localStorage.setItem('porra_participants', JSON.stringify(participants));
        hideSyncLocalToWebBanner();
      }
    }
  } catch (err) {
    console.warn('Servidor central no disponible. Corriendo en modo local/offline.');
    updateDbStatusBadge(false, true, false, null, false);
  }
}

function showSyncLocalToWebBanner(count) {
  const banner = document.getElementById('sync-local-banner');
  const countEl = document.getElementById('sync-local-count');
  if (banner && countEl) {
    countEl.innerText = count;
    banner.style.display = 'flex';
  }
}

function hideSyncLocalToWebBanner() {
  const banner = document.getElementById('sync-local-banner');
  if (banner) {
    banner.style.display = 'none';
  }
}

async function syncLocalParticipantsToServer() {
  // Get local-only participants from localStorage
  const savedParticipants = localStorage.getItem('porra_participants');
  const localParticipants = savedParticipants ? JSON.parse(savedParticipants) : [];
  
  // Find which ones are marked as localOnly
  const localOnly = localParticipants.filter(p => p && p.isLocalOnly);
  
  if (localOnly.length === 0) {
    alert('No hay apuestas locales pendientes de sincronizar.');
    hideSyncLocalToWebBanner();
    return;
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (const p of localOnly) {
    // Remove the temporary flag before uploading
    const cleanBet = { ...p };
    delete cleanBet.isLocalOnly;
    delete cleanBet.score; // Server calculates score
    
    try {
      const response = await fetch('/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cleanBet)
      });
      
      if (response.ok) {
        successCount++;
      } else {
        failCount++;
      }
    } catch (err) {
      failCount++;
    }
  }
  
  if (successCount > 0) {
    alert(`¡Sincronización completada! Se subieron ${successCount} apuestas al servidor con éxito.` + (failCount > 0 ? ` (${failCount} fallaron).` : ''));
    // Force a fresh fetch from server
    await fetchServerData();
    calculatePlayerScores();
    renderLeaderboardTable();
  } else {
    alert('❌ Error al subir las apuestas al servidor. Verifica tu conexión.');
  }
}

function updateDbStatusBadge(connected, serverDown, dbUrlPresent, dbError, isVercel) {
  const badge = document.getElementById('db-status-badge');
  if (!badge) return;
  
  if (serverDown) {
    badge.innerText = '🔴 Servidor Desconectado (Offline)';
    badge.style.background = 'rgba(220, 53, 69, 0.1)';
    badge.style.color = '#dc3545';
    badge.style.borderColor = 'rgba(220, 53, 69, 0.2)';
  } else if (connected) {
    badge.innerText = '🟢 Base de datos: Conectada (Persistente)';
    badge.style.background = 'rgba(40, 167, 69, 0.1)';
    badge.style.color = '#28a745';
    badge.style.borderColor = 'rgba(40, 167, 69, 0.2)';
  } else if (isVercel) {
    // Highly specific warning for Vercel without PostgreSQL
    badge.innerText = '⚠️ Almacenamiento Volátil (Falta vincular Postgres en Vercel)';
    badge.style.background = 'rgba(225, 83, 9, 0.1)';
    badge.style.color = '#e15309';
    badge.style.borderColor = 'rgba(225, 83, 9, 0.2)';
  } else if (!dbUrlPresent) {
    badge.innerText = '⚠️ Almacenamiento Temporal (Falta vincular la BD en Vercel)';
    badge.style.background = 'rgba(255, 193, 7, 0.1)';
    badge.style.color = '#ffc107';
    badge.style.borderColor = 'rgba(255, 193, 7, 0.2)';
  } else {
    const errorMsg = dbError ? `: ${dbError}` : '';
    badge.innerText = `⚠️ Error de Conexión (La BD no responde${errorMsg})`;
    badge.style.background = 'rgba(220, 53, 69, 0.1)';
    badge.style.color = '#dc3545';
    badge.style.borderColor = 'rgba(220, 53, 69, 0.2)';
  }
}

// Load initial data from localStorage and fetch from Server
async function initApp() {
  // Load actual results local fallback
  const savedActual = localStorage.getItem('porra_actual_results');
  if (savedActual) {
    actualResults = JSON.parse(savedActual);
  } else {
    actualResults = createEmptyState();
  }

  // Load participants local fallback
  const savedParticipants = localStorage.getItem('porra_participants');
  if (savedParticipants) {
    participants = JSON.parse(savedParticipants);
  }

  // Load user draft
  const savedUserDraft = localStorage.getItem('porra_user_draft');
  if (savedUserDraft) {
    userPredictorState = JSON.parse(savedUserDraft);
  }

  // Fetch real data from server if online
  await fetchServerData();

  // Load active state of admin checkbox
  const savedAdminMode = localStorage.getItem('porra_admin_mode');
  if (savedAdminMode === 'true') {
    adminMode = true;
    document.getElementById('checkbox-admin-mode').checked = true;
    // Adapt navigation indicator
    document.getElementById('admin-nav-indicator').style.display = 'inline-block';
    document.getElementById('admin-mode-warning-alert').style.display = 'flex';
  }

  // Setup registration listener for avatar
  setupAvatarSelector();

  // Set initial screen
  switchMainTab('predictor');
  
  // Recalculate and Render
  updateAndRenderAll();
}

// Save active state to localStorage / Server
async function saveUserDraft() {
  if (!adminMode) {
    localStorage.setItem('porra_user_draft', JSON.stringify(userPredictorState));
  } else {
    localStorage.setItem('porra_actual_results', JSON.stringify(actualResults));
    // Send to server
    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword
        },
        body: JSON.stringify(actualResults)
      });
      if (res.status === 401) {
        alert('Contraseña de administrador incorrecta. Se ha limpiado la contraseña guardada.');
        localStorage.removeItem('porra_admin_password');
        adminPassword = '';
        const cb = document.getElementById('checkbox-admin-mode');
        if (cb) cb.checked = false;
        toggleAdminMode();
      }
    } catch (err) {
      console.error('No se pudieron guardar los resultados en el servidor:', err);
    }
  }
}

// Get the current active working state depending on Admin Mode
function getActiveState() {
  return adminMode ? actualResults : userPredictorState;
}

// ==========================================
// PREDICTOR STEP LOGIC
// ==========================================

function nextStep(step) {
  // Validation for Step 1
  if (step === 2) {
    const name = document.getElementById('input-user-name').value.trim();
    if (!adminMode && name === '') {
      alert('Por favor, completa tu nombre para continuar.');
      return;
    }
    // Save to state
    userPredictorState.name = name;
    userPredictorState.contact = name; // set contact equal to name
    saveUserDraft();
  }

  // Validation for Step 3 (Wildcards)
  if (step === 4) {
    const state = getActiveState();
    if (state.wildcards.length !== 8) {
      alert('Debes elegir exactamente 8 mejores terceros para pasar a las eliminatorias.');
      return;
    }
  }

  // Map step index to panel IDs
  const stepIds = {
    1: 'step-1-id',
    2: 'step-2-groups',
    3: 'step-3-wildcards',
    4: 'step-4-bracket',
    5: 'step-5-extras',
    6: 'step-6-summary'
  };

  // Hide all panels, show the targeted one
  Object.values(stepIds).forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  
  document.getElementById(stepIds[step]).style.display = 'block';
  activeStep = step;
  
  // Update step tracker
  updateStepTracker();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update layout when entering bracket step
  if (step === 4) {
    updateAndRenderAll();
  }
}

function prevStep(step) {
  // Hide current, show previous
  nextStep(step);
}

function updateStepTracker() {
  const steps = [
    'Paso 1: Identificación',
    'Paso 2: Fase de Grupos',
    'Paso 3: Repesca (Terceros)',
    'Paso 4: Eliminatorias',
    'Paso 5: Preguntas Extra',
    'Paso 6: Enviar Apuesta'
  ];
  
  document.getElementById('predictor-step-title').innerHTML = adminMode 
    ? `<span style="color:var(--accent-red);">[ADMIN MODE]</span> ${steps[activeStep - 1]}`
    : steps[activeStep - 1];

  for (let i = 1; i <= 5; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) {
      if (i < activeStep) {
        dot.style.background = 'var(--accent-green)';
        dot.style.color = '#000';
        dot.style.borderColor = 'var(--accent-green)';
        dot.innerText = '✓';
      } else if (i === activeStep) {
        dot.style.background = 'var(--accent-gold)';
        dot.style.color = '#000';
        dot.style.borderColor = 'var(--accent-gold)';
        dot.innerText = i;
      } else {
        dot.style.background = 'rgba(255, 255, 255, 0.1)';
        dot.style.color = 'var(--text-secondary)';
        dot.style.borderColor = 'transparent';
        dot.innerText = i;
      }
    }
  }
}

function setupAvatarSelector() {
  const options = document.querySelectorAll('.avatar-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      userPredictorState.avatar = opt.dataset.avatar;
      saveUserDraft();
    });
  });
}

// Set form fields based on loaded user state
function populateFormFields() {
  document.getElementById('input-user-name').value = userPredictorState.name || '';
  document.getElementById('input-user-contact').value = userPredictorState.contact || '';
  
  const avatars = document.querySelectorAll('.avatar-option');
  avatars.forEach(a => {
    if (a.dataset.avatar === userPredictorState.avatar) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });

  document.getElementById('input-extra-scorer').value = userPredictorState.extras.scorer || '';
  document.getElementById('input-extra-mvp').value = userPredictorState.extras.mvp || '';
  document.getElementById('input-extra-goals').value = userPredictorState.extras.goals || '';
}

// ==========================================
// STEP 2: GROUP STAGE REORDERING
// ==========================================

function moveTeam(groupKey, teamIndex, direction) {
  const state = getActiveState();
  const groupTeams = state.groups[groupKey];
  
  if (direction === 'up' && teamIndex > 0) {
    // Swap with previous
    const temp = groupTeams[teamIndex];
    groupTeams[teamIndex] = groupTeams[teamIndex - 1];
    groupTeams[teamIndex - 1] = temp;
  } else if (direction === 'down' && teamIndex < 3) {
    // Swap with next
    const temp = groupTeams[teamIndex];
    groupTeams[teamIndex] = groupTeams[teamIndex + 1];
    groupTeams[teamIndex + 1] = temp;
  }
  
  saveUserDraft();
  
  // Re-evaluate wildcards list
  sanitizeWildcardsSelection();
  
  // Re-calculate the entire bracket propagation
  recalculateBracketData();
  
  // Render
  renderGroupStage();
  renderWildcardsSection();
}

// Ensure selected wildcards only belong to the teams finishing 3rd in groups A-L
function sanitizeWildcardsSelection() {
  const state = getActiveState();
  
  // Get all current 3rd place team IDs
  const currentThirdPlaceTeamIds = [];
  Object.keys(state.groups).forEach(key => {
    currentThirdPlaceTeamIds.push(state.groups[key][2]);
  });
  
  // Filter selected wildcards to only contain teams that are actually in 3rd place now
  state.wildcards = state.wildcards.filter(teamId => currentThirdPlaceTeamIds.includes(teamId));
  saveUserDraft();
}

function renderGroupStage() {
  const container = document.getElementById('groups-container');
  container.innerHTML = '';
  
  const state = getActiveState();
  
  Object.keys(state.groups).forEach(key => {
    const groupTeams = state.groups[key];
    
    const card = document.createElement('div');
    card.className = 'group-card';
    
    let rowsHtml = '';
    groupTeams.forEach((teamId, index) => {
      const team = TEAMS[teamId];
      // determine styling rank
      let rankClass = '';
      if (index === 0) rankClass = 'rank-1';
      else if (index === 1) rankClass = 'rank-2';
      else if (index === 2) rankClass = 'rank-3';
      else if (index === 3) rankClass = 'rank-4';
      
      const upDisabled = index === 0 ? 'disabled' : '';
      const downDisabled = index === 3 ? 'disabled' : '';
      
      rowsHtml += `
        <div class="team-row ${rankClass}">
          <div class="team-info">
            <span class="team-rank-badge">${index + 1}</span>
            <span class="team-flag">${team.flag}</span>
            <span class="team-name">${team.name}</span>
          </div>
          <div class="team-controls">
            <button class="rank-btn" ${upDisabled} onclick="moveTeam('${key}', ${index}, 'up')">▲</button>
            <button class="rank-btn" ${downDisabled} onclick="moveTeam('${key}', ${index}, 'down')">▼</button>
          </div>
        </div>
      `;
    });
    
    card.innerHTML = `
      <div class="group-header">
        <strong>GRUPO ${key}</strong>
        <span>Mundial 2026</span>
      </div>
      <div class="team-list">
        ${rowsHtml}
      </div>
    `;
    
    container.appendChild(card);
  });
}

// ==========================================
// STEP 3: WILDCARDS SELECTOR (BEST 3RD PLACES)
// ==========================================

function toggleWildcardTeam(teamId) {
  const state = getActiveState();
  const index = state.wildcards.indexOf(teamId);
  
  if (index > -1) {
    // Remove
    state.wildcards.splice(index, 1);
  } else {
    // Add only if less than 8
    if (state.wildcards.length < 8) {
      state.wildcards.push(teamId);
    } else {
      alert('Ya has seleccionado 8 mejores terceros. Desmarca alguno primero si deseas cambiar de selección.');
      return;
    }
  }
  
  saveUserDraft();
  recalculateBracketData();
  renderWildcardsSection();
}

function renderWildcardsSection() {
  const container = document.getElementById('wildcards-container');
  container.innerHTML = '';
  
  const state = getActiveState();
  const selectedThirds = state.wildcards;
  
  // Find all 3rd place teams
  Object.keys(state.groups).forEach(groupKey => {
    const teamId = state.groups[groupKey][2]; // index 2 is 3rd place
    const team = TEAMS[teamId];
    const isSelected = selectedThirds.includes(teamId);
    const cardClass = isSelected ? 'wildcard-card selected' : 'wildcard-card';
    
    const card = document.createElement('div');
    card.className = cardClass;
    card.onclick = () => toggleWildcardTeam(teamId);
    
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="team-flag">${team.flag}</span>
        <span class="team-name" style="font-size:0.9rem;">${team.name}</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="wildcard-group-label">GRP ${groupKey}</span>
        <div class="wildcard-checkbox">${isSelected ? '✓' : ''}</div>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  // Update counter bar
  const counterText = document.getElementById('wildcard-count-text');
  const statusBadge = document.getElementById('wildcard-status-badge');
  const counterBar = document.getElementById('wildcard-counter-bar');
  const nextBtn = document.getElementById('btn-submit-wildcards');
  
  counterText.innerText = `Has seleccionado: ${selectedThirds.length} de 8 equipos`;
  
  if (selectedThirds.length === 8) {
    statusBadge.innerText = 'Completado';
    statusBadge.className = 'payment-badge badge-paid';
    counterBar.className = 'wildcard-counter-bar valid';
    nextBtn.disabled = false;
  } else {
    statusBadge.innerText = `${selectedThirds.length}/8 Seleccionados`;
    statusBadge.className = 'payment-badge badge-pending';
    counterBar.className = 'wildcard-counter-bar';
    nextBtn.disabled = true;
  }
}

// ==========================================
// STEP 4: BRACKET LOGIC & PROPAGATION
// ==========================================

function switchBracketTab(tabKey) {
  activeBracketTab = tabKey;
  
  // Tabs styling
  const buttons = document.querySelectorAll('.bracket-tab-btn');
  buttons.forEach(btn => {
    if (btn.innerText.toLowerCase().includes(tabKey === 'r32' ? 'dieci' : tabKey === 'r16' ? 'octa' : tabKey === 'qf' ? 'cuar' : 'semi')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Panels visibility
  const panels = ['r32', 'r16', 'qf', 'sf'];
  panels.forEach(p => {
    const el = document.getElementById(`bracket-panel-${p}`);
    if (el) {
      if (p === tabKey) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });
}

// Resolves a team definition source object to an actual team {id, name, flag}
function resolveTeamSource(sourceObj, state) {
  if (sourceObj.source === 'group-rank') {
    const teamId = state.groups[sourceObj.group][sourceObj.rank - 1];
    return { id: teamId, ...TEAMS[teamId] };
  } else if (sourceObj.source === 'wildcard') {
    const teamId = state.wildcards[sourceObj.index];
    if (teamId) {
      return { id: teamId, ...TEAMS[teamId] };
    } else {
      return null; // Wildcard not chosen yet
    }
  }
  return null;
}

// Recalculates the bracket top-down, propagating team winners and clearing obsolete ones.
function recalculateBracketData() {
  const state = getActiveState();
  
  // 1. Compute R32 Matchups
  bracketTeamsCache.r32 = R32_MATCH_DEFS.map(def => {
    return [
      resolveTeamSource(def.t1, state),
      resolveTeamSource(def.t2, state)
    ];
  });
  
  // 2. Compute R16 Matchups (8 matches)
  bracketTeamsCache.r16 = [];
  for (let i = 0; i < 8; i++) {
    const t1 = getWinnerOfMatch('r32', 2 * i);
    const t2 = getWinnerOfMatch('r32', 2 * i + 1);
    
    // Check if the previous prediction is still valid
    if (state.bracket.r16[i] !== null) {
      const selectedIndex = state.bracket.r16[i];
      const selectedTeam = selectedIndex === 0 ? t1 : t2;
      if (!selectedTeam) {
        state.bracket.r16[i] = null; // Clear if team is no longer present
      }
    }
    
    bracketTeamsCache.r16.push([t1, t2]);
  }

  // 3. Compute QF Matchups (4 matches)
  bracketTeamsCache.qf = [];
  for (let i = 0; i < 4; i++) {
    const t1 = getWinnerOfMatch('r16', 2 * i);
    const t2 = getWinnerOfMatch('r16', 2 * i + 1);
    
    if (state.bracket.qf[i] !== null) {
      const selectedIndex = state.bracket.qf[i];
      const selectedTeam = selectedIndex === 0 ? t1 : t2;
      if (!selectedTeam) {
        state.bracket.qf[i] = null;
      }
    }
    
    bracketTeamsCache.qf.push([t1, t2]);
  }

  // 4. Compute SF Matchups (2 matches)
  bracketTeamsCache.sf = [];
  for (let i = 0; i < 2; i++) {
    const t1 = getWinnerOfMatch('qf', 2 * i);
    const t2 = getWinnerOfMatch('qf', 2 * i + 1);
    
    if (state.bracket.sf[i] !== null) {
      const selectedIndex = state.bracket.sf[i];
      const selectedTeam = selectedIndex === 0 ? t1 : t2;
      if (!selectedTeam) {
        state.bracket.sf[i] = null;
      }
    }
    
    bracketTeamsCache.sf.push([t1, t2]);
  }

  // 5. Compute Final Matchup (1 match)
  const t1 = getWinnerOfMatch('sf', 0);
  const t2 = getWinnerOfMatch('sf', 1);
  if (state.bracket.f !== null) {
    const selectedIndex = state.bracket.f;
    const selectedTeam = selectedIndex === 0 ? t1 : t2;
    if (!selectedTeam) {
      state.bracket.f = null;
    }
  }
  bracketTeamsCache.f = [[t1, t2]];
  
  // 6. Compute Champion
  bracketTeamsCache.champion = getWinnerOfMatch('f', 0);
  
  saveUserDraft();
}

// Helper to extract the winner {id, name, flag} of a match
function getWinnerOfMatch(roundKey, matchIndex) {
  const state = getActiveState();
  const matchTeams = bracketTeamsCache[roundKey][matchIndex];
  
  if (!matchTeams) return null;
  
  const winnerIndex = roundKey === 'f' ? state.bracket.f : state.bracket[roundKey][matchIndex];
  if (winnerIndex === null) return null;
  
  return matchTeams[winnerIndex];
}

// User selects a winner in the bracket
function predictMatchWinner(roundKey, matchIndex, winnerIndex) {
  const state = getActiveState();
  
  if (roundKey === 'f') {
    state.bracket.f = winnerIndex;
  } else {
    state.bracket[roundKey][matchIndex] = winnerIndex;
  }
  
  // Recalculate dependencies top-down
  recalculateBracketData();
  
  // Update views
  renderBracketView();
  
  // Check if bracket is completely resolved
  checkBracketCompletion();
}

function checkBracketCompletion() {
  const state = getActiveState();
  const r32Complete = state.bracket.r32.every(v => v !== null);
  const r16Complete = state.bracket.r16.every(v => v !== null);
  const qfComplete = state.bracket.qf.every(v => v !== null);
  const sfComplete = state.bracket.sf.every(v => v !== null);
  const fComplete = state.bracket.f !== null;
  
  const submitBtn = document.getElementById('btn-submit-bracket');
  if (submitBtn) {
    submitBtn.disabled = !(r32Complete && r16Complete && qfComplete && sfComplete && fComplete);
  }
}

function renderBracketView() {
  const state = getActiveState();
  
  // Render R32 List
  renderMatchList('matches-r32-list', 'r32', bracketTeamsCache.r32);
  // Render R16 List
  renderMatchList('matches-r16-list', 'r16', bracketTeamsCache.r16);
  // Render QF List
  renderMatchList('matches-qf-list', 'qf', bracketTeamsCache.qf);
  
  // Render SF & Final Panel
  const sfFinalContainer = document.getElementById('matches-sf-final-list');
  sfFinalContainer.innerHTML = '';
  
  // Draw Semis
  const semisHeader = document.createElement('h4');
  semisHeader.style.margin = '15px 0 5px 0';
  semisHeader.style.color = 'var(--text-secondary)';
  semisHeader.innerText = 'Semifinales';
  sfFinalContainer.appendChild(semisHeader);
  
  const semisGrid = document.createElement('div');
  semisGrid.className = 'bracket-matches-list';
  sfFinalContainer.appendChild(semisGrid);
  renderMatchListElement(semisGrid, 'sf', bracketTeamsCache.sf);
  
  // Draw Final
  const finalHeader = document.createElement('h4');
  finalHeader.style.margin = '25px 0 5px 0';
  finalHeader.style.color = 'var(--accent-gold)';
  finalHeader.innerText = 'Gran Final';
  sfFinalContainer.appendChild(finalHeader);
  
  const finalGrid = document.createElement('div');
  finalGrid.className = 'bracket-matches-list';
  sfFinalContainer.appendChild(finalGrid);
  renderMatchListElement(finalGrid, 'f', bracketTeamsCache.f);
  
  // Render Champion Banner
  const champSection = document.getElementById('champion-display-section');
  const champBox = document.getElementById('champion-box');
  const champion = bracketTeamsCache.champion;
  
  if (champion) {
    champBox.innerHTML = `
      <span class="team-flag">${champion.flag}</span>
      <span class="team-name">${champion.name}</span>
    `;
    champSection.style.display = 'flex';
  } else {
    champSection.style.display = 'none';
  }

  // Auto-advance buttons rendering
  const r32Complete = state.bracket.r32.every(v => v !== null);
  const navNextR32 = document.getElementById('bracket-nav-next-r32');
  if (navNextR32) {
    if (r32Complete) {
      navNextR32.innerHTML = `
        <button class="btn btn-primary" onclick="switchBracketTab('r16')" style="display: inline-flex;">
          Continuar a Octavos de Final &rarr;
        </button>
      `;
    } else {
      navNextR32.innerHTML = '';
    }
  }

  const r16Complete = state.bracket.r16.every(v => v !== null);
  const navNextR16 = document.getElementById('bracket-nav-next-r16');
  if (navNextR16) {
    if (r16Complete) {
      navNextR16.innerHTML = `
        <button class="btn btn-primary" onclick="switchBracketTab('qf')" style="display: inline-flex;">
          Continuar a Cuartos de Final &rarr;
        </button>
      `;
    } else {
      navNextR16.innerHTML = '';
    }
  }

  const qfComplete = state.bracket.qf.every(v => v !== null);
  const navNextQF = document.getElementById('bracket-nav-next-qf');
  if (navNextQF) {
    if (qfComplete) {
      navNextQF.innerHTML = `
        <button class="btn btn-primary" onclick="switchBracketTab('sf')" style="display: inline-flex;">
          Continuar a Semifinales y Final &rarr;
        </button>
      `;
    } else {
      navNextQF.innerHTML = '';
    }
  }
}

function renderMatchList(containerId, roundKey, matchesData) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  renderMatchListElement(container, roundKey, matchesData);
}

function renderMatchListElement(containerElement, roundKey, matchesData) {
  const state = getActiveState();
  
  matchesData.forEach((teams, matchIdx) => {
    const card = document.createElement('div');
    card.className = 'match-card';
    
    const team1 = teams[0];
    const team2 = teams[1];
    
    // Read user prediction
    const selectedWinner = roundKey === 'f' ? state.bracket.f : state.bracket[roundKey][matchIdx];
    
    const team1Class = selectedWinner === 0 ? 'match-team selected-winner' : selectedWinner === 1 ? 'match-team loser' : 'match-team';
    const team2Class = selectedWinner === 1 ? 'match-team selected-winner' : selectedWinner === 0 ? 'match-team loser' : 'match-team';
    
    const matchNum = roundKey === 'r32' ? `D-Match ${matchIdx + 1}` : roundKey === 'r16' ? `O-Match ${matchIdx + 1}` : roundKey === 'qf' ? `C-Match ${matchIdx + 1}` : roundKey === 'sf' ? `S-Match ${matchIdx + 1}` : '🏆 Gran Final';
    
    card.innerHTML = `
      <div class="match-header">
        <span>${matchNum}</span>
        <span>Mundial 2026</span>
      </div>
      
      <!-- Team 1 -->
      <div class="${team1Class}" onclick="${team1 && team2 ? `predictMatchWinner('${roundKey}', ${matchIdx}, 0)` : ''}">
        <div class="team-info">
          <span class="team-flag">${team1 ? team1.flag : '❓'}</span>
          <span class="team-name">${team1 ? team1.name : 'Por determinar'}</span>
        </div>
        <span class="winner-indicator">⭐</span>
      </div>
      
      <!-- Team 2 -->
      <div class="${team2Class}" onclick="${team1 && team2 ? `predictMatchWinner('${roundKey}', ${matchIdx}, 1)` : ''}">
        <div class="team-info">
          <span class="team-flag">${team2 ? team2.flag : '❓'}</span>
          <span class="team-name">${team2 ? team2.name : 'Por determinar'}</span>
        </div>
        <span class="winner-indicator">⭐</span>
      </div>
    `;
    
    containerElement.appendChild(card);
  });
}

// ==========================================
// STEP 5 & 6: SUMMARY, EXTRA QUESTIONS, SAVE & EXPORT
// ==========================================

async function generateAndShowSummary() {
  const state = userPredictorState;
  
  // Read extra questions
  state.extras.scorer = document.getElementById('input-extra-scorer').value.trim();
  state.extras.mvp = document.getElementById('input-extra-mvp').value.trim();
  const goalsVal = parseInt(document.getElementById('input-extra-goals').value);
  state.extras.goals = isNaN(goalsVal) ? null : goalsVal;
  
  saveUserDraft();
  
  // Submit to Server Database
  let submittedOk = false;
  try {
    const response = await fetch('/api/participants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    });
    if (response.ok) {
      submittedOk = true;
      console.log('Apuesta registrada en el servidor.');
    }
  } catch (err) {
    console.error('Error al conectar con el servidor:', err);
  }

  // Generate and download PDF receipt automatically
  try {
    generatePDFReceipt(state);
  } catch (pdfErr) {
    console.error('Error generando PDF, cayendo a JSON:', pdfErr);
    downloadBetJSON();
  }

  if (submittedOk) {
    alert('¡Tu apuesta ha sido registrada con éxito!\n\nSe ha generado y descargado tu recibo oficial en PDF.\nAhora te redirigimos a la pestaña de Clasificación.');
    
    // Clean draft on success
    localStorage.removeItem('porra_user_draft');
    
    // Reset predictor state so it's fresh for the next person
    userPredictorState = createEmptyState();
    populateFormFields();
    recalculateBracketData();
    nextStep(1);
    updateAndRenderAll();
    
    // Go to classification tab
    switchMainTab('leaderboard');
  } else {
    alert('⚠️ No se pudo registrar tu apuesta en el servidor central (offline).\n\nSin embargo, se ha descargado tu recibo en PDF con tus pronósticos y código de validación. Por favor, envíaselo al administrador por WhatsApp para que la registre manualmente.');
    
    // Switch to classification tab anyway so they can see the overall board
    switchMainTab('leaderboard');
  }
}

// Generate PDF receipt for a state object (player or admin results)
function generatePDFReceipt(stateObj) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  
  doc.setFont('helvetica', 'normal');
  
  // Colors (Deep Soccer Green and Gold)
  const primaryColor = [11, 60, 43];
  const accentColor = [212, 175, 55];
  const textColor = [33, 37, 41];
  const mutedTextColor = [108, 117, 125];
  
  // 1. Title Banner
  doc.setFillColor(...primaryColor);
  doc.rect(10, 10, 190, 22, 'F');
  
  doc.setFillColor(...accentColor);
  doc.rect(10, 32, 190, 1.5, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('LA PORRA DEL MUNDIAL 2026', 105, 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('RECIBO OFICIAL DE PRONOSTICOS', 105, 27, { align: 'center' });
  
  // 2. Player Info Block
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('DATOS DEL PARTICIPANTE', 12, 43);
  
  doc.setDrawColor(220, 224, 230);
  doc.setFillColor(248, 249, 250);
  doc.rect(10, 46, 190, 24, 'FD');
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(`Nombre: ${stateObj.name || 'Invitado'}`, 15, 53);
  doc.text(`Contacto: ${stateObj.contact || 'No especificado'}`, 15, 60);
  doc.text(`Fecha: ${new Date().toLocaleString('es-ES')}`, 15, 66);
  
  const statusStr = stateObj.paid ? 'PAGADO (Confirmado)' : 'PENDIENTE DE PAGO';
  // Strip emojis from avatar if it contains any non-alphanumeric, print raw char otherwise
  let avatarChar = stateObj.avatar || '⚽';
  doc.text(`Icono: ${avatarChar}`, 115, 53);
  doc.setFont('helvetica', 'bold');
  doc.text(`Estado: ${statusStr}`, 115, 60);
  
  // 3. Highlight Core Predictions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text('PRONOSTICOS PRINCIPALES', 12, 79);
  
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.4);
  doc.line(10, 81, 200, 81);
  
  // Get Champion
  const champId = getChampionForState(stateObj);
  const championName = champId && TEAMS[champId] ? TEAMS[champId].name : 'Por determinar';
  
  // Get Runner-up
  let runnerUpName = 'Por determinar';
  const finalists = getTeamsAdvancingToRound(stateObj, 'sf');
  if (stateObj.bracket.f !== null && finalists[0] && finalists[1]) {
    const rIdx = 1 - stateObj.bracket.f;
    const rId = finalists[rIdx];
    if (rId && TEAMS[rId]) runnerUpName = TEAMS[rId].name;
  }
  
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Campeón del Mundo:', 15, 88);
  doc.setFont('helvetica', 'normal');
  doc.text(championName, 53, 88);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Subcampeón:', 15, 94);
  doc.setFont('helvetica', 'normal');
  doc.text(runnerUpName, 53, 94);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Bota de Oro:', 115, 88);
  doc.setFont('helvetica', 'normal');
  doc.text(stateObj.extras.scorer || 'No indicado', 145, 88);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Balón de Oro (MVP):', 115, 94);
  doc.setFont('helvetica', 'normal');
  doc.text(stateObj.extras.mvp || 'No indicado', 145, 94);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Goles Totales:', 115, 100);
  doc.setFont('helvetica', 'normal');
  doc.text(stateObj.extras.goals ? `${stateObj.extras.goals} goles` : 'No indicado', 145, 100);
  
  // 4. Group Phase Predictions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text('1. FASE DE GRUPOS (ORDEN DE PRONOSTICO)', 12, 112);
  doc.setDrawColor(220, 224, 230);
  doc.line(10, 114, 200, 114);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...textColor);
  
  const groupsList = Object.keys(stateObj.groups).sort();
  let yStart = 120;
  groupsList.forEach((groupKey, idx) => {
    const col = idx < 6 ? 0 : 1;
    const row = idx < 6 ? idx : idx - 6;
    
    const x = col === 0 ? 15 : 110;
    const y = yStart + (row * 6.5);
    
    const teamCodes = stateObj.groups[groupKey];
    const predictionStr = teamCodes.join(' > ');
    
    doc.setFont('helvetica', 'bold');
    doc.text(`Grupo ${groupKey}:`, x, y);
    doc.setFont('helvetica', 'normal');
    doc.text(predictionStr, x + 16, y);
  });
  
  // Mejores Terceros
  doc.setFont('helvetica', 'bold');
  doc.text('Mejores Terceros (Pasan a R32):', 15, yStart + 42);
  doc.setFont('helvetica', 'normal');
  const wildcardsStr = stateObj.wildcards && stateObj.wildcards.length > 0 ? stateObj.wildcards.join(', ') : 'Ninguno';
  doc.text(wildcardsStr, 70, yStart + 42);
  
  // 5. Bracket Predictions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text('2. ELIMINATORIAS DIRECTAS (BRACKET)', 12, 174);
  doc.line(10, 176, 200, 176);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...textColor);
  
  const r16Teams = getTeamsAdvancingToRound(stateObj, 'r32');
  const qfTeams = getTeamsAdvancingToRound(stateObj, 'r16');
  const sfTeams = getTeamsAdvancingToRound(stateObj, 'qf');
  const finalTeams = getTeamsAdvancingToRound(stateObj, 'sf');
  
  const formatTeamsList = (arr) => arr.filter(Boolean).join(', ');
  
  doc.setFont('helvetica', 'bold');
  doc.text('Octavos de Final (R16):', 15, 182);
  doc.setFont('helvetica', 'normal');
  const r16Text = formatTeamsList(r16Teams) || 'Ninguno';
  const r16Lines = doc.splitTextToSize(r16Text, 140);
  doc.text(r16Lines, 55, 182);
  
  let currentY = 182 + (r16Lines.length * 4.5);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Cuartos de Final (QF):', 15, currentY);
  doc.setFont('helvetica', 'normal');
  const qfText = formatTeamsList(qfTeams) || 'Ninguno';
  const qfLines = doc.splitTextToSize(qfText, 140);
  doc.text(qfLines, 55, currentY);
  
  currentY += qfLines.length * 4.5;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Semifinales (SF):', 15, currentY);
  doc.setFont('helvetica', 'normal');
  const sfText = formatTeamsList(sfTeams) || 'Ninguno';
  const sfLines = doc.splitTextToSize(sfText, 140);
  doc.text(sfLines, 55, currentY);
  
  currentY += sfLines.length * 4.5;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Finalistas (F):', 15, currentY);
  doc.setFont('helvetica', 'normal');
  const fText = formatTeamsList(finalTeams) || 'Ninguno';
  doc.text(fText, 55, currentY);
  
  // 6. Verification Hash
  const validationCode = encodeBet(stateObj);
  
  doc.setTextColor(...mutedTextColor);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('CÓDIGO DE VALIDACIÓN TÉCNICA (SOPORTE Y TRANSMISIÓN MANUAL):', 15, 260);
  
  doc.setFont('helvetica', 'normal');
  const validationLines = doc.splitTextToSize(validationCode, 180);
  doc.text(validationLines, 15, 264);
  
  // Footer
  doc.setDrawColor(220, 224, 230);
  doc.line(10, 276, 200, 276);
  doc.setFontSize(8);
  doc.text('Gracias por participar en la Porra del Mundial 2026. Conserve este recibo.', 105, 281, { align: 'center' });
  doc.text('Este comprobante garantiza la validez de sus pronósticos registrados.', 105, 285, { align: 'center' });
  
  // Save PDF
  const nameClean = (stateObj.name || 'sin_nombre').replace(/\s+/g, '_');
  const filename = `recibo_porra_${nameClean}.pdf`;
  doc.save(filename);
}

// Download PDF of the currently viewed player in classification detail modal
function downloadCurrentPlayerPDF() {
  if (viewPlayerPredictionState) {
    try {
      generatePDFReceipt(viewPlayerPredictionState);
    } catch (err) {
      console.error('Error generando PDF del modal:', err);
      alert('Error al generar el archivo PDF. Puedes ver la apuesta en pantalla.');
    }
  } else {
    alert('No hay ninguna apuesta seleccionada.');
  }
}

// Download PDF for the user's latest draft prediction (Step 6 fallback)
function downloadLastBetPDF() {
  if (userPredictorState && userPredictorState.name) {
    generatePDFReceipt(userPredictorState);
  } else {
    alert('No hay ninguna apuesta registrada en este navegador para descargar.');
  }
}

// Helper to retrieve runner-up
function getRunnerUp() {
  const state = getActiveState();
  const finalTeams = bracketTeamsCache.f[0];
  if (!finalTeams || state.bracket.f === null) return null;
  const runnerUpIndex = state.bracket.f === 0 ? 1 : 0;
  return finalTeams[runnerUpIndex];
}

// Base64 encoding of predictions
function encodeBet(betObj) {
  const lightBet = {
    n: betObj.name,
    c: betObj.contact,
    a: betObj.avatar,
    g: betObj.groups,
    w: betObj.wildcards,
    b: betObj.bracket,
    e: [betObj.extras.scorer, betObj.extras.mvp, betObj.extras.goals]
  };
  
  const json = JSON.stringify(lightBet);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function decodeBet(str) {
  try {
    const cleanStr = str.replace(/\s+/g, '');
    let base64 = cleanStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const json = decodeURIComponent(escape(atob(base64)));
    const lightBet = JSON.parse(json);
    
    return {
      name: lightBet.n,
      contact: lightBet.c,
      avatar: lightBet.a,
      groups: lightBet.g,
      wildcards: lightBet.w,
      bracket: lightBet.b,
      extras: {
        scorer: lightBet.e[0],
        mvp: lightBet.e[1],
        goals: lightBet.e[2]
      }
    };
  } catch (e) {
    console.error("Error al decodificar la apuesta:", e);
    return null;
  }
}

function copyBetCodeToClipboard() {
  const code = document.getElementById('bet-code-output').innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert('¡Código copiado al portapapeles con éxito!');
  }).catch(err => {
    console.error('Error al copiar:', err);
    alert('No se pudo copiar automáticamente. Por favor, selecciona el texto manualmente y cópialo.');
  });
}

function shareOnWhatsApp() {
  const code = document.getElementById('bet-code-output').innerText;
  const name = userPredictorState.name;
  const champion = bracketTeamsCache.champion ? bracketTeamsCache.champion.name : 'Por determinar';
  
  const text = `¡Hola! Aquí está mi porra del Mundial 2026 🏆⚽\n\n*Nombre:* ${name}\n*Mi Campeón:* ${champion}\n\n*Código de Apuesta (Copia y envíaselo al admin):*\n\`\`\`${code}\`\`\``;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function downloadBetJSON() {
  const state = userPredictorState;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href",     dataStr);
  downloadAnchor.setAttribute("download", `porra_mundial2026_${state.name.replace(/\s+/g, '_')}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function resetPredictorForm() {
  if (confirm('¿Estás seguro de que quieres borrar el borrador actual y empezar una nueva porra?')) {
    userPredictorState = createEmptyState();
    localStorage.removeItem('porra_user_draft');
    populateFormFields();
    recalculateBracketData();
    nextStep(1);
    updateAndRenderAll();
  }
}

// ==========================================
// ADMIN DASHBOARD & LEADERBOARD
// ==========================================

function toggleAdminMode() {
  const cb = document.getElementById('checkbox-admin-mode');
  adminMode = cb.checked;
  
  if (adminMode) {
    // Prompt for password
    const pw = prompt('Introduce la contraseña de administrador para editar resultados oficiales:');
    if (pw === null) {
      // User cancelled
      cb.checked = false;
      adminMode = false;
      return;
    }
    adminPassword = pw;
    localStorage.setItem('porra_admin_password', pw);
  } else {
    adminPassword = '';
    localStorage.removeItem('porra_admin_password');
  }
  
  localStorage.setItem('porra_admin_mode', adminMode);
  
  const navIndicator = document.getElementById('admin-nav-indicator');
  const alertWarning = document.getElementById('admin-mode-warning-alert');
  const syncCard = document.getElementById('admin-sync-card');
  
  if (adminMode) {
    navIndicator.style.display = 'inline-block';
    alertWarning.style.display = 'flex';
    if (syncCard) syncCard.style.display = 'block';
    updateSyncDisplay();
  } else {
    navIndicator.style.display = 'none';
    alertWarning.style.display = 'none';
    if (syncCard) syncCard.style.display = 'none';
  }
  
  // Recalculate bracket cache for new active state
  recalculateBracketData();
  
  // Render updated screens
  updateAndRenderAll();
  
  // Force back to step 1 of predictor
  if (activeStep > 1) {
    nextStep(1);
  }
}

// Force sync from internet
async function forceSyncResults() {
  if (!adminPassword) {
    adminPassword = prompt('Introduce la contraseña de administrador para realizar esta acción:') || '';
    localStorage.setItem('porra_admin_password', adminPassword);
  }
  
  const statusText = document.getElementById('admin-sync-status-text');
  if (statusText) statusText.innerHTML = 'Sincronizando con internet...';

  try {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'x-admin-password': adminPassword
      }
    });
    
    if (res.ok) {
      alert('¡Sincronización completada con éxito!');
      await fetchServerData();
      updateAndRenderAll();
    } else if (res.status === 401) {
      alert('Contraseña de administrador incorrecta. Se ha limpiado la contraseña guardada.');
      localStorage.removeItem('porra_admin_password');
      adminPassword = '';
      const cb = document.getElementById('checkbox-admin-mode');
      if (cb) cb.checked = false;
      toggleAdminMode();
    } else {
      const errData = await res.json();
      alert(`Error al sincronizar: ${errData.error}`);
    }
  } catch (err) {
    alert('Error de red al conectar con el servidor.');
  } finally {
    updateSyncDisplay();
  }
}

// Toggle auto-sync setting
async function toggleAutoSync(checkboxEl) {
  if (!adminPassword) {
    adminPassword = prompt('Introduce la contraseña de administrador para realizar esta acción:') || '';
    localStorage.setItem('porra_admin_password', adminPassword);
  }
  
  try {
    const res = await fetch('/api/toggle-autosync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': adminPassword
      },
      body: JSON.stringify({ enabled: checkboxEl.checked })
    });
    
    if (res.ok) {
      const data = await res.json();
      autoSyncEnabled = data.autoSync;
      updateSyncDisplay();
    } else if (res.status === 401) {
      alert('Contraseña de administrador incorrecta.');
      checkboxEl.checked = !checkboxEl.checked; // Revert
      localStorage.removeItem('porra_admin_password');
      adminPassword = '';
      const cb = document.getElementById('checkbox-admin-mode');
      if (cb) cb.checked = false;
      toggleAdminMode();
    } else {
      const errData = await res.json();
      alert(`Error: ${errData.error}`);
      checkboxEl.checked = !checkboxEl.checked; // Revert
    }
  } catch (err) {
    alert('Error de red.');
    checkboxEl.checked = !checkboxEl.checked; // Revert
  }
}

// Update sync card UI display
function updateSyncDisplay() {
  const checkbox = document.getElementById('checkbox-auto-sync');
  const statusText = document.getElementById('admin-sync-status-text');
  
  if (checkbox) checkbox.checked = autoSyncEnabled;
  
  if (statusText) {
    if (autoSyncEnabled) {
      statusText.innerHTML = 'Estado: <span style="color:var(--accent-green); font-weight:bold;">Sincronización Automática Activa</span> (los resultados se importan de internet).';
    } else {
      statusText.innerHTML = 'Estado: <span style="color:var(--accent-red); font-weight:bold;">Sincronización Desactivada (Sobrescritura Manual)</span>.';
    }
  }
}

// Compute scores for all players based on actualResults
function calculatePlayerScores() {
  participants.forEach(p => {
    let score = 0;
    
    // A. Groups Stage Matching (12 groups A-L)
    Object.keys(p.groups).forEach(key => {
      // Solo calcular puntos si el grupo está oficialmente finalizado
      if (!actualResults.resolvedGroups || !actualResults.resolvedGroups.includes(key)) {
        return;
      }
      
      const pGroup = p.groups[key];
      const rGroup = actualResults.groups[key];
      
      const p1 = pGroup[0];
      const p2 = pGroup[1];
      const r1 = rGroup[0];
      const r2 = rGroup[1];
      
      // Check for qualifications (regardless of exact position)
      const p1Qualified = p1 === r1 || p1 === r2;
      const p2Qualified = p2 === r1 || p2 === r2;
      
      if (p1Qualified) score += 3;
      if (p2Qualified) score += 3;
      
      // Exact position bonus (+2 points)
      if (p1 === r1) score += 2;
      if (p2 === r2) score += 2;
    });

    // B. Best Third Places Wildcards
    // Players selected 8 wildcards. Only calculate points if group stage is fully resolved.
    if (actualResults.resolvedGroups && actualResults.resolvedGroups.length === 12 && actualResults.wildcards) {
      p.wildcards.forEach(wildcardTeamId => {
        if (actualResults.wildcards.includes(wildcardTeamId)) {
          score += 3; // +3 points for correct wildcard qualifier
        }
      });
    }

    // C. Round of 16 (Winners of R32 matches)
    // Player predicts which 16 teams qualify for R16
    const playerR16Teams = getTeamsAdvancingToRound(p, 'r32');
    const realR16Teams = getTeamsAdvancingToRound(actualResults, 'r32');
    
    playerR16Teams.forEach(teamId => {
      if (teamId && realR16Teams.includes(teamId)) {
        score += 5; // +5 points for each correct R16 team
      }
    });

    // D. Quarterfinals (Winners of R16)
    const playerQFTeams = getTeamsAdvancingToRound(p, 'r16');
    const realQFTeams = getTeamsAdvancingToRound(actualResults, 'r16');
    
    playerQFTeams.forEach(teamId => {
      if (teamId && realQFTeams.includes(teamId)) {
        score += 8; // +8 points for each correct QF team
      }
    });

    // E. Semifinals (Winners of QF)
    const playerSFTeams = getTeamsAdvancingToRound(p, 'qf');
    const realSFTeams = getTeamsAdvancingToRound(actualResults, 'qf');
    
    playerSFTeams.forEach(teamId => {
      if (teamId && realSFTeams.includes(teamId)) {
        score += 12; // +12 points for each correct SF team
      }
    });

    // F. Finalists (Winners of SF)
    const playerFinalTeams = getTeamsAdvancingToRound(p, 'sf');
    const realFinalTeams = getTeamsAdvancingToRound(actualResults, 'sf');
    
    playerFinalTeams.forEach(teamId => {
      if (teamId && realFinalTeams.includes(teamId)) {
        score += 18; // +18 points for each correct Finalist
      }
    });

    // G. Champion (Winner of F)
    const playerChampion = getChampionForState(p);
    const realChampion = getChampionForState(actualResults);
    
    if (playerChampion && playerChampion === realChampion) {
      score += 25; // +25 points for correct champion
    }

    // H. Extras (Scorer and MVP)
    if (actualResults.extras.scorer && p.extras.scorer && p.extras.scorer.trim().toLowerCase() === actualResults.extras.scorer.trim().toLowerCase()) {
      score += 10;
    }
    if (actualResults.extras.mvp && p.extras.mvp && p.extras.mvp.trim().toLowerCase() === actualResults.extras.mvp.trim().toLowerCase()) {
      score += 10;
    }

    p.score = score;
  });

  // Sort participants by score (highest first)
  // Tiebreakers: 
  // 1. Champion correct?
  // 2. Proximity of goals
  participants.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    
    // Tiebreaker 1: Champion correct
    const aChampCorrect = getChampionForState(a) === getChampionForState(actualResults);
    const bChampCorrect = getChampionForState(b) === getChampionForState(actualResults);
    if (aChampCorrect !== bChampCorrect) {
      return bChampCorrect ? 1 : -1;
    }
    
    // Tiebreaker 2: Goal prediction proximity
    const realGoals = actualResults.extras.goals || 0;
    const aGoalsDiff = Math.abs((a.extras.goals || 0) - realGoals);
    const bGoalsDiff = Math.abs((b.extras.goals || 0) - realGoals);
    return aGoalsDiff - bGoalsDiff;
  });

  localStorage.setItem('porra_participants', JSON.stringify(participants));
}

// Compute the list of team IDs advancing to a specific round in a state object
function getTeamsAdvancingToRound(stateObj, roundKey) {
  // Let's resolve the bracket data for this specific state object
  let r32Teams = R32_MATCH_DEFS.map(def => {
    const t1 = stateObj.groups[def.t1.group][def.t1.rank - 1];
    const t2 = def.t2.source === 'wildcard' ? stateObj.wildcards[def.t2.index] : stateObj.groups[def.t2.group][def.t2.rank - 1];
    return [t1, t2];
  });

  if (roundKey === 'r32') {
    return r32Teams.map((teams, idx) => {
      const winnerIdx = stateObj.bracket.r32[idx];
      return winnerIdx !== null ? teams[winnerIdx] : null;
    });
  }

  // R16
  let r16Teams = [];
  for (let i = 0; i < 8; i++) {
    const w1Idx = stateObj.bracket.r32[2 * i];
    const w2Idx = stateObj.bracket.r32[2 * i + 1];
    const t1 = w1Idx !== null ? r32Teams[2 * i][w1Idx] : null;
    const t2 = w2Idx !== null ? r32Teams[2 * i + 1][w2Idx] : null;
    r16Teams.push([t1, t2]);
  }
  
  if (roundKey === 'r16') {
    return r16Teams.map((teams, idx) => {
      const winnerIdx = stateObj.bracket.r16[idx];
      return winnerIdx !== null ? teams[winnerIdx] : null;
    });
  }

  // QF
  let qfTeams = [];
  for (let i = 0; i < 4; i++) {
    const w1Idx = stateObj.bracket.r16[2 * i];
    const w2Idx = stateObj.bracket.r16[2 * i + 1];
    const t1 = w1Idx !== null ? r16Teams[2 * i][w1Idx] : null;
    const t2 = w2Idx !== null ? r16Teams[2 * i + 1][w2Idx] : null;
    qfTeams.push([t1, t2]);
  }

  if (roundKey === 'qf') {
    return qfTeams.map((teams, idx) => {
      const winnerIdx = stateObj.bracket.qf[idx];
      return winnerIdx !== null ? teams[winnerIdx] : null;
    });
  }

  // SF
  let sfTeams = [];
  for (let i = 0; i < 2; i++) {
    const w1Idx = stateObj.bracket.qf[2 * i];
    const w2Idx = stateObj.bracket.qf[2 * i + 1];
    const t1 = w1Idx !== null ? qfTeams[2 * i][w1Idx] : null;
    const t2 = w2Idx !== null ? qfTeams[2 * i + 1][w2Idx] : null;
    sfTeams.push([t1, t2]);
  }

  if (roundKey === 'sf') {
    return sfTeams.map((teams, idx) => {
      const winnerIdx = stateObj.bracket.sf[idx];
      return winnerIdx !== null ? teams[winnerIdx] : null;
    });
  }

  return [];
}

// Get the champion team ID for a state object
function getChampionForState(stateObj) {
  const finalists = getTeamsAdvancingToRound(stateObj, 'sf');
  if (stateObj.bracket.f === null || !finalists[0] || !finalists[1]) return null;
  return finalists[stateObj.bracket.f];
}

function renderLeaderboardTable() {
  const tbody = document.getElementById('leaderboard-tbody');
  const emptyState = document.getElementById('leaderboard-empty-state');
  const query = document.getElementById('leaderboard-search').value.toLowerCase().trim();
  
  tbody.innerHTML = '';
  
  // Filter participants
  const filtered = participants.filter(p => p.name.toLowerCase().includes(query));
  
  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  // Calculate ranks
  filtered.forEach((p, idx) => {
    const tr = document.createElement('tr');
    if (!p.paid) {
      tr.className = 'row-unpaid';
    }
    
    // Rank formatting
    let rankHtml = idx + 1;
    if (idx === 0) rankHtml = '<span class="rank-gold">🥇</span>';
    else if (idx === 1) rankHtml = '<span class="rank-silver">🥈</span>';
    else if (idx === 2) rankHtml = '<span class="rank-bronze">🥉</span>';
    
    const champId = getChampionForState(p);
    const champion = champId ? TEAMS[champId] : null;
    
    tr.innerHTML = `
      <td style="text-align:center;" class="rank-cell">${rankHtml}</td>
      <td>
        <div class="participant-cell">
          <div class="p-avatar">${p.avatar || '⚽'}</div>
          <div>
            <div class="p-name">${p.name} ${p.isLocalOnly ? '<small style="color:var(--accent-gold); font-size:0.75rem; margin-left:5px; border:1px solid rgba(255,215,0,0.3); padding:1px 4px; border-radius:4px; font-weight:bold; letter-spacing:0.5px;">LOCAL</small>' : ''}</div>
          </div>
        </div>
      </td>
      <td style="text-align:center;">
        <span class="payment-badge ${p.paid ? 'badge-paid' : 'badge-pending'}" onclick="togglePaidStatus(${idx})">
          ${p.paid ? 'PAGADO' : 'PENDIENTE'}
        </span>
      </td>
      <td style="text-align:center;">
        ${champion ? `<span class="team-flag" title="${champion.name}">${champion.flag}</span> ${champion.name}` : '<span style="color:var(--text-muted);">TBD</span>'}
      </td>
      <td style="text-align:center;" class="score-cell">${p.score || 0}</td>
      <td style="text-align:center;">
        <div class="actions-cell">
          <button class="icon-btn" title="Ver pronóstico" onclick="viewPlayerPrediction(${idx})">👁️</button>
          <button class="icon-btn icon-btn-delete" title="Eliminar" onclick="deleteParticipant(${idx})">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function togglePaidStatus(index) {
  const p = participants[index];
  
  if (!adminPassword) {
    adminPassword = prompt('Introduce la contraseña de administrador para realizar esta acción:') || '';
    localStorage.setItem('porra_admin_password', adminPassword);
  }
  
  let onlineSuccess = false;
  try {
    const res = await fetch('/api/participants/toggle-paid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': adminPassword
      },
      body: JSON.stringify({ contact: p.contact })
    });
    if (res.ok) {
      const data = await res.json();
      p.paid = data.paid;
      onlineSuccess = true;
    } else {
      const errData = await res.json();
      alert(`Error: ${errData.error}`);
      if (res.status === 401) {
        localStorage.removeItem('porra_admin_password');
        adminPassword = '';
        const cb = document.getElementById('checkbox-admin-mode');
        if (cb) {
          cb.checked = false;
          toggleAdminMode();
        }
      }
      return;
    }
  } catch (err) {
    console.warn('Servidor offline. Guardando cambio de pago en almacenamiento local.');
  }
  
  if (!onlineSuccess) {
    p.paid = !p.paid;
  }
  
  localStorage.setItem('porra_participants', JSON.stringify(participants));
  renderLeaderboardTable();
}

async function deleteParticipant(index) {
  const p = participants[index];
  if (!confirm(`¿Estás seguro de que quieres eliminar a ${p.name} de la porra?`)) {
    return;
  }
  
  if (!adminPassword) {
    adminPassword = prompt('Introduce la contraseña de administrador para realizar esta acción:') || '';
    localStorage.setItem('porra_admin_password', adminPassword);
  }
  
  let onlineSuccess = false;
  try {
    const res = await fetch('/api/participants/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': adminPassword
      },
      body: JSON.stringify({ contact: p.contact })
    });
    if (res.ok) {
      onlineSuccess = true;
    } else {
      const errData = await res.json();
      alert(`Error: ${errData.error}`);
      if (res.status === 401) {
        localStorage.removeItem('porra_admin_password');
        adminPassword = '';
        const cb = document.getElementById('checkbox-admin-mode');
        if (cb) {
          cb.checked = false;
          toggleAdminMode();
        }
      }
      return;
    }
  } catch (err) {
    console.warn('Servidor offline. Guardando eliminación en almacenamiento local.');
  }
  
  participants.splice(index, 1);
  calculatePlayerScores();
  renderLeaderboardTable();
}

// ==========================================
// MODAL CONTROLS
// ==========================================

function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Setup PDF.js worker
const pdfjsLib = window['pdfjs-dist/build/pdf'];
if (pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

// Extract base64 code from PDF file
async function extractBase64FromPDF(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function() {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        let textContent = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          const pageText = text.items.map(item => item.str).join(' ');
          textContent += pageText + '\n';
        }
        
        console.log("[PDF Import] Texto extraído:", textContent);
        
        const cleanText = textContent.replace(/\s+/g, ' ');
        const marker = "MANUAL):";
        const markerIdx = cleanText.indexOf(marker);
        
        let words = [];
        if (markerIdx !== -1) {
          const rest = cleanText.substring(markerIdx + marker.length).trim();
          words = rest.split(/\s+/);
        } else {
          words = cleanText.split(/\s+/);
        }
        
        // Find the first word that starts with 'ey' (JSON base64 prefix)
        let startIndex = words.findIndex(w => w.startsWith('ey'));
        if (startIndex === -1) {
          // Fallback to any long word if no 'ey' prefix found
          startIndex = words.findIndex(w => w.length > 50);
        }
        
        if (startIndex === -1) {
          reject(new Error('No se encontró el código de validación en el PDF.'));
          return;
        }
        
        // Reconstruct the base64 code by adding words one by one and checking decode viability
        let currentString = '';
        for (let i = startIndex; i < words.length; i++) {
          currentString += words[i];
          const decoded = decodeBet(currentString);
          if (decoded) {
            console.log("[PDF Import] Código decodificado con éxito!");
            resolve(currentString);
            return;
          }
        }
        
        reject(new Error('El código de apuesta extraído no es válido o está dañado.'));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo.'));
    reader.readAsArrayBuffer(file);
  });
}

// File picker handler for PDF import
async function importPredictorFromPDF(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const code = await extractBase64FromPDF(file);
    if (!code) {
      alert("No se pudo encontrar el código de validación en el PDF.");
      return;
    }
    loadBetCodeIntoPredictor(code);
  } catch (err) {
    console.error("Error al importar desde el PDF:", err);
    alert("Error al leer el archivo PDF. Asegúrate de subir el archivo PDF del recibo oficial generado por la web.");
  } finally {
    event.target.value = ''; // clear input
  }
}

// Paste Code Modal handlers
function openPasteCodeModal() {
  document.getElementById('textarea-edit-paste-code').value = '';
  openModal('modal-edit-paste-code');
}

function submitEditPasteCode() {
  const code = document.getElementById('textarea-edit-paste-code').value.trim();
  if (!code) {
    alert('Por favor, pega un código de apuesta.');
    return;
  }
  loadBetCodeIntoPredictor(code);
  closeModal('modal-edit-paste-code');
}

// Load a base64 code into the user draft predictor state
function loadBetCodeIntoPredictor(code) {
  const betObj = decodeBet(code);
  if (!betObj) {
    alert("El código de apuesta no es válido o está dañado.");
    return;
  }
  
  // Set user state
  userPredictorState = betObj;
  saveUserDraft();
  
  // Populate all inputs and UI components
  populateFormFields();
  recalculateBracketData();
  updateAndRenderAll();
  
  // Move to Step 1
  nextStep(1);
  
  alert(`¡Apuesta de ${betObj.name} cargada con éxito! Ahora puedes revisar y modificar tus pronósticos en las pestañas.`);
}

// 1. Import Player Code Modal
function openImportModal() {
  document.getElementById('textarea-import-code').value = '';
  openModal('modal-import-bet');
}

async function submitImportedCode() {
  const code = document.getElementById('textarea-import-code').value.trim();
  if (!code) {
    alert('Por favor, pega un código de apuesta.');
    return;
  }
  
  const betObj = decodeBet(code);
  if (!betObj) {
    alert('Código inválido. Asegúrate de copiar el código completo generado por la web.');
    return;
  }
  
  // Check if contact already exists
  const existingIdx = participants.findIndex(p => p.contact === betObj.contact);
  let preservePaid = false;
  if (existingIdx > -1) {
    if (!confirm(`El participante con el contacto ${betObj.contact} ya existe (${participants[existingIdx].name}). ¿Deseas sobreescribir su apuesta?`)) {
      closeModal('modal-import-bet');
      return;
    }
    preservePaid = participants[existingIdx].paid;
  }
  
  // Submit to Server Database
  try {
    const response = await fetch('/api/participants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(betObj)
    });
    
    if (response.ok) {
      // Reload participants list from server to be in sync
      const res = await fetch('/api/participants');
      if (res.ok) {
        participants = await res.json();
      } else {
        // Fallback local update
        if (existingIdx > -1) {
          participants[existingIdx] = { ...betObj, paid: preservePaid, score: 0 };
        } else {
          participants.push({ ...betObj, paid: false, score: 0 });
        }
      }
      
      calculatePlayerScores();
      renderLeaderboardTable();
      closeModal('modal-import-bet');
      alert(`¡Apuesta de ${betObj.name} importada y guardada en el servidor con éxito!`);
    } else {
      alert('⚠️ Hubo un error en el servidor al intentar guardar la apuesta importada.');
    }
  } catch (err) {
    console.error('Error al conectar con el servidor:', err);
    alert('⚠️ No se pudo conectar con el servidor para registrar la apuesta importada.');
  }
}

// 2. View Player Prediction Modal
let viewPlayerPredictionState = null;
let activeViewTab = 'groups';
let activeViewBracketTab = 'r32';

function viewPlayerPrediction(index) {
  viewPlayerPredictionState = participants[index];
  
  document.getElementById('modal-view-title').innerText = `Apuesta de ${viewPlayerPredictionState.name}`;
  document.getElementById('modal-view-score-banner').innerText = `Puntuación Actual: ${viewPlayerPredictionState.score || 0} puntos`;
  
  // Render Read-Only components
  renderViewOnlyGroups();
  renderViewOnlyBracket();
  renderViewOnlyExtras();
  
  switchViewDetailTab('groups');
  openModal('modal-view-prediction');
}

function switchViewDetailTab(tabKey) {
  activeViewTab = tabKey;
  
  const tabs = ['groups', 'bracket', 'extras'];
  tabs.forEach(t => {
    const btn = document.getElementById(`view-tab-btn-${t}`);
    const panel = document.getElementById(`view-detail-${t}`);
    if (btn && panel) {
      if (t === tabKey) {
        btn.classList.add('active');
        panel.style.display = 'block';
      } else {
        btn.classList.remove('active');
        panel.style.display = 'none';
      }
    }
  });
}

function renderViewOnlyGroups() {
  const container = document.getElementById('view-modal-groups-container');
  container.innerHTML = '';
  
  const state = viewPlayerPredictionState;
  
  Object.keys(state.groups).forEach(key => {
    const groupTeams = state.groups[key];
    const card = document.createElement('div');
    card.className = 'group-card';
    
    let rowsHtml = '';
    groupTeams.forEach((teamId, index) => {
      const team = TEAMS[teamId];
      let rankClass = '';
      if (index === 0) rankClass = 'rank-1';
      else if (index === 1) rankClass = 'rank-2';
      else if (index === 2) rankClass = 'rank-3';
      else if (index === 3) rankClass = 'rank-4';
      
      rowsHtml += `
        <div class="team-row ${rankClass}" style="padding: 6px 10px;">
          <div class="team-info">
            <span class="team-rank-badge" style="width:16px; height:16px; font-size:0.65rem;">${index + 1}</span>
            <span class="team-flag" style="font-size:1.1rem;">${team.flag}</span>
            <span class="team-name" style="font-size:0.85rem;">${team.name}</span>
          </div>
        </div>
      `;
    });
    
    card.innerHTML = `
      <div class="group-header" style="font-size:1rem; margin-bottom:8px; padding-bottom:6px;">
        <strong>GRUPO ${key}</strong>
      </div>
      <div class="team-list">
        ${rowsHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

function switchViewBracketTab(tabKey) {
  activeViewBracketTab = tabKey;
  
  const tabs = ['r32', 'r16', 'qf', 'sf'];
  const panelIds = {
    r32: 'view-modal-bracket-r32',
    r16: 'view-modal-bracket-r16',
    qf: 'view-modal-bracket-qf',
    sf: 'view-modal-bracket-sf'
  };
  
  const navContainer = document.getElementById('view-modal-bracket-tabs-nav');
  const buttons = navContainer.querySelectorAll('.bracket-tab-btn');
  
  buttons.forEach(btn => {
    if (btn.innerText.toLowerCase().includes(tabKey === 'r32' ? 'r32' : tabKey === 'r16' ? 'octa' : tabKey === 'qf' ? 'cuar' : 'semi')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  Object.keys(panelIds).forEach(k => {
    const el = document.getElementById(panelIds[k]);
    if (el) {
      el.style.display = k === tabKey ? 'block' : 'none';
    }
  });
}

function renderViewOnlyBracket() {
  const p = viewPlayerPredictionState;
  
  // We need to resolve the matches for this specific player's prediction
  let r32 = R32_MATCH_DEFS.map(def => {
    const t1Id = p.groups[def.t1.group][def.t1.rank - 1];
    const t2Id = def.t2.source === 'wildcard' ? p.wildcards[def.t2.index] : p.groups[def.t2.group][def.t2.rank - 1];
    
    const t1 = t1Id ? { id: t1Id, ...TEAMS[t1Id] } : null;
    const t2 = t2Id ? { id: t2Id, ...TEAMS[t2Id] } : null;
    return [t1, t2];
  });

  let r16 = [];
  for (let i = 0; i < 8; i++) {
    const w1Idx = p.bracket.r32[2 * i];
    const w2Idx = p.bracket.r32[2 * i + 1];
    r16.push([
      w1Idx !== null && r32[2 * i] ? r32[2 * i][w1Idx] : null,
      w2Idx !== null && r32[2 * i + 1] ? r32[2 * i + 1][w2Idx] : null
    ]);
  }

  let qf = [];
  for (let i = 0; i < 4; i++) {
    const w1Idx = p.bracket.r16[2 * i];
    const w2Idx = p.bracket.r16[2 * i + 1];
    qf.push([
      w1Idx !== null && r16[2 * i] ? r16[2 * i][w1Idx] : null,
      w2Idx !== null && r16[2 * i + 1] ? r16[2 * i + 1][w2Idx] : null
    ]);
  }

  let sf = [];
  for (let i = 0; i < 2; i++) {
    const w1Idx = p.bracket.qf[2 * i];
    const w2Idx = p.bracket.qf[2 * i + 1];
    sf.push([
      w1Idx !== null && qf[2 * i] ? qf[2 * i][w1Idx] : null,
      w2Idx !== null && qf[2 * i + 1] ? qf[2 * i + 1][w2Idx] : null
    ]);
  }

  let f = [[
    p.bracket.sf[0] !== null && sf[0] ? sf[0][p.bracket.sf[0]] : null,
    p.bracket.sf[1] !== null && sf[1] ? sf[1][p.bracket.sf[1]] : null
  ]];

  // Render lists in modals (using read-only lists)
  renderReadOnlyMatchList('view-matches-r32', 'r32', r32, p);
  renderReadOnlyMatchList('view-matches-r16', 'r16', r16, p);
  renderReadOnlyMatchList('view-matches-qf', 'qf', qf, p);
  
  const sfFinalContainer = document.getElementById('view-matches-sf');
  sfFinalContainer.innerHTML = '';
  
  const semisHeader = document.createElement('h4');
  semisHeader.style.margin = '10px 0 5px 0';
  semisHeader.style.color = 'var(--text-secondary)';
  semisHeader.innerText = 'Semifinales';
  sfFinalContainer.appendChild(semisHeader);
  
  const semisGrid = document.createElement('div');
  semisGrid.className = 'bracket-matches-list';
  sfFinalContainer.appendChild(semisGrid);
  renderReadOnlyMatchListElement(semisGrid, 'sf', sf, p);
  
  const finalHeader = document.createElement('h4');
  finalHeader.style.margin = '20px 0 5px 0';
  finalHeader.style.color = 'var(--accent-gold)';
  finalHeader.innerText = 'Gran Final';
  sfFinalContainer.appendChild(finalHeader);
  
  const finalGrid = document.createElement('div');
  finalGrid.className = 'bracket-matches-list';
  sfFinalContainer.appendChild(finalGrid);
  renderReadOnlyMatchListElement(finalGrid, 'f', f, p);
}

function renderReadOnlyMatchList(containerId, roundKey, matchesData, participantState) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  renderReadOnlyMatchListElement(container, roundKey, matchesData, participantState);
}

function renderReadOnlyMatchListElement(containerElement, roundKey, matchesData, p) {
  matchesData.forEach((teams, matchIdx) => {
    const card = document.createElement('div');
    card.className = 'match-card';
    
    const team1 = teams[0];
    const team2 = teams[1];
    
    const selectedWinner = roundKey === 'f' ? p.bracket.f : p.bracket[roundKey][matchIdx];
    
    const team1Class = selectedWinner === 0 ? 'match-team selected-winner' : selectedWinner === 1 ? 'match-team loser' : 'match-team';
    const team2Class = selectedWinner === 1 ? 'match-team selected-winner' : selectedWinner === 0 ? 'match-team loser' : 'match-team';
    
    const matchNum = roundKey === 'r32' ? `D-Match ${matchIdx + 1}` : roundKey === 'r16' ? `O-Match ${matchIdx + 1}` : roundKey === 'qf' ? `C-Match ${matchIdx + 1}` : roundKey === 'sf' ? `S-Match ${matchIdx + 1}` : '🏆 Gran Final';
    
    card.innerHTML = `
      <div class="match-header">
        <span>${matchNum}</span>
      </div>
      
      <div class="${team1Class}" style="cursor:default;">
        <div class="team-info">
          <span class="team-flag">${team1 ? team1.flag : '❓'}</span>
          <span class="team-name">${team1 ? team1.name : 'TBD'}</span>
        </div>
        <span class="winner-indicator">⭐</span>
      </div>
      
      <div class="${team2Class}" style="cursor:default;">
        <div class="team-info">
          <span class="team-flag">${team2 ? team2.flag : '❓'}</span>
          <span class="team-name">${team2 ? team2.name : 'TBD'}</span>
        </div>
        <span class="winner-indicator">⭐</span>
      </div>
    `;
    containerElement.appendChild(card);
  });
}

function renderViewOnlyExtras() {
  const container = document.getElementById('view-modal-extras-container');
  container.innerHTML = '';
  
  const p = viewPlayerPredictionState;
  const champId = getChampionForState(p);
  const champion = champId ? TEAMS[champId] : null;
  
  container.innerHTML = `
    <div class="summary-item">
      <span class="summary-item-label">Campeón Pronosticado:</span>
      <span class="summary-item-value">${champion ? `<span class="team-flag">${champion.flag}</span> ${champion.name}` : 'Ninguno'}</span>
    </div>
    <div class="summary-item">
      <span class="summary-item-label">Bota de Oro:</span>
      <span class="summary-item-value">${p.extras.scorer || 'Ninguno'}</span>
    </div>
    <div class="summary-item">
      <span class="summary-item-label">Balón de Oro (MVP):</span>
      <span class="summary-item-value">${p.extras.mvp || 'Ninguno'}</span>
    </div>
    <div class="summary-item">
      <span class="summary-item-label">Goles Totales Mundial:</span>
      <span class="summary-item-value">${p.extras.goals ? `${p.extras.goals} goles` : 'Ninguno'}</span>
    </div>
  `;
}

// 3. Database backups
function downloadBackupJSON() {
  const backup = {
    participants: participants,
    actualResults: actualResults
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href",     dataStr);
  downloadAnchor.setAttribute("download", `porra_mundial2026_database_backup.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function triggerFileInput() {
  document.getElementById('file-backup-input').click();
}

function importBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const fileInput = event.target;
  const reader = new FileReader();
  reader.onload = async function(e) {
    fileInput.value = '';
    try {
      const data = JSON.parse(e.target.result);
      if (data.participants && Array.isArray(data.participants)) {
        if (!adminPassword) {
          adminPassword = prompt('Introduce la contraseña de administrador para realizar esta acción:') || '';
          localStorage.setItem('porra_admin_password', adminPassword);
        }

        try {
          const res = await fetch('/api/restore', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-admin-password': adminPassword
            },
            body: JSON.stringify(data)
          });
          
          if (res.ok) {
            participants = data.participants;
            if (data.actualResults) {
              actualResults = data.actualResults;
              localStorage.setItem('porra_actual_results', JSON.stringify(actualResults));
            }
            
            calculatePlayerScores();
            renderLeaderboardTable();
            alert('¡Copia de seguridad cargada y guardada en el servidor con éxito!');
          } else if (res.status === 401) {
            alert('Contraseña incorrecta. Se ha limpiado la contraseña guardada.');
            localStorage.removeItem('porra_admin_password');
            adminPassword = '';
            const cb = document.getElementById('checkbox-admin-mode');
            if (cb) {
              cb.checked = false;
              toggleAdminMode();
            }
          } else {
            const errData = await res.json();
            alert(`Error: ${errData.error}`);
          }
        } catch (err) {
          console.error(err);
          alert('Error de red al conectar con el servidor.');
        }
      } else {
        alert('Formato de archivo inválido.');
      }
    } catch (err) {
      console.error(err);
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
}


async function clearAllSystemData() {
  if (!confirm('🚨 ¡ATENCIÓN! Esto eliminará de forma permanente todos los participantes importados y restablecerá la configuración. ¿Quieres continuar?')) {
    return;
  }
  
  if (!adminPassword) {
    adminPassword = prompt('Introduce la contraseña de administrador para realizar esta acción:') || '';
    localStorage.setItem('porra_admin_password', adminPassword);
  }
  
  let onlineSuccess = false;
  try {
    const res = await fetch('/api/reset', {
      method: 'POST',
      headers: {
        'x-admin-password': adminPassword
      }
    });
    if (res.ok) {
      onlineSuccess = true;
    } else if (res.status === 401) {
      alert('Contraseña incorrecta. Se ha limpiado la contraseña guardada.');
      localStorage.removeItem('porra_admin_password');
      adminPassword = '';
      const cb = document.getElementById('checkbox-admin-mode');
      if (cb) {
        cb.checked = false;
        toggleAdminMode();
      }
      return;
    } else {
      const errData = await res.json();
      alert(`Error: ${errData.error}`);
      return;
    }
  } catch (err) {
    console.warn('Servidor offline. Restableciendo almacenamiento local.');
  }
  
  participants = [];
  actualResults = createEmptyState();
  userPredictorState = createEmptyState();
  localStorage.clear();
  adminPassword = '';
  
  // Reinitialize
  await initApp();
  populateFormFields();
  nextStep(1);
  alert('Todos los datos se han eliminado de forma permanente.');
}

async function changeAdminPassword() {
  const oldPw = prompt('Introduce la contraseña actual de Administrador:');
  if (oldPw === null) return;
  
  const newPw = prompt('Introduce la NUEVA contraseña de Administrador:');
  if (!newPw) {
    alert('La contraseña nueva no puede estar vacía.');
    return;
  }
  
  try {
    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ oldPassword: oldPw, newPassword: newPw })
    });
    
    if (res.ok) {
      adminPassword = newPw;
      localStorage.setItem('porra_admin_password', newPw);
      alert('¡Contraseña cambiada correctamente!');
    } else {
      const errData = await res.json();
      alert(`Error: ${errData.error}`);
      if (res.status === 401) {
        localStorage.removeItem('porra_admin_password');
        adminPassword = '';
      }
    }
  } catch (err) {
    alert('Error al conectar con el servidor.');
  }
}

// ==========================================
// CENTRAL TAB & VIEW UPDATER
// ==========================================

function switchMainTab(tabName) {
  // Navigation Tabs Styling
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    if (btn.id === `btn-tab-${tabName === 'predictor' ? 'predictor' : tabName === 'leaderboard' ? 'leaderboard' : 'rules'}`) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // App Sections Toggle
  const sections = ['predictor', 'leaderboard', 'rules'];
  sections.forEach(sec => {
    const el = document.getElementById(`section-${sec}`);
    if (el) {
      if (sec === tabName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });
  
  // Clear passive polling when switching tabs
  if (leaderboardInterval) {
    clearInterval(leaderboardInterval);
    leaderboardInterval = null;
  }
  
  if (tabName === 'predictor') {
    // If returning to predictor, make sure we reflect correct inputs
    populateFormFields();
  }
  
  if (tabName === 'leaderboard') {
    // Fetch latest data from server when opening the leaderboard
    fetchServerData().then(() => {
      calculatePlayerScores();
      renderLeaderboardTable();
    });
    
    // Auto-sync polling every 20 seconds
    leaderboardInterval = setInterval(() => {
      fetchServerData().then(() => {
        calculatePlayerScores();
        renderLeaderboardTable();
      });
    }, 20000);
  }
}

function updateAndRenderAll() {
  // Recalculate brackets
  recalculateBracketData();
  
  // Render Steps
  renderGroupStage();
  renderWildcardsSection();
  renderBracketView();
  checkBracketCompletion();
  
  // Render Admin dashboards
  calculatePlayerScores();
  renderLeaderboardTable();
  
  // Populate form fields
  populateFormFields();
  updateStepTracker();
}

// Run application on load
window.addEventListener('DOMContentLoaded', () => {
  initApp();
});
