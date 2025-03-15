import React from 'react';
import { useGameState } from './hooks/useGameState';
import { WelcomeScreen } from './pages/game/WelcomeScreen';
import { PlayerSetupScreen } from './pages/game/PlayerSetupScreen';
import { RoleRevealScreen } from './pages/game/RoleRevealScreen';
import { MissionScreen } from './pages/game/MissionScreen';
import { VotingScreen } from './pages/game/VotingScreen';
import { MissionExecutionScreen } from './pages/game/MissionExecutionScreen';
import { GameOverScreen } from './pages/game/GameOverScreen';

const App = () => {
  const gameState = useGameState();

  const renderCurrentScreen = () => {
    switch (gameState.currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={() => gameState.setCurrentScreen('setup')} />;
      case 'setup':
        return <PlayerSetupScreen gameState={gameState} />;
      case 'reveal':
        return <RoleRevealScreen gameState={gameState} />;
      case 'mission':
        return <MissionScreen gameState={gameState} />;
      case 'voting':
        return <VotingScreen gameState={gameState} />;
      case 'execution':
        return <MissionExecutionScreen gameState={gameState} />;
      case 'gameover':
        return <GameOverScreen gameState={gameState} />;
      default:
        return <WelcomeScreen onStart={() => gameState.setCurrentScreen('setup')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default App;