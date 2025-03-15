import React from 'react';
import { Card } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const WelcomeScreen = ({ onStart }) => (
  <Card className="card fade-in p-8 text-center">
    <h1 className="game-title flex items-center justify-center gap-3">
      <Building2 className="w-10 h-10" />
      Corporates
    </h1>
    <button className="button-primary" onClick={onStart}>New Game</button>
  </Card>
);