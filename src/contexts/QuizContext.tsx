import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ScoreState {
  score: number;
}

interface ScoreAction {
  type: 'increment' | 'reset';
  payload?: number;
}

const initialState: ScoreState = {
  score: 0,
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

export const useScore = () => useContext(ScoreContext);
