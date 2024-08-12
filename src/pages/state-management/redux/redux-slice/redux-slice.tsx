// src/redux/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  count: number;
  bgColor: string;
}

const initialState: CounterState = {
  count: 0,
  bgColor: 'bg-white',
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.bgColor = action.payload;
    },
    resetAll: (state) => {
      state.count = 0;
      state.bgColor = 'bg-white';
    },
  },
});

export const { increment, decrement, reset, setColor, resetAll } = counterSlice.actions;
export default counterSlice.reducer;
