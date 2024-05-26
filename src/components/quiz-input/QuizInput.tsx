'use client';

import React, { useEffect, useState } from 'react';

interface QuizInputProps {
  text: string;
  correctAnswer: string;
  lock: boolean;
  setLock: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizInput = ({ text, correctAnswer, setLock, lock }: QuizInputProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswer = () => {
    if (!lock) {
      if (text === correctAnswer) {
        setIsCorrect(true);
        setLock(true);
        localStorage.setItem('score', JSON.stringify(score + 1));
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
    setScore(Number(localStorage.getItem('score')));
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
