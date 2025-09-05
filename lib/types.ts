// User data model
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

// Interaction log data model
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

// State law data model
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
  scripts: string[];
}

export interface Script {
  id: string;
  scenario: string;
  language: 'en' | 'es';
  text: string;
  isPremium: boolean;
}

// Component props
export interface InfoCardProps {
  title: string;
  description: string;
  variant?: 'basic' | 'detailed' | 'script';
  isPremium?: boolean;
  onUnlock?: () => void;
  children?: React.ReactNode;
}

export interface ActionFABProps {
  variant: 'primary' | 'secondary' | 'record';
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  disabled?: boolean;
}

export interface ContactListProps {
  contacts: EmergencyContact[];
  variant: 'editable';
  onEdit?: (contact: EmergencyContact) => void;
  onDelete?: (contactId: string) => void;
  onAdd?: () => void;
}

export interface LanguageSelectorProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  variant: 'simple';
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Location and state detection
export interface LocationData {
  latitude: number;
  longitude: number;
  state?: string;
  address?: string;
}

// Recording types
export interface RecordingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  audioUrl?: string;
  videoUrl?: string;
  location: LocationData;
}
