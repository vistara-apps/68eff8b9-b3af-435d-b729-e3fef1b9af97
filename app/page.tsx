'use client';

import { useState, useEffect } from 'react';
import { Shield, MapPin, Users, Settings2, Mic, AlertTriangle, Lock, ChevronRight } from 'lucide-react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';

import { InfoCard } from '@/components/InfoCard';
import { RightsCard } from '@/components/RightsCard';
import { ContactList } from '@/components/ContactList';
import { LanguageSelector } from '@/components/LanguageSelector';
import { RecordingControls } from '@/components/RecordingControls';
import { EmergencyAlert } from '@/components/EmergencyAlert';

import { BASIC_RIGHTS, PRICING } from '@/lib/constants';
import { formatCurrency, requestLocationPermission } from '@/lib/utils';
import { EmergencyContact, LocationData } from '@/lib/types';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  
  // State management
  const [currentView, setCurrentView] = useState<'home' | 'rights' | 'contacts' | 'settings'>('home');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      relationship: 'Family'
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      relationship: 'Friend'
    }
  ]);
  const [hasUnlockedPremium, setHasUnlockedPremium] = useState(false);

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Request location permission on mount
  useEffect(() => {
    const getLocation = async () => {
      const position = await requestLocationPermission();
      if (position) {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: 'Current Location' // In real app, would reverse geocode
        });
      }
    };
    getLocation();
  }, []);

  const handleUnlockPremium = () => {
    // In a real app, this would integrate with Stripe
    alert(`Unlock premium content for ${formatCurrency(PRICING.stateSpecificContent)}?`);
    setHasUnlockedPremium(true);
  };

  const handleRecordingStart = (type: 'audio' | 'video') => {
    console.log(`Started ${type} recording`);
  };

  const handleRecordingStop = (recordingUrl: string) => {
    console.log('Recording stopped:', recordingUrl);
    // In a real app, would save to InteractionLog
  };

  const handleEmergencyAlert = (contactIds: string[]) => {
    console.log('Emergency alert sent to:', contactIds);
    alert('Emergency alert sent successfully!');
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const renderHomeView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">KnowYourRights Cards</h1>
          <p className="text-gray-300">Informed. Confident. In control during police stops.</p>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="glass-card p-4">
        <Wallet>
          <ConnectWallet>
            <Name />
          </ConnectWallet>
        </Wallet>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setCurrentView('rights')}
          className="glass-card-hover p-6 text-center space-y-3"
        >
          <Shield className="w-8 h-8 text-accent mx-auto" />
          <div>
            <h3 className="font-semibold text-white">Know Your Rights</h3>
            <p className="text-sm text-gray-300">Essential rights summary</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentView('contacts')}
          className="glass-card-hover p-6 text-center space-y-3"
        >
          <Users className="w-8 h-8 text-accent mx-auto" />
          <div>
            <h3 className="font-semibold text-white">Emergency Contacts</h3>
            <p className="text-sm text-gray-300">Manage your contacts</p>
          </div>
        </button>
      </div>

      {/* Location Status */}
      {userLocation && (
        <div className="glass-card p-4 flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-accent" />
          <div>
            <p className="text-white font-medium">Location Detected</p>
            <p className="text-sm text-gray-300">{userLocation.address}</p>
          </div>
        </div>
      )}

      {/* Premium Content Teaser */}
      <InfoCard
        title="State-Specific Legal Scripts"
        description="Get tailored scripts and legal information for your specific state and situation."
        isPremium={!hasUnlockedPremium}
        onUnlock={handleUnlockPremium}
      >
        {hasUnlockedPremium && (
          <div className="space-y-2">
            <p className="text-accent font-medium">✓ California Traffic Stop Scripts</p>
            <p className="text-accent font-medium">✓ Bilingual Support (EN/ES)</p>
            <p className="text-accent font-medium">✓ Scenario-Specific Guidance</p>
          </div>
        )}
      </InfoCard>
    </div>
  );

  const renderRightsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold text-white">Your Rights</h2>
        <div></div>
      </div>

      <div className="space-y-4">
        {BASIC_RIGHTS.map((right) => (
          <RightsCard
            key={right.id}
            right={right}
            onSpeak={speakText}
          />
        ))}
      </div>

      <InfoCard
        title="Remember"
        description="Stay calm, be respectful, and clearly state your rights. You have the right to record the interaction in most states."
        variant="detailed"
      />
    </div>
  );

  const renderContactsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold text-white">Contacts</h2>
        <div></div>
      </div>

      <ContactList
        contacts={emergencyContacts}
        variant="editable"
        onEdit={(contact) => console.log('Edit contact:', contact)}
        onDelete={(id) => {
          setEmergencyContacts(contacts => contacts.filter(c => c.id !== id));
        }}
        onAdd={() => console.log('Add new contact')}
      />
    </div>
  );

  const renderSettingsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold text-white">Settings</h2>
        <div></div>
      </div>

      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={setLanguage}
        variant="simple"
      />

      <InfoCard
        title="Privacy & Data"
        description="Your recordings and personal information are stored locally on your device. We never share your data with third parties."
      />

      <InfoCard
        title="Legal Disclaimer"
        description="This app provides general legal information and should not replace professional legal advice. Laws vary by jurisdiction."
      />
    </div>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {currentView === 'home' && renderHomeView()}
        {currentView === 'rights' && renderRightsView()}
        {currentView === 'contacts' && renderContactsView()}
        {currentView === 'settings' && renderSettingsView()}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-lg border-t border-white border-opacity-20">
          <div className="max-w-md mx-auto px-4 py-2">
            <div className="flex justify-around">
              <button
                onClick={() => setCurrentView('home')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentView === 'home' ? 'bg-white bg-opacity-20 text-white' : 'text-gray-400'
                }`}
              >
                <Shield className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('rights')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentView === 'rights' ? 'bg-white bg-opacity-20 text-white' : 'text-gray-400'
                }`}
              >
                <Shield className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('contacts')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentView === 'contacts' ? 'bg-white bg-opacity-20 text-white' : 'text-gray-400'
                }`}
              >
                <Users className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentView === 'settings' ? 'bg-white bg-opacity-20 text-white' : 'text-gray-400'
                }`}
              >
                <Settings2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <RecordingControls
          onRecordingStart={handleRecordingStart}
          onRecordingStop={handleRecordingStop}
        />

        {/* Emergency Alert */}
        <EmergencyAlert
          contacts={emergencyContacts}
          currentLocation={userLocation || undefined}
          language={language}
          onAlertSent={handleEmergencyAlert}
        />
      </div>
    </div>
  );
}
