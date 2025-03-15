import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Users2, Redo2 } from 'lucide-react';

export const GameOverScreen = ({ gameState }) => {
  const { gameState: state } = gameState;
  const foundersWin = state.missionResults.filter(r => r).length >= 3;
  const mercenaries = gameState.players.filter(p => p.role === 'MERCENARY');

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <Card className="card slide-up">
      <CardContent className="p-8">
        <div className={`text-center p-6 rounded-lg mb-8 ${
          foundersWin ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${
            foundersWin ? 'text-green-500' : 'text-red-500'
          }`} />
          <h1 className="text-4xl font-bold">
            {foundersWin ? 'Founders Win!' : 'Mercenaries Win!'}
          </h1>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Results
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {state.missionResults.map((success, index) => (
                <div 
                  key={index}
                  className={`mission-status ${success ? 'success' : 'fail'}`}
                >
                  Strategic Initiative {index + 1}
                  <div>{success ? '✓' : '✗'}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users2 className="w-5 h-5 text-blue-500" />
              Mercenaries Were
            </h2>
            <div className="space-y-2">
              {mercenaries.map((player, index) => (
                <div 
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg text-center font-medium"
                >
                  {player.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={handlePlayAgain}
          className="button-primary w-full mt-8 flex items-center justify-center gap-2"
        >
          <Redo2 className="w-5 h-5" />
          Play Again
        </button>
      </CardContent>
    </Card>
  );
};