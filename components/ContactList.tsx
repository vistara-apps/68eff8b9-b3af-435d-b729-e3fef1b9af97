'use client';

import { useState } from 'react';
import { EmergencyContact } from '@/lib/types';
import { Phone, Edit3, Trash2, Plus, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPhoneNumber } from '@/lib/utils';

interface ContactListProps {
  contacts: EmergencyContact[];
  variant?: 'editable';
  onContactsChange?: (contacts: EmergencyContact[]) => void;
}

export function ContactList({ 
  contacts, 
  variant, 
  onContactsChange 
}: ContactListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;
    
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact,
    };
    
    onContactsChange?.([...contacts, contact]);
    setNewContact({ name: '', phone: '', relationship: '' });
  };

  const handleDeleteContact = (id: string) => {
    onContactsChange?.(contacts.filter(c => c.id !== id));
  };

  const handleCallContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="space-y-4">
      {/* Contact List */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="glass-card p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-white">{contact.name}</h4>
                <p className="text-sm text-gray-300">
                  {formatPhoneNumber(contact.phone)}
                </p>
                {contact.relationship && (
                  <p className="text-xs text-gray-400">{contact.relationship}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCallContact(contact.phone)}
                  className="p-2 bg-green-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-green-400" />
                </button>
                
                {variant === 'editable' && (
                  <>
                    <button
                      onClick={() => setEditingId(contact.id)}
                      className="p-2 bg-blue-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 bg-red-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Contact */}
      {variant === 'editable' && (
        <div className="glass-card p-4">
          <h4 className="font-medium text-white mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Emergency Contact
          </h4>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newContact.phone}
              onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Relationship (optional)"
              value={newContact.relationship}
              onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAddContact}
              disabled={!newContact.name || !newContact.phone}
              className="w-full glass-button bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Contact
            </button>
          </div>
        </div>
      )}

      {contacts.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No emergency contacts added yet</p>
          {variant === 'editable' && (
            <p className="text-sm mt-2">Add contacts to receive alerts during interactions</p>
          )}
        </div>
      )}
    </div>
  );
}
