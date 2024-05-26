'use client';

import { getQuiz } from '@/api/quizController';
import { Difficult, IQuiz } from '@/types/Quiz';
import { useEffect, useState } from 'react';
import { QuizCard } from '@/components/quiz-card/QuizCard';
import Loading from '@/components/loading/Loading';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [quizArr, setQuizArr] = useState<IQuiz[] | null>(null);
  const { push } = useRouter();

  // localStorage.setItem(
  //   'quiz',
  //   JSON.stringify([
  //     {
  //       name: 'HTML & CSS',
  //       id: '1805082e-37b5-4ee0-aa7b-c898ae98c3ac',
  //       difficult: Difficult.EASY,
  //       questions: [
  //         {
  //           question: 'What does HTML stand for?',
  //           correctAnswer: 'Hyper Text Markup Language',
  //           answers: [
  //             { text: 'Hyper Text Markup Language' },
  //             { text: 'Home Tool Markup Language' },
  //             { text: 'Hyperlinks and Text Markup Language' },
  //           ],
  //         },
  //         {
  //           question:
  //             'Which HTML tag is used to define an internal style sheet?',
  //           correctAnswer: '<style>',
  //           answers: [
  //             { text: '<script>' },
  //             { text: '<css>' },
  //             { text: '<link>' },
  //             { text: '<style>' },
  //           ],
  //         },
  //         {
  //           question:
  //             'Which property is used to change the background color in CSS?',
  //           correctAnswer: 'background-color',
  //           answers: [
  //             { text: 'background-color' },
  //             { text: 'bgcolor' },
  //             { text: 'color' },
  //             { text: 'background' },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       name: 'JavaScript',
  //       id: 'f7914b03-f981-42c7-ab0c-b4a9c81315ab',
  //       difficult: Difficult.HARD,
  //       questions: [
  //         {
  //           question: 'Which company developed JavaScript?',
  //           correctAnswer: 'Netscape',
  //           answers: [
  //             { text: 'Microsoft' },
  //             { text: 'Netscape' },
  //             { text: 'Mozilla' },
  //             { text: 'Google' },
  //           ],
  //         },
  //         {
  //           question: 'How do you write a comment in JavaScript?',
  //           correctAnswer: '// This is a comment',
  //           answers: [
  //             { text: '<!-- This is a comment -->' },
  //             { text: '// This is a comment' },
  //             { text: '/* This is a comment */' },
  //             { text: '## This is a comment' },
  //           ],
  //         },
  //         {
  //           question:
  //             'What will the following code output? console.log(typeof null);',
  //           correctAnswer: 'undefined',
  //           answers: [
  //             { text: 'null' },
  //             { text: 'undefined' },
  //             { text: 'object' },
  //             { text: 'string' },
  //           ],
  //         },
  //       ],
  //     },
  //   ]),
  // );
  useEffect(() => {
    getQuiz('quiz').then(data => setQuizArr(data));
  }, []);

  return (
    <div className="flex flex-col gap-[20px] items-center mt-[60px]">
      <p className="font-bold text-4xl text-black">Choose your quiz</p>
      <button
        className="rounded-md bg-blue-400 text-white px-4 py-2 hover:bg-blue-500"
        onClick={() => push('/quiz/create')}
      >
        Add new quiz
      </button>
      <div className="flex flex-row gap-[20px] items-center justify-center mt-5 max-w-[500px] flex-wrap">
        {!quizArr ? (
          <Loading />
        ) : (
          <>
            {quizArr?.map(quiz => (
              <QuizCard
                name={quiz.name}
                difficult={quiz.difficult}
                id={quiz.id}
                key={quiz.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
