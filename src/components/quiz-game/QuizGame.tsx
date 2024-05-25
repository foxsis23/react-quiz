'use client';

import React, { useEffect, useState } from 'react';
import { getQuizById } from '@/api/quizController';
import { IQuiz, Questions } from '@/types/Quiz';

interface QuizGameProps {
  id: string;
}

const QuizGame = ({ id }: QuizGameProps) => {
  const [quiz, setQuiz] = useState<IQuiz | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  useEffect(() => {
    getQuizById('quiz', id).then(data => setQuiz(data));
  }, []);

  return (
    <div className="flex flex-col gap-[10px] mt-[120px] items-start w-[400px]">
      <p className="font-bold text-2xl">{quiz?.name}</p>
      <p>
        Question {currentQuestionIndex + 1} of {quiz?.questions.length}
      </p>
      <p>{quiz?.questions[currentQuestionIndex].question}</p>
      <div>
        {quiz?.questions[currentQuestionIndex].answers.map(item => (
          <div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <button onClick={handleNextQuestion}>
        {currentQuestionIndex == quiz?.questions.length - 1 ? 'End' : 'Next'}
      </button>
    </div>
  );
};

export default QuizGame;
