export interface IQuiz {
  name: string;
  questions: Questions[];
  difficult: Difficult;
  id: string;
}

export interface Questions {
  question: string;
  answers: Answers[];
}

interface Answers {
  text: string;
  isCorrect: boolean;
}

export enum Difficult {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
