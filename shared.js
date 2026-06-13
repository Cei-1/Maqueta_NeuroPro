/**
 * NeuroPro 2026 — shared.js
 * Estado compartido, navegación y utilidades para todos los módulos.
 */

// ─────────────────────────────────────────────
// CLAVES DE ALMACENAMIENTO
// ─────────────────────────────────────────────
const NP_KEYS = {
  SESSION:    'NP_session_2026',
  PROFILE:    'NP_profile_2026',
  NETWORK:    'NP_network_2026',
  ACCOUNTS:   'NP_accounts_2026',
  ROUTINES:   'NP_routinesData_2026',
  SUPPORTS:   'NP_supportsState_2026',
  ACTIVE:     'NP_activeRoutinesState_2026',
  HISTORY:    'NP_history_2026',
  THEME:      'NP_theme_2026',
  TASKS:      'NP_tasks_2026',       // Tareas programadas (agenda)
  EXECUTIONS: 'NP_executions_2026', // Historial de ejecuciones detalladas
};

// ─────────────────────────────────────────────
// DATOS DEMO PREDETERMINADOS
// ─────────────────────────────────────────────
const NP_DEMO_PROFILE = {
  name: 'Tomás López',
  age: 12,
  diagnosis: 'TEA Nivel 1 (Síndrome de Asperger)',
  communication: 'Verbal con apoyo visual',
  photo: null,
};

const NP_DEMO_NETWORK = [
  { id: 1, name: 'María López',     role: 'Madre',    photo: null, active: true, pin: '1234' },
  { id: 2, name: 'Carlos López',    role: 'Padre',    photo: null, active: true, pin: '1234' },
  { id: 3, name: 'Dra. González',   role: 'Terapeuta',photo: null, active: false, pin: '1234' },
];

// Historial simulado (legacy – se mantiene para compatibilidad)
const NP_DEMO_HISTORY = [
];

// ── TAREAS PROGRAMADAS (DEMO) ────────────────────────────────────────────────
// Estructura: { id, skillKey, label, recurrence:'none'|'daily'|'weekly'|'monthly',
//               days:[0-6], time:'HH:MM', startDate, endDate, color, active }
const NP_DEMO_TASKS = [
];

// ── EJECUCIONES DETALLADAS (DEMO) ────────────────────────────────────────────
// Cada vez que Tomás (o el cuidador) completa una tarea se guarda una ejecución
// con el detalle por pictograma (paso a paso).
const _td = new Date().toISOString().slice(0,10); // fecha de hoy para demo
const NP_DEMO_EXECUTIONS = [
];

