import { IQuiz } from '@/types/Quiz';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getQuiz(key: string): Promise<IQuiz[] | null> {
  return delay(500).then(() => {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as IQuiz[]) : null;
  });
}

export function getQuizById(key: string, id: string): Promise<IQuiz | null> {
  return delay(500).then(() => {
    const data = JSON.parse(localStorage.getItem(key) as string);
    const quizItem = data.find((item: IQuiz) => item.id === id);
    return quizItem ? quizItem : null;
  });
}

export function editQuiz(key: string, value: IQuiz): Promise<void> {
  let quizzes: IQuiz[] | null = [];
  getQuiz('quiz').then(data => {
    quizzes = data;
    const quizIndex = quizzes?.findIndex(item => item.id === value.id);
    if (quizzes !== null) {
      quizzes[quizIndex as number] = value;
    }
    console.log(quizzes);
  });

  return delay(500).then(() => {
    localStorage.setItem(key, JSON.stringify(quizzes));
  });
}

export function addQuiz(key: string, value: IQuiz): Promise<void> {
  let quizzes: IQuiz[] | null = [];
  getQuiz('quiz').then(data => (quizzes = [...(data as IQuiz[]), value]));

  return delay(500).then(() => {
    localStorage.setItem(key, JSON.stringify(quizzes));
  });
}

export function removeQuiz(key: string, id: string): Promise<void> {
  let quizzes: IQuiz[] | null = [];
  getQuiz('quiz').then(data => {
    if (data !== null) {
      quizzes = data.filter(item => item.id !== id);
    }
  });

  return delay(500).then(() => {
    localStorage.setItem(key, JSON.stringify(quizzes));
  });
}
