import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-store/redux-store';
import { setColor } from '../redux-slice/redux-slice';
import Card from '../../../../components/card/card';

export default function CardThree() {
    const bgColor = useSelector((state: RootState) => (state.counter as { bgColor: string }).bgColor);
  const dispatch = useDispatch();

  const colors = [
    'bg-white',
    'bg-red-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-yellow-100',
    'bg-purple-100',
  ];

  return (
    <Card bgColor={bgColor}>
      <h2 className="text-xl font-bold mb-2">Card Three</h2>
      <div className="space-y-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`${color} text-black px-4 py-2 rounded`}
            onClick={() => dispatch(setColor(color))}
          >
            {color.replace('bg-', '').replace('-', ' ')}
          </button>
        ))}
      </div>
    </Card>
  );
};


