import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Crown, CheckCircle, Info, X } from 'lucide-react';

export const MissionScreen = ({ gameState }) => {
  const { gameState: state, setGameState } = gameState;
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [viewingMission, setViewingMission] = useState(null);

  const getMissionSize = () => {
    const playerCount = gameState.players.length;
    const round = state.currentRound;
    
    // if (playerCount <= 6) return round <= 2 ? 2 : 3;
    // if (playerCount === 7) return round <= 1 ? 2 : 3;
    // return round === 0 ? 3 : 4;

    // Round sizes based on the provided table
    const teamSizes = {
      5: [2, 3, 2, 3, 3],
      6: [2, 3, 4, 3, 4],
      7: [2, 3, 3, 4, 4],
      8: [3, 4, 4, 5, 5],
      9: [3, 4, 4, 5, 5],
      10: [3, 4, 4, 5, 5]
    };
    
    // Get the correct round size array based on player count
    // Default to 5 players if count is less than 5, or 10 if greater than 10
    const sizeArray = teamSizes[Math.min(Math.max(playerCount, 5), 10)];
    
    // Return the size for the current round
    return sizeArray[round];
  };

  const handlePlayerSelect = (index) => {
    setSelectedPlayers(current => {
      if (current.includes(index)) {
        return current.filter(i => i !== index);
      }
      if (current.length < getMissionSize()) {
        return [...current, index];
      }
      return current;
    });
  };

  const handleSubmit = () => {
    if (selectedPlayers.length === getMissionSize()) {
      // setGameState({
      //   ...state,
      //   selectedTeam: selectedPlayers,
      // });
      // gameState.setCurrentScreen('voting');
      // Get the actual player objects from the selected indices
      const missionTeam = selectedPlayers.map(index => gameState.players[index]);
    
      // Update the game state with both the selected team indices and the actual mission team
      setGameState({
        ...state,
        selectedTeam: selectedPlayers,
        currentMission: missionTeam
      });
      
      // Skip voting and go directly to execution
      gameState.setCurrentScreen('execution');
    }
  };

  const handleViewMission = (index) => {
    // Only allow viewing past missions that have results
    if (state.missionResults[index] !== undefined) {
      setViewingMission(index);
    }
  };

  // Get completed mission history with team members
  const getMissionHistory = (index) => {
    // This is placeholder data - you would need to store this information in gameState
    // Return example format if the actual data isn't available
    return state.missionHistory && state.missionHistory[index] ? 
      state.missionHistory[index] : 
      { team: [], success: state.missionResults[index] };
  };

  return (
    <Card className="card slide-up">
      <CardContent className="p-8">
        {viewingMission !== null ? (
          <div className="past-mission-details">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Info className="w-8 h-8 text-blue-500" />
                Strategic Initiative {viewingMission + 1} Details
              </h2>
              <button 
                onClick={() => setViewingMission(null)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className={`p-4 mb-6 rounded-lg ${
              state.missionResults[viewingMission] ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <h3 className="font-medium mb-2">Result: {state.missionResults[viewingMission] ? 'Success' : 'Failure'}</h3>
              <p>This initiative was {state.missionResults[viewingMission] ? 'completed successfully' : 'sabotaged'}.</p>
            </div>
            
            <h3 className="font-medium mb-2">Team Members</h3>
            <div className="space-y-2 mb-6">
              {/* Show team members if available in history */}
              {(getMissionHistory(viewingMission).team.length > 0) ? (
                getMissionHistory(viewingMission).team.map((playerIndex, i) => (
                  <div key={i} className="p-3 bg-blue-50 rounded-lg">
                    {gameState.players[playerIndex]?.name || `Player ${playerIndex + 1}`}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">Team information not available</p>
              )}
            </div>
            
            <button 
              onClick={() => setViewingMission(null)}
              className="button-primary w-full"
            >
              Back to Current Initiative
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              Strategic Initiative {state.currentRound + 1} Team Selection
            </h2>

            <div className="mb-6 flex flex-wrap gap-2">
              {/* Only show missions that have occurred */}
              {state.missionResults.map((result, index) => (
                <div 
                  key={index}
                  className={`mission-status cursor-pointer ${result ? 'success' : 'fail'}`}
                  onClick={() => handleViewMission(index)}
                >
                  Strategic Initiative {index + 1}
                  <div>{result ? '✓' : '✗'}</div>
                </div>
              ))}
              {/* Current mission indicator */}
              <div className="mission-status current">
                Strategic Initiative {state.currentRound + 1}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg pad">
              <Crown className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Leader: {gameState.players[state.currentLeader].name}</span>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="mb-2">
                <span className="font-medium">{gameState.players[state.currentLeader].name}</span> needs to select <span className="font-bold">{getMissionSize()}</span> people for this mission.
              </p>
              <p className="text-sm text-gray-600">
                {state.failedProposals > 0 && `${state.failedProposals} proposal(s) have already been rejected.`}
              </p>
            </div>

            

            <div className="space-y-2 pad">
              {gameState.players.map((player, index) => (
                <div 
                  key={index}
                  className={`player-card ${selectedPlayers.includes(index) ? 'selected' : ''}`}
                  onClick={() => handlePlayerSelect(index)}
                >
                  <div className="flex items-center justify-between">
                    <span>{player.name}</span>
                    {selectedPlayers.includes(index) && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleSubmit}
              disabled={selectedPlayers.length !== getMissionSize()}
              className="button-primary w-full mt-6"
            >
              Submit Team
            </button>
            {selectedPlayers.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  Selected Team ({selectedPlayers.length}/{getMissionSize()})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPlayers.map(index => (
                    <span key={index} className="px-3 py-1 bg-blue-100 rounded-full">
                      {gameState.players[index].name}&nbsp;
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};