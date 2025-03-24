// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import memoReducer from './memoSlice';

const store = configureStore({
  reducer: {
    memos: memoReducer, // 変更点: memosの状態管理を追加
  },
});

// 変更点: RootState型とAppDispatch型をエクスポート（TypeScriptでReduxを使う際に推奨される設定）
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
