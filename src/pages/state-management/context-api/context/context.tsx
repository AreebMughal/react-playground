// src/CounterContext.tsx
import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';

interface State {
  count: number;
  bgColor: string;
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COLOR', color: string }
  | { type: 'RESET_ALL' };

const initialState: State = { count: 0, bgColor: 'bg-white' };

const CounterContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    case 'SET_COLOR':
      return { ...state, bgColor: action.color }
     
     case 'RESET_ALL':
        return { ...state, count: 0, bgColor: 'bg-white' };
    default:
      return state;
  }
};

export const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterContext;
