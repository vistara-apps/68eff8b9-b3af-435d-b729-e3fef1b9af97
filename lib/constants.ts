import { RightsCard, StateLaw } from './types';

export const BASIC_RIGHTS_CARDS: RightsCard[] = [
  {
    id: '1',
    title: 'Right to Remain Silent',
    content: 'You have the right to remain silent. You do not have to answer questions about where you are going, where you are traveling from, what you are doing, or where you live.',
    category: 'basic',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Right to Refuse Searches',
    content: 'You have the right to refuse to consent to a search of yourself, your car, or your home. Police may pat you down for weapons if they suspect you are armed and dangerous.',
    category: 'search',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Right to Leave',
    content: 'You have the right to leave if you are not under arrest. Ask "Am I free to go?" If yes, you can leave calmly.',
    category: 'basic',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Traffic Stop Rights',
    content: 'During a traffic stop, you must show your license, registration, and insurance if requested. You can remain silent for other questions.',
    category: 'traffic',
    isPremium: true,
  },
];

export const SAMPLE_STATE_LAWS: StateLaw[] = [
  {
    state: 'CA',
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to ask if you are free to leave',
      'Right to record police interactions',
    ],
    commonScenarios: [
      {
        id: 'ca-traffic',
        title: 'Traffic Stop',
        description: 'What to do during a routine traffic stop in California',
        isPremium: true,
      },
      {
        id: 'ca-search',
        title: 'Search Request',
        description: 'How to handle requests to search your vehicle or person',
        isPremium: true,
      },
    ],
    scripts: [
      {
        id: 'ca-traffic-en',
        scenarioId: 'ca-traffic',
        language: 'en',
        content: 'Officer, I am exercising my right to remain silent. I do not consent to any searches. Am I free to go?',
        isPremium: true,
      },
    ],
  },
];

export const EMERGENCY_PHRASES = {
  en: {
    alert: 'I am currently in a police interaction. My location is attached. Please monitor this situation.',
    recording: 'I am recording this interaction for my safety and legal protection.',
    silent: 'I am exercising my right to remain silent.',
    search: 'I do not consent to any searches.',
    leave: 'Am I free to go?',
  },
  es: {
    alert: 'Actualmente estoy en una interacción policial. Mi ubicación está adjunta. Por favor monitoree esta situación.',
    recording: 'Estoy grabando esta interacción para mi seguridad y protección legal.',
    silent: 'Estoy ejerciendo mi derecho a permanecer en silencio.',
    search: 'No consiento a ninguna búsqueda.',
    leave: '¿Soy libre de irme?',
  },
};
