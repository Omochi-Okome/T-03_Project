import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Memo {
  id: string;
  title: string;
  content: string;
}

const initialState: Memo[] = [];

const memoSlice = createSlice({
  name: 'memos',
  initialState,
  reducers: {
    setMemos(state, action: PayloadAction<Memo[]>) {
      return action.payload; // 配列全体を新しい配列に置換
    },
  },
});

export const { setMemos } = memoSlice.actions;
export default memoSlice.reducer;
