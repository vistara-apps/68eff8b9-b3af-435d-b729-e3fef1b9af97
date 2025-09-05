export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const BASIC_RIGHTS = [
  {
    id: 'right-to-remain-silent',
    title: 'Right to Remain Silent',
    description: 'You have the right to remain silent. You do not have to answer questions.',
    script: 'I am exercising my right to remain silent.'
  },
  {
    id: 'right-to-refuse-search',
    title: 'Right to Refuse Search',
    description: 'You can refuse consent to search your vehicle, person, or belongings.',
    script: 'I do not consent to any searches.'
  },
  {
    id: 'right-to-leave',
    title: 'Right to Leave',
    description: 'You have the right to ask if you are free to leave.',
    script: 'Am I free to leave?'
  },
  {
    id: 'right-to-attorney',
    title: 'Right to an Attorney',
    description: 'You have the right to speak with an attorney before answering questions.',
    script: 'I want to speak with my attorney.'
  }
];

export const EMERGENCY_SCRIPTS = {
  en: {
    alert: 'EMERGENCY: I am currently in a police interaction at my current location. Please monitor this situation.',
    recording: 'I am recording this interaction for my safety and legal protection.',
    calm: 'I am remaining calm and complying with lawful orders while exercising my constitutional rights.'
  },
  es: {
    alert: 'EMERGENCIA: Actualmente estoy en una interacción policial en mi ubicación actual. Por favor monitoree esta situación.',
    recording: 'Estoy grabando esta interacción para mi seguridad y protección legal.',
    calm: 'Me mantengo calmado y cumplo con órdenes legales mientras ejerzo mis derechos constitucionales.'
  }
};

export const PRICING = {
  stateSpecificContent: 2.99,
  premiumScripts: 1.99,
  fullAccess: 4.99
};
