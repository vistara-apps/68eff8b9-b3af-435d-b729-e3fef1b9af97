'use client';

import { useState } from 'react';
import { Edit2, Trash2, Plus, Phone, User } from 'lucide-react';
import { ContactListProps, EmergencyContact } from '@/lib/types';

export function ContactList({
  contacts,
  variant,
  onEdit,
  onDelete,
  onAdd
}: ContactListProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Emergency Contacts</h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="btn-secondary flex items-center space-x-2 px-4 py-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{contact.name}</h4>
                  <p className="text-sm text-gray-300">{contact.relationship}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Phone className="w-3 h-3" />
                    <span>{contact.phone}</span>
                  </div>
                </div>
              </div>

              {variant === 'editable' && (
                <div className="flex items-center space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(contact)}
                      className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(contact.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {contacts.length === 0 && (
          <div className="glass-card p-8 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No emergency contacts added yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Add contacts who should be notified during emergencies
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
