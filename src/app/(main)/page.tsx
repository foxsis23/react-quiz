'use client';

import { getQuiz, setDefaultQuizzes } from '@/api/quizController';
import { IQuiz } from '@/types/Quiz';
import { useEffect, useMemo, useState } from 'react';
import { QuizCard } from '@/components/quiz-card/QuizCard';
import Loading from '@/components/loading/Loading';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [quizArr, setQuizArr] = useState<IQuiz[] | null>(null);
  const [searchTerm, setSerchTerm] = useState<string>('');

  const { push } = useRouter();

  useEffect(() => {
    getQuiz('quiz').then(data => setQuizArr(data));
  }, []);

  const filteredQuizzes = useMemo(() => {
    return quizArr?.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const addDefaultQuizzes = () => {
    setDefaultQuizzes();
    location.reload();
  };

  return (
    <div className="flex flex-col gap-[20px] items-center mt-[60px]">
      <p className="font-bold text-4xl text-black">Choose your quiz</p>
      <div className="flex gap-[10px]">
        <button
          className="rounded-md bg-blue-400 text-white px-4 py-2 hover:bg-blue-500"
          onClick={() => push('/quiz/create')}
        >
          Add new quiz
        </button>
        <button
          className="rounded-md bg-blue-400 text-white px-4 py-2 hover:bg-blue-500"
          onClick={addDefaultQuizzes}
        >
          Add default quizzes
        </button>
      </div>

      <input
        type="text"
        placeholder="search..."
        className="bg-gray-100 rounded-md p-2 text-black w-[600px]"
        value={searchTerm}
        onChange={e => setSerchTerm(e.target.value)}
      />
      <div className="flex flex-row gap-[20px] items-center justify-center mt-5 max-w-[600px] flex-wrap">
        {!quizArr ? (
          <Loading />
        ) : (
          <>
            {searchTerm ? (
              <>
                {filteredQuizzes?.map(quiz => (
                  <QuizCard
                    name={quiz.name}
                    difficult={quiz.difficult}
                    id={quiz.id}
                    key={quiz.id}
                  />
                ))}
              </>
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
          </>
        )}
      </div>
    </div>
  );
}
