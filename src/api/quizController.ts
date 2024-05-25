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

export function setQuiz(key: string, value: IQuiz[]): Promise<void> {
  return delay(500).then(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

export function removeQuiz(key: string): Promise<void> {
  return delay(500).then(() => {
    localStorage.removeItem(key);
  });
}
