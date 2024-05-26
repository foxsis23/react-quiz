'use client';

import React, { useEffect, useState } from 'react';
import { getQuizById } from '@/api/quizController';
import { IQuiz } from '@/types/Quiz';
import QuizInput from '@/components/quiz-input/QuizInput';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';
import Timer from '@/components/timer/Timer';

const QuizGame = () => {
  const params = useParams<{ quizId: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [lock, setLock] = useState<boolean>(false);

  const [endedQuiz, setEndedQuiz] = useState<boolean>(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length as number) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setLock(false);
    }
    if (currentQuestionIndex == (quiz?.questions.length as number) - 1) {
      setEndedQuiz(true);
    }
  };

  useEffect(() => {
    getQuizById('quiz', params.quizId).then(data => setQuiz(data));
    setScore(Number(localStorage.getItem('score')));
    setTime(Number(localStorage.getItem('time')));
  }, [localStorage.getItem('score'), localStorage.getItem('time')]);

  if (endedQuiz) {
    return (
      <>
        <p className="text-center mt-[60px] text-2xl">
          <span className="font-bold">
            {score >= 3 ? 'Congratulations!' : 'Try again!'}
          </span>{' '}
          Your score: {score}
        </p>
        <p>Your time: {time}s</p>
        <button
          onClick={() => {
            router.push('/');
            localStorage.setItem('score', JSON.stringify(0));
            localStorage.setItem('time', JSON.stringify(0));
          }}
          className="rounded-md bg-green-400 text-white p-2 mt-4 hover:bg-green-500"
        >
          Back to quizzes
        </button>
      </>
    );
  }

  if (!quiz) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-[10px] mt-[120px] items-start w-[400px]">
      <p className="font-bold text-2xl">{quiz?.name}</p>
      <p>
        Question {currentQuestionIndex + 1} of {quiz?.questions.length}
      </p>
      <p className="mt-[15px] text-lg">
        {quiz?.questions[currentQuestionIndex].question}
      </p>
      <div className="flex flex-col gap-[15px]">
        {quiz?.questions[currentQuestionIndex].answers.map((item, index) => (
          <QuizInput
            key={index}
            text={item.text}
            correctAnswer={quiz?.questions[currentQuestionIndex].correctAnswer}
            lock={lock}
            setLock={setLock}
          />
        ))}
      </div>
      <div className="flex justify-between w-full items-center">
        <button
          onClick={handleNextQuestion}
          className="rounded-md bg-green-400 text-white px-4 py-2 hover:bg-green-500"
        >
          {currentQuestionIndex == quiz?.questions.length - 1 ? 'End' : 'Next'}
        </button>
        <Timer
          initialSeconds={600}
          onTimeUp={() => alert('Time is out')}
          isEnded={endedQuiz}
        />
      </div>
    </div>
  );
};

export default QuizGame;
