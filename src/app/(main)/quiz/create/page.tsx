'use client';

import React, { useState } from 'react';
import { Answers, Difficult, IQuiz, Questions } from '@/types/Quiz';
import { v4 as uuidv4 } from 'uuid';
import { addQuiz } from '@/api/quizController';
import { useRouter } from 'next/navigation';

const CreateQuiz = () => {
  const { push } = useRouter();

  const [quizName, setQuizName] = useState('');
  const [difficult, setDifficulty] = useState<string>('EASY');
  const [questions, setQuestions] = useState<Questions[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answers, setAnswers] = useState<Answers[]>([]);

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '' }]);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = value;
    setAnswers(newAnswers);
  };

  const handleAddQuestion = () => {
    if (
      currentQuestion === '' ||
      correctAnswer === '' ||
      answers.length === 0
    ) {
      alert('You need to fill all question fields!');
    } else {
      setQuestions([
        ...questions,
        { question: currentQuestion, correctAnswer, answers },
      ]);
      setCurrentQuestion('');
      setCorrectAnswer('');
      setAnswers([]);
    }
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    if (quizName === '' || questions.length === 0) {
      alert('Fill all inputs!');
    } else {
      const newQuiz: IQuiz = {
        name: quizName,
        difficult,
        questions,
        id: uuidv4(),
      };

      addQuiz('quiz', newQuiz).then(() => push('/'));

      setQuizName('');
      setDifficulty(Difficult.EASY);
      setQuestions([]);
    }
  };

  return (
    <div>
      <p className="font-bold text-2xl mt-10">Add New Quiz</p>
      <div className="flex flex-col gap-[15px] w-[600px]">
        <div>
          <label className="flex flex-col">
            Quiz Name:
            <input
              className="bg-gray-100 rounded-md p-1 text-black"
              type="text"
              value={quizName}
              onChange={e => setQuizName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="flex gap-[10px] items-center">
            Difficulty:
            <select
              className="bg-gray-100 rounded-md p-1 text-black"
              value={difficult}
              onChange={e => setDifficulty(e.target.value)}
            >
              <option value={Difficult.EASY}>{Difficult.EASY}</option>
              <option value={Difficult.MEDIUM}>{Difficult.MEDIUM}</option>
              <option value={Difficult.HARD}>{Difficult.HARD}</option>
            </select>
          </label>
        </div>
        <hr />
        <div>
          <label className="flex flex-col">
            Question:
            <input
              className="bg-gray-100 rounded-md p-1 text-black"
              type="text"
              value={currentQuestion}
              onChange={e => setCurrentQuestion(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="flex flex-col">
            Correct Answer:
            <input
              className="bg-gray-100 rounded-md p-1 text-black"
              type="text"
              value={correctAnswer}
              onChange={e => setCorrectAnswer(e.target.value)}
            />
          </label>
        </div>
        <hr />
        <p className="font-bold text-xl">Questions</p>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
              className="rounded-md bg-red-400 text-white px-4 py-2 hover:bg-red-500 mt-[10px]"
            >
              Remove Question
            </button>
          </div>
        ))}
        <hr />
        <div>
          <p className="font-bold text-xl">Answers:</p>
          {answers.map((answer, index) => (
            <div key={index}>
              <label className="flex flex-col">
                Answer {index + 1}:
                <input
                  className="bg-gray-100 rounded-md p-1 text-black"
                  type="text"
                  value={answer.text}
                  onChange={e => handleAnswerChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAnswer}
            className="rounded-md bg-blue-400 text-white px-4 py-2 hover:bg-blue-500 mt-[10px]"
          >
            Add Answer
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddQuestion}
          className="rounded-md bg-green-400 text-white p-2 hover:bg-green-500"
        >
          Add Question
        </button>
        <hr />
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md bg-blue-400 text-white p-2 hover:bg-blue-500"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
