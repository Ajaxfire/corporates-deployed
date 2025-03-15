/// No longer used. No voting screen in the game.
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Vote, ThumbsUp, ThumbsDown } from 'lucide-react';

export const VotingScreen = ({ gameState }) => {
  const [currentVoter, setCurrentVoter] = useState(0);
  const [votes, setVotes] = useState([]);

  const handleVote = (approved) => {
    const newVotes = [...votes, approved];
    
    if (currentVoter < gameState.players.length - 1) {
      setCurrentVoter(currentVoter + 1);
      setVotes(newVotes);
    } else {
      processVotes(newVotes);
    }
  };

  const processVotes = (finalVotes) => {
    const approved = finalVotes.filter(v => v).length > finalVotes.length / 2;
    const { gameState: state, setGameState } = gameState;
    
    if (approved) {
      const missionTeam = state.selectedTeam.map(i => gameState.players[i]);
      setGameState({
        ...state,
        currentMission: missionTeam
      });
      gameState.setCurrentScreen('execution');
    } else {
      setGameState({
        ...state,
        failedProposals: state.failedProposals + 1,
        currentLeader: (state.currentLeader + 1) % gameState.players.length
      });
      gameState.setCurrentScreen('mission');
    }
  };

  return (
    <Card className="card slide-up">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Vote className="w-8 h-8 text-blue-500" />
          Team Vote
        </h2>

        <div className="mb-8 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-xl font-medium mb-2">{gameState.players[currentVoter].name}'s Vote</p>
          <p className="text-gray-600">Choose whether to approve or reject the team</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleVote(true)}
            className="button-primary flex items-center justify-center gap-2"
          >
            <ThumbsUp className="w-5 h-5" />
            Approve
          </button>
          <button 
            onClick={() => handleVote(false)}
            className="border-2 border-gray-200 rounded-lg py-3 px-6 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ThumbsDown className="w-5 h-5" />
            Reject
          </button>
        </div>
      </CardContent>
    </Card>
  );
};