'use client';

import React from 'react';
import QuizGame from '@/components/quiz-game/QuizGame';
import { ScoreProvider } from '@/contexts/QuizContext';

const QuizPage = () => (
  <ScoreProvider>
    <QuizGame />
  </ScoreProvider>
);

export default QuizPage;
