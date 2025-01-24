import React, { useState } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { Card } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

export function ContactCard() {
  const navigate = useNavigate();
  const handlePhoneClick = () => {
    window.location.href = 'tel:98765432';
  };

  const handleContactClick = (recipient: string) => {
    navigate(`/kontakt?recipient=${recipient}`);
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Kontaktinformasjon</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Chatbot</h3>
            <p className="text-sm text-gray-600">Dagligdagse henvendelser</p>
            <button
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <MessageSquare className="h-4 w-4" />
              Start chat
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Styret</h3>
            <p className="text-sm text-gray-600">Administrative henvendelser og søknader</p>
            <button
              onClick={() => handleContactClick('board')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Send melding
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Vaktmester</h3>
            <p className="text-sm text-gray-600">Tekniske problemer og vedlikehold</p>
            <button
              onClick={() => handleContactClick('maintenance')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Send melding
            </button>
          </div>

          <div className="pt-4 border-t">
            <div className="space-y-2">
              <h3 className="font-medium text-red-600">Akutte hendelser</h3>
              <p className="text-sm text-red-600">Ring ved akutte problemer utenfor arbeidstid</p>
              <button
                onClick={handlePhoneClick}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <Phone className="h-4 w-4" />
                Ring vaktelefon
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}