// Base de 20 habilidades clínicas predeterminadas
const NP_DEFAULT_ROUTINES = {
  lavado_manos: {
    name: 'Lavarse las manos', category: 'Vida Diaria', icon: '🚿',
    colorClass: 'gradient-pink', baselineAutonomy: 45.0,
    description: 'Secuencia de higiene para antes de comer.',
    steps: [
      { id:1, text:'Abrir la llave',      icon:'🚿', description:'Tomás localiza y gira la llave para activar el chorro de agua.' },
      { id:2, text:'Colocarse jabón',     icon:'🧼', description:'Presiona el dispensador para recibir jabón en las palmas.' },
      { id:3, text:'Frotar y enjuagar',   icon:'🙌', description:'Frotar interdigital por 20 segundos y eliminar espuma con agua.' },
      { id:4, text:'Cerrar llave y secar',icon:'🧣', description:'Cierra el grifo y se seca con una toalla limpia.' },
    ],
  },
  cepillado_dientes: {
    name: 'Lavarse los dientes', category: 'Vida Diaria', icon: '🪥',
    colorClass: 'gradient-blue', baselineAutonomy: 50.0,
    description: 'Secuencia de higiene bucal después de los alimentos.',
    steps: [
      { id:1, text:'Poner pasta al cepillo',          icon:'🪥', description:'Coloca una pequeña porción de pasta sobre las cerdas.' },
      { id:2, text:'Cepillar arriba/abajo',           icon:'🦷', description:'Limpia dientes superiores, inferiores y muelas.' },
      { id:3, text:'Enjuagar la boca',                icon:'🥤', description:'Usa agua para enjuagar y escupir en el lavabo.' },
      { id:4, text:'Limpiar el cepillo',              icon:'💦', description:'Lava el cepillo y lo coloca en su portacepillos.' },
    ],
  },
  lavado_cara: {
    name: 'Lavarse la cara', category: 'Vida Diaria', icon: '👦',
    colorClass: 'gradient-teal', baselineAutonomy: 35.0,
    description: 'Rutina matutina de frescura y limpieza.',
    steps: [
      { id:1, text:'Humedecer la cara',              icon:'💦', description:'Lleva agua templada a la cara con las manos ahuecadas.' },
      { id:2, text:'Aplicar jabón suave',            icon:'🧼', description:'Frota suavemente el rostro evitando los ojos.' },
      { id:3, text:'Enjuagar con abundante agua',    icon:'🚿', description:'Retira todo residuo de jabón del rostro.' },
      { id:4, text:'Secar con toalla a toques',      icon:'🧣', description:'Seca con cuidado sin tallar bruscamente.' },
    ],
  },
  peinarse: {
    name: 'Peinar mi cabello', category: 'Vida Diaria', icon: '🪮',
    colorClass: 'gradient-purple', baselineAutonomy: 20.0,
    description: 'Higiene y orden personal diario.',
    steps: [
      { id:1, text:'Humedecer cabello',        icon:'💦', description:'Usa un atomizador o agua de la llave con suavidad.' },
      { id:2, text:'Tomar peine o cepillo',    icon:'🪮', description:'Sujeta de forma firme pero cómoda el mango.' },
      { id:3, text:'Cepillar de raíz a puntas',icon:'💇‍♂️', description:'Pasa el peine desenredando suavemente.' },
      { id:4, text:'Acomodar de lado',         icon:'✨', description:'Alinea el cabello según el estilo deseado.' },
    ],
  },
  cortar_unas: {
    name: 'Revisar y limpiar uñas', category: 'Vida Diaria', icon: '💅',
    colorClass: 'gradient-teal', baselineAutonomy: 15.0,
    description: 'Revisión higiénica de manos.',
    steps: [
      { id:1, text:'Revisar largo de uñas',   icon:'👀', description:'Identifica si requiere corte o limpieza.' },
      { id:2, text:'Cepillar uñas con agua',  icon:'🪥', description:'Remueve suciedad bajo el agua.' },
      { id:3, text:'Secar manos',             icon:'🧣', description:'Usa toalla personal.' },
    ],
  },
  ir_al_bano: {
    name: 'Ir al sanitario', category: 'Vida Diaria', icon: '🚽',
    colorClass: 'gradient-orange', baselineAutonomy: 60.0,
    description: 'Uso higiénico del inodoro.',
    steps: [
      { id:1, text:'Entrar y bajar ropa',        icon:'🚪', description:'Cierra la puerta para mantener privacidad.' },
      { id:2, text:'Usar el inodoro',            icon:'🚽', description:'Espera pacientemente en la posición correcta.' },
      { id:3, text:'Usar papel higiénico',       icon:'🧻', description:'Limpia y desecha el papel en el depósito.' },
      { id:4, text:'Jalar palanca y lavarse',    icon:'💦', description:'Activa el flujo y sale directo a lavarse manos.' },
    ],
  },
  preparar_mochila: {
    name: 'Preparar mi mochila', category: 'Rutina Escolar', icon: '🎒',
    colorClass: 'gradient-blue', baselineAutonomy: 30.0,
    description: 'Estructuración de hábitos escolares y orden.',
    steps: [
      { id:1, text:'Revisar horario',   icon:'📅', description:'Mira la agenda escolar para saber qué cuadernos llevar.' },
      { id:2, text:'Guardar cuadernos', icon:'📚', description:'Acomoda los libros de forma ordenada.' },
      { id:3, text:'Guardar estuche',   icon:'✏️', description:'Asegura lápices, goma de borrar y colores.' },
      { id:4, text:'Cerrar los cierres',icon:'🎒', description:'Verifica que todo esté bien guardado y cerrado.' },
    ],
  },
  guardar_utiles: {
    name: 'Guardar útiles al terminar', category: 'Rutina Escolar', icon: '✏️',
    colorClass: 'gradient-purple', baselineAutonomy: 40.0,
    description: 'Mantener el orden del aula.',
    steps: [
      { id:1, text:'Recoger lapiceras', icon:'✏️', description:'Coloca colores y lápices en su estuche.' },
      { id:2, text:'Guardar estuche',   icon:'🎒', description:'Pon el estuche dentro de la mochila.' },
      { id:3, text:'Cerrar cuadernos',  icon:'📓', description:'Verifica que no queden hojas dobladas.' },
      { id:4, text:'Guardar libros',    icon:'📚', description:'Alinea los libros en la mochila.' },
    ],
  },
  llegada_salon: {
    name: 'Llegada al salón de clases', category: 'Rutina Escolar', icon: '🏫',
    colorClass: 'gradient-teal', baselineAutonomy: 50.0,
    description: 'Actividades iniciales de integración en aula.',
    steps: [
      { id:1, text:'Saludar a la maestra',icon:'👋', description:'Saluda con contacto visual o con un gesto amable.' },
      { id:2, text:'Colgar la mochila',   icon:'🎒', description:'Coloca la mochila en el perchero correspondiente.' },
      { id:3, text:'Tomar su asiento',    icon:'🪑', description:'Ubica su banca de forma tranquila.' },
      { id:4, text:'Sacar libro inicial', icon:'📖', description:'Prepara la primera actividad del día.' },
    ],
  },
  atencion_clase: {
    name: 'Escuchar indicaciones', category: 'Rutina Escolar', icon: '👂',
    colorClass: 'gradient-pink', baselineAutonomy: 25.0,
    description: 'Desarrollo de atención selectiva y conducta adecuada.',
    steps: [
      { id:1, text:'Mirar al pizarrón',   icon:'👀', description:'Alinea la vista hacia donde explica el docente.' },
      { id:2, text:'Manos tranquilas',    icon:'🤝', description:'Coloca manos sobre la mesa libre de distractores.' },
      { id:3, text:'Escuchar en silencio',icon:'🤫', description:'Presta atención a las instrucciones dadas.' },
    ],
  },
  lonchera_recreo: {
    name: 'Comer refrigerio en recreo', category: 'Rutina Escolar', icon: '🥪',
    colorClass: 'gradient-orange', baselineAutonomy: 60.0,
    description: 'Independencia a la hora del almuerzo.',
    steps: [
      { id:1, text:'Sacar lonchera',        icon:'🎒', description:'Busca su lonchera dentro de la mochila al timbre.' },
      { id:2, text:'Limpiar la mesa',       icon:'🧼', description:'Usa toallita para limpiar su espacio.' },
      { id:3, text:'Abrir envases',         icon:'🥤', description:'Destapa recipientes con cuidado.' },
      { id:4, text:'Comer y limpiar residuos',icon:'🥪', description:'Consume sus alimentos y tira empaques al bote.' },
    ],
  },
  respirar_calmarme: {
    name: 'Respirar y Calmarme', category: 'Regulación Emocional', icon: '🌬️',
    colorClass: 'gradient-purple', baselineAutonomy: 20.0,
    description: 'Control de sobrecarga sensorial o emocional.',
    steps: [
      { id:1, text:'Reconocer molestia',      icon:'🧠', description:'Siente señales físicas de sobrecarga sensorial.' },
      { id:2, text:'Pedir pausa / descanso',  icon:'✋', description:'Usa un pictograma o tarjeta para pedir tiempo fuera.' },
      { id:3, text:'Respirar hondo por nariz',icon:'🌬️', description:'Inhala aire inflando el estómago lentamente.' },
      { id:4, text:'Exhalar despacio por boca',icon:'🍃', description:'Expulsa aire como si apagara una vela.' },
    ],
  },
  pausa_sensorial: {
    name: 'Pedir pausa sensorial', category: 'Regulación Emocional', icon: '🧩',
    colorClass: 'gradient-blue', baselineAutonomy: 15.0,
    description: 'Estrategias de autorregulación ante ruidos.',
    steps: [
      { id:1, text:'Sentir incomodidad',     icon:'👂', description:'Nota que el volumen del entorno está muy alto.' },
      { id:2, text:'Mostrar tarjeta de pausa',icon:'📇', description:'Enseña el pictograma de silencio al tutor.' },
      { id:3, text:'Ponerse audífonos',      icon:'🎧', description:'Utiliza audífonos canceladores de ruido.' },
      { id:4, text:'Jugar con fidget toy',   icon:'🧸', description:'Manipula un juguete propioceptivo para relajarse.' },
    ],
  },
  expresar_enojo: {
    name: 'Expresar molestia seguro', category: 'Regulación Emocional', icon: '😡',
    colorClass: 'gradient-pink', baselineAutonomy: 10.0,
    description: 'Canalización asertiva de frustración.',
    steps: [
      { id:1, text:'Manos seguras',          icon:'🤝', description:'Mantiene las manos juntas evitando golpear.' },
      { id:2, text:"Decir 'estoy molesto'",  icon:'🗣️', description:'Usa palabras o el comunicador AAC.' },
      { id:3, text:'Apretar cojín',          icon:'🛋️', description:'Presiona un objeto suave para liberar tensión.' },
    ],
  },
  cambio_actividad: {
    name: 'Transición de actividad', category: 'Regulación Emocional', icon: '🔄',
    colorClass: 'gradient-purple', baselineAutonomy: 30.0,
    description: 'Adaptabilidad ante imprevistos o término de clases.',
    steps: [
      { id:1, text:'Escuchar alarma de cambio',icon:'⏰', description:'La alarma avisa que la clase actual ha terminado.' },
      { id:2, text:'Guardar materiales',       icon:'📁', description:'Cierra el tema que estaba haciendo.' },
      { id:3, text:'Esperar sentado',          icon:'🪑', description:'Guarda la calma en su asiento para lo nuevo.' },
    ],
  },
  espacio_tranquilo: {
    name: 'Ir al rincón de la calma', category: 'Regulación Emocional', icon: '⛺',
    colorClass: 'gradient-teal', baselineAutonomy: 45.0,
    description: 'Autogestión del espacio físico seguro.',
    steps: [
      { id:1, text:'Caminar despacio',       icon:'🚶‍♂️', description:'Se dirige al área de calma sin correr.' },
      { id:2, text:'Sentarse en puff',       icon:'🛋️', description:'Adopta una postura cómoda de relajación.' },
      { id:3, text:'Usar botellas sensoriales',icon:'🍼', description:'Observa la purpurina caer para enfocar la vista.' },
    ],
  },
  saludar_llegar: {
    name: 'Saludar al llegar', category: 'Actividades Sociales', icon: '👋',
    colorClass: 'gradient-teal', baselineAutonomy: 50.0,
    description: 'Actividades básicas de integración social.',
    steps: [
      { id:1, text:'Acercarse a la persona',icon:'🚶‍♂️', description:'Se aproxima respetando el espacio vital.' },
      { id:2, text:'Hacer contacto visual', icon:'👀', description:'Dirige la mirada hacia el rostro de la persona.' },
      { id:3, text:'Gesto de saludo',       icon:'🤚', description:'Choca la mano, da los cinco o dice un hola claro.' },
    ],
  },
  pedir_por_favor: {
    name: 'Pedir objeto por favor', category: 'Actividades Sociales', icon: '🙏',
    colorClass: 'gradient-orange', baselineAutonomy: 40.0,
    description: 'Estructurar peticiones verbales o visuales.',
    steps: [
      { id:1, text:'Señalar o mostrar picto',icon:'📇', description:'Muestra la tarjeta del objeto que desea.' },
      { id:2, text:"Decir 'por favor'",     icon:'🙏', description:'Añade cortesía a su petición.' },
      { id:3, text:'Agradecer al recibir',  icon:'💖', description:"Dice 'gracias' al tomar el objeto." },
    ],
  },
  ponerse_sueter: {
    name: 'Ponerse el suéter', category: 'Actividades Sociales', icon: '👕',
    colorClass: 'gradient-teal', baselineAutonomy: 35.0,
    description: 'Autonomía e independencia de vestimenta.',
    steps: [
      { id:1, text:'Sujetar el suéter',       icon:'👕', description:'Ubica la etiqueta del suéter para orientarlo.' },
      { id:2, text:'Introducir un brazo',     icon:'💪', description:'Mete el brazo izquierdo por la manga.' },
      { id:3, text:'Introducir el otro brazo',icon:'💪', description:'Mete el brazo derecho por la otra manga.' },
      { id:4, text:'Jalar abajo y acomodar',  icon:'✨', description:'Acomoda los hombros y jala hacia la cintura.' },
    ],
  },
  limpiar_mesa: {
    name: 'Limpiar mesa al terminar', category: 'Actividades Sociales', icon: '🧼',
    colorClass: 'gradient-pink', baselineAutonomy: 55.0,
    description: 'Cuidado del entorno físico y responsabilidades.',
    steps: [
      { id:1, text:'Tirar basura',        icon:'🗑️', description:'Lleva servilletas o empaques al basurero.' },
      { id:2, text:'Pasar paño húmedo',   icon:'🧼', description:'Limpia las migajas de comida de la mesa.' },
      { id:3, text:'Acomodar la silla',   icon:'🪑', description:'Empuja la silla bajo la mesa al terminar.' },
    ],
  },
};

