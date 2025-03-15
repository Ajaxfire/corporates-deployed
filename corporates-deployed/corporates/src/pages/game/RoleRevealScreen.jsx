import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserCircle2, Eye, Users2 } from 'lucide-react';

export const RoleRevealScreen = ({ gameState }) => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showRole, setShowRole] = useState(false);

  const handleNext = () => {
    if (currentPlayer < gameState.players.length - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setShowRole(false);
    } else {
      gameState.setCurrentScreen('mission');
    }
  };

  const player = gameState.players[currentPlayer];
  const mercenaries = player?.role === 'MERCENARY' 
    ? gameState.players.filter((p, i) => p.role === 'MERCENARY' && i !== currentPlayer) 
    : [];

  return (
    <Card className="card fade-in">
      <CardContent className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-3">
          <UserCircle2 className="w-8 h-8 text-blue-500" />
          &nbsp;{player?.name}'s Role
        </h2>

        {!showRole ? (
          <button 
            onClick={() => setShowRole(true)}
            className="button-primary flex items-center justify-center gap-2 mx-auto"
          >
            <Eye className="w-5 h-5" />
            &nbsp;Reveal
          </button>
        ) : (
          <div className="space-y-6">
            <button onClick={handleNext} className="button-primary">
              {currentPlayer === gameState.players.length - 1 ? 'Start Game' : 'Next Player'}
            </button>
            <div className="role-card">
              <p className="text-xl mb-2">You are a</p>
              <p className="text-3xl font-bold">{player?.role}</p>
            </div>

            {player?.role === 'MERCENARY' && mercenaries.length > 0 && (
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="flex items-center justify-center gap-2 text-gray-300 mb-3">
                  <Users2 className="w-5 h-5" />
                  Other Mercenaries
                </p>
                {mercenaries.map(m => (
                  <p key={m.name} className="text-white">{m.name}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};