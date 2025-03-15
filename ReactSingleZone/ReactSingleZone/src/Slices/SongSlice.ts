// src/features/songs/songSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const API_URL = '/api';

// הגדרת סוגי הנתונים
interface Category {
  Id: number;
  Name: string;
}

interface Song {
  Id: number;
  Title: string;
  Artist: string;
}

interface SongState {
  categories: Category[];
  songs: Song[];
  loading: boolean;
  error: string | null;
}

// קריאת API להורדת קטגוריות
export const fetchCategories = createAsyncThunk<Category[]>(
  'songs/fetchCategories',
  async () => {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    return data;
  }
);

// קריאת API להורדת שירים לפי קטגוריה
export const fetchSongsByCategory = createAsyncThunk<Song[], number>(
  'songs/fetchSongsByCategory',
  async (categoryId) => {
    const response = await fetch(`${API_URL}/songs/category/${categoryId}`);
    const data = await response.json();
    return data;
  }
);

// יצירת ה-slice
const songSlice = createSlice({
  name: 'songs',
  initialState: {
    categories: [],
    songs: [],
    loading: false,
    error: null,
  } as SongState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load categories';
      })
      .addCase(fetchSongsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSongsByCategory.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchSongsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load songs';
      });
  },
});

export default songSlice.reducer;
