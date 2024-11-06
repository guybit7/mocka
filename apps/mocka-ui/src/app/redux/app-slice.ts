import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AppState {
  value: number;
  title: string;
}

// Define the initial state using that type
const initialState: AppState = {
  value: 0,
  title: 'Welcome',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.app.value;

export default appSlice.reducer;
