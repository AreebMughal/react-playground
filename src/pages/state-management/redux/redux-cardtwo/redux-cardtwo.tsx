// src/components/CardTwo.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-store/redux-store';
import { reset } from '../redux-slice/redux-slice';
import Card from '../../../../components/card/card';

export default function CardTwo (){
    const count = useSelector((state: RootState) => (state.counter as { count: number }).count);
    const bgColor = useSelector((state: RootState) => (state.counter as { bgColor: string }).bgColor);
  const dispatch = useDispatch();

  return (
    <Card bgColor={bgColor}>
      <h2 className="text-xl font-bold mb-2">Card Two</h2>
      <p className="text-lg mb-4">Current Value: {count}</p>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch(reset())}
      >
        Reset
      </button>
    </Card>
  );
};


