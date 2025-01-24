import React, { useState } from 'react';
import { ClipboardCheck, ArrowLeft, Users, MessageSquare, HelpCircle, Plus, Lightbulb as LightBulb } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MovingPartners } from './MovingPartners';
import { MoveOutChecklist } from './MoveOutChecklist';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../../hooks/useUserRole';

export function MoveOutContent() {
  const navigate = useNavigate();
  const { role } = useUserRole();
  const isBoard = role === 'board';
  const isOwner = role === 'owner';
  const [showTips, setShowTips] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

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
        {/* Left column - Checklist */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ClipboardCheck className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Sjekkliste for utflytting</h2>
              </div>
              <div className="flex items-center gap-2">
                {isOwner && (
                  <Button
                    variant="outline"
                    onClick={() => setShowTips(true)}
                    className="flex items-center gap-2"
                  >
                    <LightBulb className="h-4 w-4" />
                    Nyttige tips
                  </Button>
                )}
                {isBoard && (
                  <Button
                    variant="outline"
                    onClick={() => setShowAddItem(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Legg til
                  </Button>
                )}
              </div>
            </div>
            <MoveOutChecklist 
              showTips={showTips}
              onCloseTips={() => setShowTips(false)}
              showAddItem={showAddItem}
              onCloseAddItem={() => setShowAddItem(false)}
            />
          </div>
        </Card>

        {/* Right column - FAQ and Partners */}
        <div className="space-y-4">
          {/* FAQ and Contact */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Kontakt</h2>
              </div>

              <div className="space-y-6">
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
                        Se svar på vanlige spørsmål
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
              </div>
            </div>
          </Card>

          {/* Partners */}
          <MovingPartners type="moveOut" />
        </div>
      </div>
    </div>
  );
}