// ─────────────────────────────────────────────
// GETTERS / SETTERS DE ESTADO
// ─────────────────────────────────────────────
function NP_getSession()    { try { return JSON.parse(localStorage.getItem(NP_KEYS.SESSION))     || null; } catch(e){ return null; } }
function NP_getProfile()    { try { return JSON.parse(localStorage.getItem(NP_KEYS.PROFILE))    || NP_DEMO_PROFILE; } catch(e){ return NP_DEMO_PROFILE; } }
function NP_getNetwork()    { try { return JSON.parse(localStorage.getItem(NP_KEYS.NETWORK))    || NP_DEMO_NETWORK; } catch(e){ return NP_DEMO_NETWORK; } }
function NP_getRoutines()   { try { return JSON.parse(localStorage.getItem(NP_KEYS.ROUTINES))   || JSON.parse(JSON.stringify(NP_DEFAULT_ROUTINES)); } catch(e){ return JSON.parse(JSON.stringify(NP_DEFAULT_ROUTINES)); } }
function NP_getSupports()   { try { return JSON.parse(localStorage.getItem(NP_KEYS.SUPPORTS))   || {}; } catch(e){ return {}; } }
function NP_getActive()     { try { return JSON.parse(localStorage.getItem(NP_KEYS.ACTIVE))     || {}; } catch(e){ return {}; } }
function NP_getHistory()    { try { return JSON.parse(localStorage.getItem(NP_KEYS.HISTORY))    || NP_DEMO_HISTORY; } catch(e){ return NP_DEMO_HISTORY; } }
function NP_getTasks()      { try { return JSON.parse(localStorage.getItem(NP_KEYS.TASKS))      || NP_DEMO_TASKS; } catch(e){ return NP_DEMO_TASKS; } }
function NP_getExecutions() { try { return JSON.parse(localStorage.getItem(NP_KEYS.EXECUTIONS)) || NP_DEMO_EXECUTIONS; } catch(e){ return NP_DEMO_EXECUTIONS; } }

