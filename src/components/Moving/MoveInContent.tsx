import React from 'react';
import { Info, MapPin, MessageSquare, HelpCircle, ArrowLeft, Users, Calendar, LayoutGrid, MessageCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MovingPartners } from './MovingPartners';
import { useNavigate } from 'react-router-dom';
import { locationTips } from '../../data/locationTips';

export function MoveInContent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/min-bolig#flytting', { replace: true });
    window.location.reload();
  };

  const handleOpenChat = () => {
    if (window.chatbase && typeof window.chatbase === 'function') {
      window.chatbase('open');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-0 mb-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 flex items-center gap-2"
        >
          <ArrowLeft className="h-3 w-3 text-gray-600" />
          <span className="text-sm text-gray-600">Tilbake</span>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          {/* Tips for new residents */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Tips til nyinnflyttede</h2>
              </div>

              <div className="space-y-4">
                {locationTips.map((tip) => (
                  <div key={tip.label} className="flex items-center justify-between">
                    <span className="text-gray-600">{tip.label}:</span>
                    <span className="font-medium">{tip.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Resident Registration */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Beboerregistrering</h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-600">
                  Vi henter informasjon via BankID. Snart vil du også kunne legge til mer detaljer som hvem som bor i leiligheten, om leiligheten leies ut, samt annen nyttig informasjon.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column - Resources */}
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <LayoutGrid className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Ressurser</h2>
            </div>

            <div className="space-y-6">
              {/* Rules */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Info className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Regler</h3>
                    <p className="text-sm text-gray-600">
                      Les husordensreglene
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/husordensregler">Les husordensregler</a>
                </Button>
              </div>

              {/* Facilities */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Fasiliteter</h3>
                    <p className="text-sm text-gray-600">
                      Se hvilke fasiliteter som kan reserveres
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/reservasjoner">Reservasjoner</a>
                </Button>
              </div>

              {/* Chatbot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Chatbot</h3>
                    <p className="text-sm text-gray-600">
                      Bruk chatboten vår for raske svar
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={handleOpenChat}>
                  Åpne chat
                </Button>
              </div>

              {/* FAQ */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vanlige spørsmål</h3>
                    <p className="text-sm text-gray-600">
                      Se svar på vanlige spørsmål og henvendelser fra beboerne
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/faq">Se FAQ</a>
                </Button>
              </div>

              {/* Board Contact */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Styret</h3>
                    <p className="text-sm text-gray-600">
                      Kontakt styret – normal svartid innen 24 timer
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/kontakt?recipient=board">Kontakt styret</a>
                </Button>
              </div>

              {/* Naboen */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Naboen</h3>
                    <p className="text-sm text-gray-600">
                      Start en diskusjon med naboene dine
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/naboen">Naboen</a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Full width Moving Partners */}
        <div className="lg:col-span-2">
          <Card>
            <MovingPartners type="moveIn" />
          </Card>
        </div>
      </div>
    </div>
  );
}