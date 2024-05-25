'use client';

import React, { useEffect, useState } from 'react';
import { useScore } from '@/contexts/QuizContext';

interface QuizInputProps {
  text: string;
  correctAnswer: string;
  lock: boolean;
  setLock: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizInput = ({ text, correctAnswer, setLock, lock }: QuizInputProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { state, dispatch } = useScore();

  const handleAnswer = () => {
    if (!lock) {
      if (text === correctAnswer) {
        setIsCorrect(true);
        setLock(true);
        dispatch({ type: 'increment' });
      } else {
        setIsCorrect(false);
        setLock(true);
      }
    }
  };

  useEffect(() => {
    if (!lock) {
      setIsCorrect(null);
    }
  }, [lock]);

  return (
    <div
      className="flex flex-row p-[10px] bg-gray-300 gap-[15px] w-[400px] cursor-pointer"
      onClick={handleAnswer}
    >
      <p
        className={
          isCorrect
            ? 'text-green-500'
            : isCorrect === false
              ? 'text-red-500'
              : 'text-black'
        }
      >
        {text}
      </p>
    </div>
  );
};

export default QuizInput;
