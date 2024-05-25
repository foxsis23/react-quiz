import React from 'react';
import QuizGame from '@/components/quiz-game/QuizGame';

const QuizPage = ({ params }: { params: { quizId: string } }) => (
  <QuizGame id={params.quizId} />
);

export default QuizPage;
