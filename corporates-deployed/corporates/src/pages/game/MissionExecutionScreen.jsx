import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

// Mission Execution Screen
export const MissionExecutionScreen = ({ gameState }) => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [votes, setVotes] = useState([]);
  const { gameState: state, setGameState } = gameState;

  const currentMissionPlayer = state.currentMission[currentPlayer];

  const handleVote = (sabotage) => {
    const newVotes = [...votes, sabotage];
    
    if (currentPlayer < state.currentMission.length - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setVotes(newVotes);
    } else {
      processMissionResults(newVotes);
    }
  };

  const processMissionResults = (finalVotes) => {
    const missionSuccess = finalVotes.filter(v => v).length === 0;
    const newResults = [...state.missionResults, missionSuccess];
    
    // Get indices of selected team members from state.selectedTeam
    const selectedTeamIndices = state.selectedTeam;
    
    // Update mission history with the selected team
    const newMissionHistory = [...state.missionHistory];
    newMissionHistory[state.currentRound] = {
      team: selectedTeamIndices,
      success: missionSuccess,
      votes: finalVotes
    };
    
    setGameState({
      ...state,
      missionResults: newResults,
      currentRound: state.currentRound + 1,
      currentLeader: (state.currentLeader + 1) % gameState.players.length,
      failedProposals: 0,
      missionHistory: newMissionHistory // Store the mission history
    });

    if (newResults.filter(r => r).length >= 3 || newResults.filter(r => !r).length >= 3) {
      gameState.setCurrentScreen('gameover');
    } else {
      gameState.setCurrentScreen('mission');
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Mission Execution</h2>
        <div className="mb-8">
          <p className="text-xl text-center">{currentMissionPlayer.name}'s Turn</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          {currentMissionPlayer.role === 'MERCENARY' ? (
            <>
              <Button 
                onClick={() => handleVote(false)}
                className="button-primary flex items-center justify-center gap-2"
              ><ThumbsUp className="w-5 h-5" />
                Success
              </Button>&nbsp;
              <Button 
                onClick={() => handleVote(true)}
                className="button-primary flex items-center justify-center gap-2"
              ><ThumbsDown className="w-5 h-5" />
                Sabotage
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => handleVote(false)}
              className="button-primary flex items-center justify-center gap-2"
            >
              <ThumbsUp className="w-5 h-5" />
              Success
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};