function NP_setSession(v)    { localStorage.setItem(NP_KEYS.SESSION,     JSON.stringify(v)); }
function NP_setProfile(v)    { localStorage.setItem(NP_KEYS.PROFILE,     JSON.stringify(v)); }
function NP_setNetwork(v)    { localStorage.setItem(NP_KEYS.NETWORK,     JSON.stringify(v)); }
function NP_setRoutines(v)   { localStorage.setItem(NP_KEYS.ROUTINES,    JSON.stringify(v)); }
function NP_setSupports(v)   { localStorage.setItem(NP_KEYS.SUPPORTS,    JSON.stringify(v)); }
function NP_setActive(v)     { localStorage.setItem(NP_KEYS.ACTIVE,      JSON.stringify(v)); }
function NP_setHistory(v)    { localStorage.setItem(NP_KEYS.HISTORY,     JSON.stringify(v)); }
function NP_setTasks(v)      { localStorage.setItem(NP_KEYS.TASKS,       JSON.stringify(v)); }
function NP_setExecutions(v) { localStorage.setItem(NP_KEYS.EXECUTIONS,  JSON.stringify(v)); }

// ─────────────────────────────────────────────
// INICIALIZACIÓN DEL SISTEMA (llamar en DOMContentLoaded)
// ─────────────────────────────────────────────
function NP_initSystem() {
  // Solo inicializa datos si no existen
  if (!localStorage.getItem(NP_KEYS.ROUTINES)) {
    NP_setRoutines(JSON.parse(JSON.stringify(NP_DEFAULT_ROUTINES)));
  }
  if (!localStorage.getItem(NP_KEYS.HISTORY)) {
    NP_setHistory(NP_DEMO_HISTORY);
  }
  if (!localStorage.getItem(NP_KEYS.ACTIVE)) {
    const active = {};
    Object.keys(NP_DEFAULT_ROUTINES).forEach(k => { active[k] = true; });
    NP_setActive(active);
  }
  if (!localStorage.getItem(NP_KEYS.PROFILE)) {
    NP_setProfile(NP_DEMO_PROFILE);
  }
  if (!localStorage.getItem(NP_KEYS.NETWORK)) {
    NP_setNetwork(NP_DEMO_NETWORK);
  }
  if (!localStorage.getItem(NP_KEYS.TASKS)) {
    NP_setTasks(JSON.parse(JSON.stringify(NP_DEMO_TASKS)));
  }
  if (!localStorage.getItem(NP_KEYS.EXECUTIONS)) {
    NP_setExecutions(JSON.parse(JSON.stringify(NP_DEMO_EXECUTIONS)));
  }
  // Asegurar que toda rutina tenga su estado de apoyos
  const supports = NP_getSupports();
  const routines = NP_getRoutines();
  Object.keys(routines).forEach(k => { if (!supports[k]) supports[k] = {}; });
  NP_setSupports(supports);

  // Migrar datos antiguos en localStorage para borrar nombres antiguos
  const profile = NP_getProfile();
  if (profile && (profile.name === 'Eduardo López' || profile.name === 'Eduardo')) {
    profile.name = 'Tomás López';
    NP_setProfile(profile);
  }
  
  const session = NP_getSession();
  if (session && (session.name === 'Eduardo López' || session.name === 'Eduardo')) {
    session.name = 'Tomás López';
    NP_setSession(session);
  }

  const execs = NP_getExecutions();
  let execsChanged = false;
  execs.forEach(e => {
    if (e.caregiver === 'Eduardo (Alumno)' || e.caregiver === 'Eduardo') {
      e.caregiver = 'Tomás (Alumno)';
      execsChanged = true;
    }
  });
  if (execsChanged) {
    NP_setExecutions(execs);
  }

  // Aplicar tema guardado
  NP_applyTheme();

  // Iniciar notificaciones de actividades
  NP_initNotifications();
}

