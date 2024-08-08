// src/components/CardTwo.tsx
import React, { useContext } from 'react';
import CounterContext from '../context';
import Card from '../../../../../components/card/card';

export default function CardTwo() {
  const { state, dispatch } = useContext(CounterContext);

  return (
    <Card bgColor={state.bgColor}>
      <h2 className="text-xl font-bold mb-2">Card Two</h2>
      <p className="text-lg mb-4">Current Value: {state.count}</p>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Reset
      </button>
    </Card>
  );
};


