// src/Stores/songStore.ts
import { configureStore } from '@reduxjs/toolkit';
import songReducer from '../Slices/SongSlice';  // תיקנתי את הנתיב לפי מבנה התיקיות שלך
import actionSongReducer from '../Slices/actionSongSlice'
const songStore = configureStore({
  reducer: {
    songs: songReducer,
    actionSongs: actionSongReducer,
  },
});

export type RootStore = ReturnType<typeof songStore.getState>
export type AppDispatch = typeof songStore.dispatch;
export default songStore;
