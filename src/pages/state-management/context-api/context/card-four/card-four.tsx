import React, { useContext } from 'react';
import CounterContext from '../context'; // Ensure this path is correct
import Card from '../../../../../components/card/card';

export default function CardFour() {
    const { state, dispatch } = useContext(CounterContext);

    return (
        <Card bgColor={state.bgColor}>
            <h2 className="text-xl font-bold mb-2">Card Four</h2>

            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => dispatch({ type: 'RESET_ALL' })}
            >
                Reset All
            </button>
        </Card>
    );
}