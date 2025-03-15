import { useState } from 'react';

export const useGameState = () => {
  const [players, setPlayers] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [gameState, setGameState] = useState({
    currentRound: 0,
    missionResults: [],
    currentLeader: 0,
    failedProposals: 0,
    selectedTeam: [],
    currentMission: [],
    missionHistory: []
  });

  const setupGame = (playerCount) => {
    const mercenaryCount = playerCount <= 6 ? 2 : playerCount <= 9 ? 3 : 4;
    const roles = [...Array(playerCount)].map((_, i) => 
      i < mercenaryCount ? 'MERCENARY' : 'FOUNDER'
    );
    
    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }
    
    return roles;
  };

  return {
    players, setPlayers,
    currentScreen, setCurrentScreen,
    gameState, setGameState,
    setupGame
  };
};
