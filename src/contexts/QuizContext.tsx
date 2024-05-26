import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ScoreState {
  score: number;
  time: number;
}

interface ScoreAction {
  type: 'increment' | 'reset' | 'setTime';
  payload?: number;
}

const initialState: ScoreState = {
  score: 0,
  time: 0,
};

const ScoreContext = createContext<{
  state: ScoreState;
  dispatch: React.Dispatch<ScoreAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const scoreReducer = (state: ScoreState, action: ScoreAction): ScoreState => {
  switch (action.type) {
    case 'increment':
      return { ...state, score: state.score + 1 };
    case 'reset':
      return { ...state, score: 0 };
    case 'setTime':
      return { ...state, time: action.payload ?? state.time };
    default:
      return state;
  }
};

export const ScoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(scoreReducer, initialState);

  return (
    <ScoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useQuiz = () => useContext(ScoreContext);
