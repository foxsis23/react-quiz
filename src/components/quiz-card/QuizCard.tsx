'use client';

import { useRouter } from 'next/navigation';

import QuizCardActions from '@/components/quiz-card/components/quiz-card-actions/QuizCardActions';

interface QuizCardProps {
  name: string;
  difficult: string;
  id: string;
}

export const QuizCard = ({ name, difficult, id }: QuizCardProps) => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 p-[10px] rounded-md color-white flex flex-col gap-[10px] shadow-md w-[150px] relative">
      <p className="font-bold text-xl">{name}</p>
      <p>
        Difficult:{' '}
        <span
          className={
            difficult === 'EASY'
              ? 'text-green-500 font-bold'
              : difficult === 'MEDIUM'
                ? 'text-yellow-500 font-bold'
                : 'text-red-500 font-bold'
          }
        >
          {difficult}
        </span>
      </p>
      <div className="flex gap-[10px] items-center">
        <QuizCardActions id={id} />
      </div>
    </div>
  );
};
