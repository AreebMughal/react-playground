// src/components/CardOne.tsx
import React, { useContext } from 'react';
import CounterContext from '../context';
import Card from '../../../../../components/card/card';

const CardOne: React.FC = () => {
  const { state, dispatch } = useContext(CounterContext);

  return (
    <Card bgColor={state.bgColor}>
      <h2 className="text-xl font-bold mb-2">Card One</h2>
      <p className="text-lg mb-4">Current Value: {state.count}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => dispatch({ type: 'INCREMENT' })}
      >
        Increment
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch({ type: 'DECREMENT' })}
      >
        Decrement
      </button>
    </Card>
  );
};

export default CardOne;
