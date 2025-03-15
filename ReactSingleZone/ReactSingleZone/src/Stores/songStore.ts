// src/Stores/songStore.ts
import { configureStore } from '@reduxjs/toolkit';
import songReducer from '../Slices/SongSlice';  // תיקנתי את הנתיב לפי מבנה התיקיות שלך

const songStore = configureStore({
  reducer: {
    songs: songReducer,
  },
});

export type RootState = ReturnType<typeof songStore.getState>;
export type AppDispatch = typeof songStore.dispatch;

export default songStore;
