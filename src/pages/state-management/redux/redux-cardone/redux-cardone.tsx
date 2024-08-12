import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-store/redux-store';
import { increment,decrement } from '../redux-slice/redux-slice';
import Card from '../../../../components/card/card';

export default function CardOne() {
    const count = useSelector((state: RootState) => (state.counter as { count: number }).count);
    const bgColor = useSelector((state: RootState) => (state.counter as { bgColor: string }).bgColor);
  const dispatch = useDispatch();

  return (
    <Card bgColor={bgColor}>
      <h2 className="text-xl font-bold mb-2">Card One</h2>
      <p className="text-lg mb-4">Current Value: {count}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </Card>
  );
};
