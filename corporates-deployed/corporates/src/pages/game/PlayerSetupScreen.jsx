import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Minus, Plus, ArrowRight } from 'lucide-react';

export const PlayerSetupScreen = ({ gameState }) => {
  const [playerCount, setPlayerCount] = useState(5);
  const [names, setNames] = useState(Array(5).fill(''));

  const handleSubmit = () => {
    if (names.length === playerCount && names.every(name => name.trim())) {
      const capitalizedNames = names.map(name => name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase());
      const roles = gameState.setupGame(playerCount);
      gameState.setPlayers(capitalizedNames.map((name, i) => ({
        name,
        role: roles[i]
      })));
      gameState.setCurrentScreen('reveal');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* <Card className="w-full max-w-md mx-auto border-2 border-gray-300 shadow-lg"> */}
      <Card className="card fade-in p-8 text-center">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold">Add The Players</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="font-medium">Set the Number of Players</label>
            </div>
            <div className="flex items-center justify-center p-3 bg-gray-100 rounded-lg">
              <button 
                className="p-2 rounded-full bg-white hover:bg-gray-200"
                onClick={() => {
                  if (playerCount > 5) {
                    setPlayerCount(playerCount - 1);
                    setNames(names.slice(0, playerCount - 1));
                  }
                }}
                disabled={playerCount <= 5}
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-semibold w-12 text-center pad">{playerCount}</span>
              <button
                className="p-2 rounded-full bg-white hover:bg-gray-200"
                onClick={() => {
                  if (playerCount < 10) {
                    setPlayerCount(playerCount + 1);
                    setNames([...names, '']);
                  }
                }}
                disabled={playerCount >= 10}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pad space-y-3 mb-6">
            {Array(playerCount).fill().map((_, i) => (
              <div key={i} className="flex items-center">
                <Users className="pad w-4 h-4 text-gray-400 mr-2" />
                <Input
                  placeholder={`Player ${i + 1} name`}
                  value={names[i] || ''}
                  onChange={(e) => {
                    const newNames = [...names];
                    newNames[i] = e.target.value;
                    setNames(newNames);
                  }}
                  className="pad h-10 w-full"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={names.length !== playerCount || !names.every(name => name.trim())}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
};