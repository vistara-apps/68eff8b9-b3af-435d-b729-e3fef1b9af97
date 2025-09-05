'use client';

import { useState } from 'react';
import { AlertTriangle, Send, MapPin, Clock } from 'lucide-react';
import { EmergencyContact } from '@/lib/types';
import { EMERGENCY_SCRIPTS } from '@/lib/constants';

interface EmergencyAlertProps {
  contacts: EmergencyContact[];
  currentLocation?: { latitude: number; longitude: number; address?: string };
  language: 'en' | 'es';
  onAlertSent: (contactIds: string[]) => void;
}

export function EmergencyAlert({
  contacts,
  currentLocation,
  language,
  onAlertSent
}: EmergencyAlertProps) {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');

  const sendAlert = async () => {
    if (selectedContacts.length === 0) {
      alert('Please select at least one contact to alert.');
      return;
    }

    const message = customMessage || EMERGENCY_SCRIPTS[language].alert;
    const locationText = currentLocation?.address || 
      `${currentLocation?.latitude}, ${currentLocation?.longitude}` || 
      'Location unavailable';

    const fullMessage = `${message}\n\nLocation: ${locationText}\nTime: ${new Date().toLocaleString()}`;

    // In a real app, this would send SMS/notifications
    console.log('Sending alert to contacts:', selectedContacts);
    console.log('Message:', fullMessage);

    // Simulate sending
    setTimeout(() => {
      onAlertSent(selectedContacts);
      setIsAlertActive(false);
      setSelectedContacts([]);
      setCustomMessage('');
    }, 1000);
  };

  if (!isAlertActive) {
    return (
      <button
        onClick={() => setIsAlertActive(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white p-4 rounded-full shadow-modal transition-all duration-200 hover:scale-110"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="glass-card max-w-md w-full p-6 space-y-6">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Emergency Alert</h2>
          <p className="text-gray-300">
            {language === 'en' 
              ? 'Send an alert to your emergency contacts'
              : 'Enviar una alerta a tus contactos de emergencia'
            }
          </p>
        </div>

        {currentLocation && (
          <div className="glass-card p-3 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm text-gray-300">
              {currentLocation.address || `${currentLocation.latitude}, ${currentLocation.longitude}`}
            </span>
          </div>
        )}

        <div>
          <h3 className="font-medium text-white mb-3">Select Contacts:</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {contacts.map((contact) => (
              <label key={contact.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedContacts([...selectedContacts, contact.id]);
                    } else {
                      setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                    }
                  }}
                  className="w-4 h-4 text-accent"
                />
                <span className="text-white">{contact.name}</span>
                <span className="text-gray-400 text-sm">({contact.relationship})</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            {language === 'en' ? 'Custom Message (Optional)' : 'Mensaje Personalizado (Opcional)'}
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder={EMERGENCY_SCRIPTS[language].alert}
            className="w-full p-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 resize-none"
            rows={3}
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setIsAlertActive(false)}
            className="flex-1 btn-secondary"
          >
            {language === 'en' ? 'Cancel' : 'Cancelar'}
          </button>
          <button
            onClick={sendAlert}
            className="flex-1 btn-primary flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{language === 'en' ? 'Send Alert' : 'Enviar Alerta'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