// ─────────────────────────────────────────────
// SESIÓN
// ─────────────────────────────────────────────
function NP_checkSession(requiredRole) {
  const session = NP_getSession();
  if (!session) { window.location.href = 'index.html'; return false; }
  if (requiredRole && session.role !== requiredRole) { window.location.href = 'index.html'; return false; }
  return true;
}

function NP_logout() {
  localStorage.removeItem(NP_KEYS.SESSION);
  window.location.href = 'index.html';
}

// ─────────────────────────────────────────────
// TEMA (Dark / Light)
// ─────────────────────────────────────────────
function NP_applyTheme() {
  const theme = localStorage.getItem(NP_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-bs-theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function NP_toggleTheme() {
  const current = localStorage.getItem(NP_KEYS.THEME) || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(NP_KEYS.THEME, next);
  NP_applyTheme();
}

// ─────────────────────────────────────────────
// TOAST / NOTIFICACIONES
// ─────────────────────────────────────────────
function NP_showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const id = 'toast-' + Date.now();
  const icons = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-circle-info', warning:'fa-triangle-exclamation' };
  const colors = { success:'#10b981', error:'#f43f5e', info:'#3b82f6', warning:'#f97316' };
  const toast = document.createElement('div');
  toast.id = id;
  toast.className = 'toast show align-items-center border-0';
  toast.setAttribute('role','alert');
  toast.style.cssText = `background: var(--np-card); border-left: 4px solid ${colors[type]}; min-width:280px;`;
  toast.innerHTML = `
    <div class="d-flex align-items-center p-3 gap-2">
      <i class="fas ${icons[type]}" style="color:${colors[type]}"></i>
      <span class="flex-grow-1 small fw-semibold" style="color:var(--np-text)">${message}</span>
      <button type="button" class="btn-close btn-close-sm" onclick="document.getElementById('${id}').remove()"></button>
    </div>`;
  container.appendChild(toast);
  setTimeout(() => { if (document.getElementById(id)) document.getElementById(id).remove(); }, 3500);
}

// ─────────────────────────────────────────────
// CÁLCULO DE INDEPENDENCIA (fórmula oficial NeuroPro)
// ─────────────────────────────────────────────
// Escala: Independiente=1.00, Supervisión=0.75, Ayuda Parcial=0.50, Ayuda Total=0.00
const NP_SUPPORT_VALUES = { 1: 1.00, 2: 0.75, 3: 0.50, 4: 0.00 };
const NP_SUPPORT_LABELS = { 1: 'Independiente', 2: 'Supervisión', 3: 'Ayuda Parcial', 4: 'Ayuda Total' };
const NP_SUPPORT_COLORS = { 1: '#10b981', 2: '#3b82f6', 3: '#f97316', 4: '#f43f5e' };

function NP_calcIndependence(routineKey) {
  const routines = NP_getRoutines();
  const supports = NP_getSupports();
  const routine  = routines[routineKey];
  if (!routine) return { percentage: 0, obtained: 0, max: 0, rated: 0 };

  const stepState = supports[routineKey] || {};
  let obtained = 0;
  let rated    = 0;
  const max    = routine.steps.length;

  routine.steps.forEach(step => {
    const level = stepState[step.id];
    if (level !== undefined && NP_SUPPORT_VALUES[level] !== undefined) {
      obtained += NP_SUPPORT_VALUES[level];
      rated++;
    }
  });

  const percentage = rated > 0 ? (obtained / max) * 100 : 0;
  return { percentage: parseFloat(percentage.toFixed(2)), obtained, max, rated };
}

// ─────────────────────────────────────────────
// UTILIDADES
// ─────────────────────────────────────────────
function NP_formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric' });
}

