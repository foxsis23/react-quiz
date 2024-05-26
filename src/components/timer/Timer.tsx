import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/contexts/QuizContext';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  isEnded: boolean;
}

const Timer = ({ initialSeconds, onTimeUp, isEnded }: TimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const { dispatch } = useQuiz();

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      localStorage.setItem('time', JSON.stringify(initialSeconds - seconds));
      if (isEnded) {
        return () => clearTimeout(timerId);
      }

      return () => clearTimeout(timerId);
    } else {
      onTimeUp();
    }
  }, [seconds, onTimeUp]);

  return <p>Time Remaining: {seconds}s</p>;
};

export default Timer;
