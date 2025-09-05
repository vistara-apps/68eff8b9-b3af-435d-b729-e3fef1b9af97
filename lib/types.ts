export interface User {
  userId: string;
  state: string;
  languagePreference: 'en' | 'es';
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface InteractionLog {
  logId: string;
  userId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  recordingUrl?: string;
  summary: string;
  shared: boolean;
}

export interface StateLaw {
  state: string;
  keyRights: string[];
  commonScenarios: Scenario[];
  scripts: Script[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
}

export interface Script {
  id: string;
  scenarioId: string;
  language: 'en' | 'es';
  content: string;
  isPremium: boolean;
}

export interface RightsCard {
  id: string;
  title: string;
  content: string;
  category: 'basic' | 'traffic' | 'search' | 'arrest';
  isPremium: boolean;
}