function NP_formatTime(timeStr) {
  if (!timeStr) return '—';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'pm' : 'am';
  const hh   = h % 12 || 12;
  return `${hh}:${String(m).padStart(2,'0')} ${ampm}`;
}

function NP_speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-MX'; u.rate = 0.9; u.pitch = 1.15;
    window.speechSynthesis.speak(u);
  }
}

function NP_getGlobalScore() {
  const routines = NP_getRoutines();
  const keys = Object.keys(routines);
  if (!keys.length) return 0;
  let total = 0;
  keys.forEach(k => { total += NP_calcIndependence(k).percentage; });
  return parseFloat((total / keys.length).toFixed(1));
}

// ─────────────────────────────────────────────
// AGENDA — helpers de programación
// ─────────────────────────────────────────────

/**
 * Devuelve las tareas activas que corresponden a una fecha dada.
 * @param {string} dateStr  'YYYY-MM-DD'
 * @returns {Array} tareas ordenadas por hora
 */
function NP_getTasksForDate(dateStr) {
  const tasks  = NP_getTasks();
  const d      = new Date(dateStr + 'T12:00:00');
  const dayOfWeek = d.getDay(); // 0=Dom
  const today  = dateStr;

  return tasks
    .filter(t => {
      if (!t.active) return false;
      if (t.cancelledDates && t.cancelledDates.includes(today)) return false;
      if (t.startDate && t.startDate > today) return false;
      if (t.endDate   && t.endDate   < today) return false;
      if (t.recurrence === 'none') return t.startDate === today;
      if (t.recurrence === 'daily') return true;
      if (t.recurrence === 'weekly') return (t.days || []).includes(dayOfWeek);
      if (t.recurrence === 'monthly') {
        const startDay = parseInt((t.startDate||'').split('-')[2] || 1);
        return d.getDate() === startDay;
      }
      return false;
    })
    .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
}

