'use client';

import { useState } from 'react';
import { AlertTriangle, Send, X, MapPin } from 'lucide-react';
import { EmergencyContact } from '@/lib/types';
import { getCurrentLocation } from '@/lib/utils';

interface EmergencyAlertProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
  onAlertSent: () => void;
}

export function EmergencyAlert({ isOpen, onClose, contacts, onAlertSent }: EmergencyAlertProps) {
  const [isSending, setIsSending] = useState(false);
  const [location, setLocation] = useState<string>('');

  const sendAlert = async () => {
    setIsSending(true);
    
    try {
      // Get current location
      const position = await getCurrentLocation();
      const locationText = `${position.coords.latitude}, ${position.coords.longitude}`;
      setLocation(locationText);
      
      // In a real app, this would send SMS/notifications to contacts
      // For demo purposes, we'll simulate the alert
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onAlertSent();
      onClose();
    } catch (error) {
      console.error('Error sending alert:', error);
      alert('Unable to send alert. Please check your location permissions.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Emergency Alert</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Alert Preview */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Alert Message:</h4>
          <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 rounded-lg">
            <p className="text-red-200 text-sm">
              🚨 <strong>EMERGENCY:</strong> I am currently in a police interaction. 
              My location is attached. Please monitor this situation and be prepared 
              to provide assistance if needed.
            </p>
            {location && (
              <div className="flex items-center gap-2 mt-3 text-xs text-red-300">
                <MapPin className="w-3 h-3" />
                <span>Location: {location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Recipients */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">
            Will be sent to {contacts.length} contact{contacts.length !== 1 ? 's' : ''}:
          </h4>
          <div className="space-y-2">
            {contacts.slice(0, 3).map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>{contact.name}</span>
                <span className="text-gray-500">({contact.phone})</span>
              </div>
            ))}
            {contacts.length > 3 && (
              <div className="text-sm text-gray-400">
                +{contacts.length - 3} more contacts
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 glass-button"
            disabled={isSending}
          >
            Cancel
          </button>
          <button
            onClick={sendAlert}
            disabled={isSending || contacts.length === 0}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg text-red-400 hover:bg-opacity-30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Alert
              </>
            )}
          </button>
        </div>

        {contacts.length === 0 && (
          <div className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-20 rounded-lg">
            <p className="text-sm text-yellow-200">
              No emergency contacts configured. Add contacts in settings to use this feature.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
