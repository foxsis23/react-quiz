'use client';

import { getQuiz, setQuiz } from '@/api/quizController';
import { Difficult, IQuiz } from '@/types/Quiz';
import { useState } from 'react';
import { QuizCard } from '@/components/quiz-card/QuizCard';

export default function Home() {
  const [quizArr, setQuizArr] = useState<IQuiz[] | null>(null);

  setQuiz<IQuiz[]>('quiz', [
    {
      name: 'test quiz',
      id: '1805082e-37b5-4ee0-aa7b-c898ae98c3ac',
      difficult: Difficult.EASY,
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
      id: 'f7914b03-f981-42c7-ab0c-b4a9c81315ab',
      difficult: Difficult.HARD,
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
    .then(data => setQuizArr(data));

  return (
    <div className="flex flex-col gap-[20px] items-center mt-[60px]">
      <p className="font-bold text-4xl">Choose your quiz</p>
      <div className="flex flex-row gap-[15px] items-center justify-center">
        {quizArr?.map(quiz => (
          <QuizCard name={quiz.name} difficult={quiz.difficult} key={quiz.id} />
        ))}
      </div>
    </div>
  );
}
