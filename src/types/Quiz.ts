export interface IQuiz {
  name: string;
  questions: Questions[];
}

interface Questions {
  question: string;
  answers: Answers[];
}

interface Answers {
  text: string;
  isCorrect: boolean;
}
