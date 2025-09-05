'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { 
  Shield, 
  Mic, 
  AlertTriangle, 
  Settings2, 
  Plus,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

// Components
import { InfoCard } from '@/components/InfoCard';
import { ActionFAB } from '@/components/ActionFAB';
import { ContactList } from '@/components/ContactList';
import { LanguageSelector } from '@/components/LanguageSelector';
import { RecordingModal } from '@/components/RecordingModal';
import { EmergencyAlert } from '@/components/EmergencyAlert';

// Types and constants
import { User, EmergencyContact, InteractionLog } from '@/lib/types';
import { BASIC_RIGHTS_CARDS, EMERGENCY_PHRASES } from '@/lib/constants';
import { getCurrentLocation, getStateFromCoordinates, generateInteractionSummary } from '@/lib/utils';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  
  // State management
  const [user, setUser] = useState<User>({
    userId: 'demo-user',
    state: 'CA',
    languagePreference: 'en',
    emergencyContacts: [
      {
        id: '1',
        name: 'Sarah Johnson',
        phone: '(555) 123-4567',
        relationship: 'Emergency Contact',
      },
      {
        id: '2',
        name: 'Legal Aid Hotline',
        phone: '(555) 987-6543',
        relationship: 'Legal Support',
      },
    ],
  });

  const [currentView, setCurrentView] = useState<'home' | 'contacts' | 'settings'>('home');
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [interactionLogs, setInteractionLogs] = useState<InteractionLog[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Get user location on mount
  useEffect(() => {
    getCurrentLocation()
      .then((position) => {
        const state = getStateFromCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
        setUser(prev => ({ ...prev, state }));
        setCurrentLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
      })
      .catch((error) => {
        console.error('Location error:', error);
      });
  }, []);

  // Handlers
  const handleRecordingSave = (recordingData: { duration: number; summary: string }) => {
    const newLog: InteractionLog = {
      logId: Date.now().toString(),
      userId: user.userId,
      timestamp: new Date(),
      location: {
        latitude: 0,
        longitude: 0,
        address: currentLocation,
      },
      summary: recordingData.summary,
      shared: false,
    };
    
    setInteractionLogs(prev => [newLog, ...prev]);
    setShowRecordingModal(false);
  };

  const handleEmergencyAlert = () => {
    setShowEmergencyAlert(false);
    // In a real app, this would trigger actual notifications
    alert('Emergency alert sent to your contacts!');
  };

  const handleContactsChange = (contacts: EmergencyContact[]) => {
    setUser(prev => ({ ...prev, emergencyContacts: contacts }));
  };

  const handleLanguageChange = (language: 'en' | 'es') => {
    setUser(prev => ({ ...prev, languagePreference: language }));
  };

  // Floating background elements
  const FloatingElements = () => (
    <>
      <div className="floating-element top-20 left-10">
        <Shield className="w-8 h-8 text-purple-400" />
      </div>
      <div className="floating-element top-40 right-20" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-6 h-6 text-cyan-400" />
      </div>
      <div className="floating-element bottom-40 left-20" style={{ animationDelay: '4s' }}>
        <MapPin className="w-7 h-7 text-pink-400" />
      </div>
    </>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      
      {/* Header */}
      <header className="relative z-10 p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              KnowYourRights Cards
            </h1>
            <p className="text-gray-300 mt-1">
              Informed. Confident. In control.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <LanguageSelector
              currentLanguage={user.languagePreference}
              onLanguageChange={handleLanguageChange}
            />
            <button
              onClick={() => setCurrentView('settings')}
              className="glass-button p-2"
            >
              <Settings2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Location & Status */}
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{user.state || 'Unknown'} State</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Ready</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-24">
        {currentView === 'home' && (
          <div className="space-y-6">
            {/* Quick Action Cards */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Know Your Rights
              </h2>
              <p className="text-gray-300 mb-6">
                Essential information for any police encounter. 
                One tap for quick reference.
              </p>
              
              <div className="grid gap-4">
                {BASIC_RIGHTS_CARDS.slice(0, 2).map((card) => (
                  <InfoCard
                    key={card.id}
                    card={card}
                    variant="basic"
                  />
                ))}
              </div>
              
              <button className="w-full mt-4 glass-button flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                View All Rights Cards
              </button>
            </section>

            {/* Recent Interactions */}
            {interactionLogs.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Recent Interactions
                </h2>
                <div className="space-y-3">
                  {interactionLogs.slice(0, 2).map((log) => (
                    <div key={log.logId} className="glass-card p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{log.summary}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {log.timestamp.toLocaleDateString()} at {log.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Emergency Contacts Preview */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Emergency Contacts
                </h2>
                <button
                  onClick={() => setCurrentView('contacts')}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Manage
                </button>
              </div>
              
              <ContactList
                contacts={user.emergencyContacts.slice(0, 2)}
              />
            </section>
          </div>
        )}

        {currentView === 'contacts' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setCurrentView('home')}
                className="glass-button p-2"
              >
                ←
              </button>
              <h2 className="text-2xl font-semibold text-white">
                Emergency Contacts
              </h2>
            </div>
            
            <ContactList
              contacts={user.emergencyContacts}
              variant="editable"
              onContactsChange={handleContactsChange}
            />
          </div>
        )}

        {currentView === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setCurrentView('home')}
                className="glass-button p-2"
              >
                ←
              </button>
              <h2 className="text-2xl font-semibold text-white">
                Settings
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-medium text-white mb-2">Language</h3>
                <LanguageSelector
                  currentLanguage={user.languagePreference}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-medium text-white mb-2">Location</h3>
                <p className="text-gray-300 text-sm">
                  Current state: <span className="text-white">{user.state}</span>
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Used for state-specific legal information
                </p>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-medium text-white mb-2">Interaction History</h3>
                <p className="text-gray-300 text-sm">
                  {interactionLogs.length} recorded interaction{interactionLogs.length !== 1 ? 's' : ''}
                </p>
                <button className="text-purple-400 text-sm mt-2 hover:text-purple-300">
                  View All Records
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      {currentView === 'home' && (
        <>
          <ActionFAB
            icon={Mic}
            label="Record Interaction"
            variant="record"
            onClick={() => setShowRecordingModal(true)}
            className="bottom-24 right-6"
          />
          
          <ActionFAB
            icon={AlertTriangle}
            label="Emergency Alert"
            variant="secondary"
            onClick={() => setShowEmergencyAlert(true)}
            className="bottom-24 right-24"
          />
        </>
      )}

      {/* Modals */}
      <RecordingModal
        isOpen={showRecordingModal}
        onClose={() => setShowRecordingModal(false)}
        onSave={handleRecordingSave}
      />
      
      <EmergencyAlert
        isOpen={showEmergencyAlert}
        onClose={() => setShowEmergencyAlert(false)}
        contacts={user.emergencyContacts}
        onAlertSent={handleEmergencyAlert}
      />
    </div>
  );
}
