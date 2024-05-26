import { Difficult, IQuiz } from '@/types/Quiz';

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

export function setDefaultQuizzes() {
  localStorage.setItem('quiz', JSON.stringify([]));
  localStorage.setItem(
    'quiz',
    JSON.stringify([
      {
        name: 'HTML & CSS',
        id: '1805082e-37b5-4ee0-aa7b-c898ae98c3ac',
        difficult: Difficult.EASY,
        questions: [
          {
            question: 'What does HTML stand for?',
            correctAnswer: 'Hyper Text Markup Language',
            answers: [
              { text: 'Hyper Text Markup Language' },
              { text: 'Home Tool Markup Language' },
              { text: 'Hyperlinks and Text Markup Language' },
            ],
          },
          {
            question:
              'Which HTML tag is used to define an internal style sheet?',
            correctAnswer: '<style>',
            answers: [
              { text: '<script>' },
              { text: '<css>' },
              { text: '<link>' },
              { text: '<style>' },
            ],
          },
          {
            question:
              'Which property is used to change the background color in CSS?',
            correctAnswer: 'background-color',
            answers: [
              { text: 'background-color' },
              { text: 'bgcolor' },
              { text: 'color' },
              { text: 'background' },
            ],
          },
        ],
      },
      {
        name: 'JavaScript',
        id: 'f7914b03-f981-42c7-ab0c-b4a9c81315ab',
        difficult: Difficult.HARD,
        questions: [
          {
            question: 'Which company developed JavaScript?',
            correctAnswer: 'Netscape',
            answers: [
              { text: 'Microsoft' },
              { text: 'Netscape' },
              { text: 'Mozilla' },
              { text: 'Google' },
            ],
          },
          {
            question: 'How do you write a comment in JavaScript?',
            correctAnswer: '// This is a comment',
            answers: [
              { text: '<!-- This is a comment -->' },
              { text: '// This is a comment' },
              { text: '/* This is a comment */' },
              { text: '## This is a comment' },
            ],
          },
          {
            question:
              'What will the following code output? console.log(typeof null);',
            correctAnswer: 'undefined',
            answers: [
              { text: 'null' },
              { text: 'undefined' },
              { text: 'object' },
              { text: 'string' },
            ],
          },
        ],
      },
      {
        name: 'Python',
        id: '54d2d4b1-be5a-440b-9514-837f8d5ec26a',
        difficult: Difficult.MEDIUM,
        questions: [
          {
            question: 'Which keyword is used to define a function in Python?',
            correctAnswer: 'def',
            answers: [
              { text: 'function' },
              { text: 'def' },
              { text: 'define' },
            ],
          },
          {
            question: 'What is the correct file extension for Python files?',
            correctAnswer: '.py',
            answers: [
              { text: '.pt' },
              { text: '.pyth' },
              { text: '.py' },
              { text: '.pyt' },
            ],
          },
          {
            question:
              'Which of the following is a correct way to create a list in Python?',
            correctAnswer: 'my_list = [1, 2, 3]',
            answers: [
              { text: 'my_list = {1, 2, 3}' },
              { text: 'my_list = (1, 2, 3)' },
              { text: 'my_list = [1, 2, 3]' },
              { text: 'my_list = <1, 2, 3>' },
            ],
          },
        ],
      },
      {
        name: 'React',
        id: '502a445d-6637-4630-abda-3234d5ab4b5d',
        difficult: Difficult.HARD,
        questions: [
          {
            question: 'What is a React component?',
            correctAnswer: 'A function or class that renders part of the UI',
            answers: [
              { text: 'A library for managing state' },
              { text: 'A function or class that renders part of the UI' },
              { text: 'A type of variable' },
            ],
          },
          {
            question:
              'Which hook is used for state management in functional components?',
            correctAnswer: 'useState',
            answers: [
              { text: 'useState' },
              { text: 'useEffect' },
              { text: 'useContext' },
              { text: 'useReducer' },
            ],
          },
          {
            question: 'What does JSX stand for?',
            correctAnswer: 'JavaScript XML',
            answers: [
              { text: 'JavaScript XML' },
              { text: 'JavaScript Extension' },
              { text: 'Java Syntax Extension' },
              { text: 'JavaScript Syntax Extension' },
            ],
          },
        ],
      },
    ]),
  );
}
