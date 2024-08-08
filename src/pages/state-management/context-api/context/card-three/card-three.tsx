// src/components/CardThree.tsx
import React, { useContext } from 'react';
import CounterContext from '../context';
import Card from '../../../../../components/card/card';

export default function CardThree() {
  const { state, dispatch } = useContext(CounterContext);

  const colors = [
   'bg-gray-200', 
  'bg-red-400', 
  'bg-green-300', 
  'bg-blue-300', 
  'bg-yellow-300', 
  'bg-purple-300', 
  ];

  return (
    <Card bgColor={state.bgColor}>
      <h2 className="text-xl font-bold mb-2">Card Three</h2>
      
      <div className="space-y-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`${color} text-black px-4 py-2 rounded`}
            onClick={() => dispatch({ type: 'SET_COLOR', color })}
          >
            {color.replace('bg-', '').replace('-', ' ')}
          </button>
        ))}
      </div>
    </Card>
  );
};


