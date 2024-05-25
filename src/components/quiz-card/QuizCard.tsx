'use client';

import { useRouter } from 'next/navigation';

interface QuizCardProps {
  name: string;
  difficult: string;
  id: string;
}

export const QuizCard = ({ name, difficult, id }: QuizCardProps) => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 p-[10px] rounded-md color-white flex flex-col gap-[10px]">
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
      <button
        className="bg-blue-300 px-4 py-2 rounded-md text-white"
        onClick={() => router.push(`/quiz/${id}`)}
      >
        GO
      </button>
    </div>
  );
};