/**
 * Devuelve las ejecuciones de una tarea en una fecha.
 * @param {string} taskId
 * @param {string} dateStr  'YYYY-MM-DD'
 */
function NP_getExecutionsForTaskDate(taskId, dateStr) {
  return NP_getExecutions().filter(e => e.taskId === taskId && e.date === dateStr);
}

/**
 * Devuelve todas las ejecuciones de una habilidad (todos los días).
 */
function NP_getExecutionsBySkill(skillKey) {
  return NP_getExecutions()
    .filter(e => e.skillKey === skillKey)
    .sort((a, b) => {
      const da = (a.date + 'T' + (a.time||'00:00'));
      const db = (b.date + 'T' + (b.time||'00:00'));
      return db.localeCompare(da);
    });
}

/**
 * Agrega una nueva ejecución al historial.
 */
function NP_addExecution(exec) {
  const execs = NP_getExecutions();
  exec.id = 'exec_' + Date.now();
  execs.push(exec);
  NP_setExecutions(execs);

  // Mantener compatibilidad: también actualizar history legacy
  const h = NP_getHistory();
  h.push({
    date:      exec.date,
    skill:     exec.skillKey,
    score:     exec.score,
    max:       exec.max,
    obtained:  exec.obtained,
    caregiver: exec.caregiver || '—',
  });
  NP_setHistory(h);

  // Sincronizar el estado de apoyos actuales para esta habilidad
  const supports = NP_getSupports();
  const stepState = {};
  if (exec.steps && exec.steps.length) {
    exec.steps.forEach(s => {
      stepState[s.stepId] = s.level;
    });
    supports[exec.skillKey] = stepState;
    NP_setSupports(supports);
  }

  return exec;
}

/**
 * Calcula la tendencia (porcentaje de cambio) de una habilidad
 * comparando las últimas N ejecuciones.
 */
function NP_calcTrend(skillKey, n = 5) {
  const execs = NP_getExecutionsBySkill(skillKey).reverse(); // asc
  if (execs.length < 2) return null;
  const recent = execs.slice(-n);
  if (recent.length < 2) return null;
  const first = recent[0].score;
  const last  = recent[recent.length - 1].score;
  return parseFloat((last - first).toFixed(2));
}

