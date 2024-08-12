// src/components/CardFour.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-store/redux-store';
import { resetAll } from '../redux-slice/redux-slice';
import Card from '../../../../components/card/card';

export default function CardFour(){
    const bgColor = useSelector((state: RootState) => (state.counter as { bgColor: string }).bgColor);
  const dispatch = useDispatch();

  return (
    <Card bgColor={bgColor}>
      <h2 className="text-xl font-bold mb-2">Card Four</h2>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch(resetAll())}
      >
        Reset All
      </button>
    </Card>
  );
};

