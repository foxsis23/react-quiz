'use client';

import React, { useEffect, useState } from 'react';
import { getQuizById } from '@/api/quizController';
import { IQuiz } from '@/types/Quiz';
import QuizInput from '@/components/quiz-input/QuizInput';
import { ScoreProvider, useScore } from '@/contexts/QuizContext';
import { useParams, useRouter } from 'next/navigation';

const QuizGame = () => {
  const params = useParams<{ quizId: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const { state } = useScore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [lock, setLock] = useState<boolean>(false);

  const [endedQuiz, setEndedQuiz] = useState<boolean>(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setLock(false);
    }
    if (currentQuestionIndex == quiz?.questions.length - 1) {
      setEndedQuiz(true);
    }
  };

  useEffect(() => {
    getQuizById('quiz', params.quizId).then(data => setQuiz(data));
  }, []);

  if (endedQuiz) {
    return (
      <>
        <p>
          {state.score >= 3 ? 'Congratulations!' : 'Try again!'} Your score:{' '}
          {state.score}
        </p>
        <button onClick={() => router.push('/')}>Back to quizzes</button>
      </>
    );
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
      <button onClick={handleNextQuestion}>
        {currentQuestionIndex == quiz?.questions.length - 1 ? 'End' : 'Next'}
      </button>
    </div>
  );
};

export default QuizGame;