/**
 * Descripciones de recurrencia para UI.
 */
const NP_DAYS_ES   = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const NP_DAYS_FULL = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

function NP_recurrenceLabel(task) {
  if (!task) return '';
  if (task.recurrence === 'none')    return `Una vez (${NP_formatDate(task.startDate)})`;
  if (task.recurrence === 'daily')   return 'Todos los días';
  if (task.recurrence === 'monthly') return 'Mensual';
  if (task.recurrence === 'weekly') {
    const dayNames = (task.days||[]).sort().map(d=>NP_DAYS_ES[d]).join(', ');
    return `Semanal — ${dayNames}`;
  }
  return '';
}

// Actualiza el header con info de sesión
function NP_updateHeader() {
  const session = NP_getSession();
  const profile = NP_getProfile();
  const sessionBadge = document.getElementById('session-badge');
  const logoutBtn    = document.getElementById('btn-logout');
  const profileName  = document.getElementById('header-profile-name');

  if (session && sessionBadge) {
    const isCaregiver = session.role === 'cuidador';
    sessionBadge.textContent = isCaregiver ? `👤 ${session.name}` : `⭐ ${profile.name}`;
    sessionBadge.className   = 'np-pill';
    sessionBadge.style.background = isCaregiver ? 'rgba(244, 63, 94, 0.12)' : 'rgba(59, 130, 246, 0.12)';
    sessionBadge.style.color      = isCaregiver ? 'var(--np-pink)' : 'var(--np-blue)';
    sessionBadge.style.border     = isCaregiver ? '1px solid rgba(244, 63, 94, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)';
  }
  if (logoutBtn) logoutBtn.style.display = session ? 'inline-flex' : 'none';
  if (profileName && session) profileName.textContent = session.name;

  // Actualizar el avatar del sidebar
  const sidebarAvatar = document.getElementById('sidebar-avatar');
  if (sidebarAvatar && session) {
    if (session.role === 'cuidador') {
      const network = NP_getNetwork();
      const currentMember = network.find(x => x.name === session.name);
      const initials = session.name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
      if (currentMember && currentMember.photo) {
        sidebarAvatar.innerHTML = `<img src="${currentMember.photo}" alt="${session.name}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" />`;
      } else {
        sidebarAvatar.textContent = initials;
      }
    } else {
      const initials = (profile.name || 'TL').split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
      if (profile.photo) {
        sidebarAvatar.innerHTML = `<img src="${profile.photo}" alt="${profile.name}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" />`;
      } else {
        sidebarAvatar.textContent = initials;
      }
    }
  }
}

// ─────────────────────────────────────────────
// NOTIFICACIONES DE ACTIVIDADES (1 MINUTO ANTES)
// ─────────────────────────────────────────────
let NP_notifiedTasks = {}; // Cache para evitar duplicados: { taskId_date: true }

function NP_checkActivityNotifications() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const tasks = NP_getTasksForDate(todayStr);
  const routines = NP_getRoutines();

  tasks.forEach(task => {
    if (!task.time) return;
    
    const [tHour, tMin] = task.time.split(':').map(Number);
    const taskDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), tHour, tMin, 0);
    
    const diffMs = taskDate.getTime() - now.getTime();
    const diffMinutes = diffMs / 60000;

    // Si la actividad empieza en un rango cercano a 1 minuto (entre 0 y 1.1 minutos de diferencia)
    if (diffMinutes > 0 && diffMinutes <= 1.1) {
      const cacheKey = `${task.id}_${todayStr}`;
      if (!NP_notifiedTasks[cacheKey]) {
        NP_notifiedTasks[cacheKey] = true;
        
        const r = routines[task.skillKey];
        const taskName = r ? `${r.icon} ${r.name}` : 'Actividad programada';
        
        new Notification("NeuroPro — Actividad Próxima", {
          body: `Tu actividad "${taskName}" comienza en 1 minuto (a las ${task.time}).`,
          icon: 'logo.png',
          vibrate: [200, 100, 200]
        });
      }
    }
  });
}

function NP_initNotifications() {
  if (!('Notification' in window)) return;
  
  if (Notification.permission === 'default') {
    document.addEventListener('click', () => {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Permiso de notificaciones otorgado.');
          }
        });
      }
    }, { once: true });
  }

  // Verificar cada 20 segundos
  setInterval(NP_checkActivityNotifications, 20000);
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker registrado con éxito:', reg.scope))
      .catch((err) => console.error('Error al registrar el Service Worker:', err));
  });
}
