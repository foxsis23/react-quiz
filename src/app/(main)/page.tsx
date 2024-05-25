'use client';

import { getQuiz, setQuiz } from '@/api/quizController';
import { IQuiz } from '@/types/Quiz';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    setQuiz<IQuiz[]>('quiz', [
      {
        name: 'test quiz',
        questions: [
          {
            question: 'Test question 1',
            answers: [
              { text: 'Test answer', isCorrect: false },
              { text: 'Test answer', isCorrect: false },
              { text: 'Test answer', isCorrect: true },
            ],
          },
        ],
      },
      {
        name: 'test quiz2',
        questions: [
          {
            question: 'Test question 2',
            answers: [
              { text: 'Test answer', isCorrect: false },
              { text: 'Test answer', isCorrect: true },
              { text: 'Test answer', isCorrect: false },
            ],
          },
        ],
      },
    ])
      .then(() => getQuiz<IQuiz[]>('quiz'))
      .then(data => console.log('Data from localStorage:', data));
  }, []);

  return (
    <div className="flex items-center mt-[60px]">
      <p className="font-bold text-4xl">Choose your quiz</p>
      <div className="flex flex-row gap-[15px] items-center justify-center"></div>
    </div>
  );
}
