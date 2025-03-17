// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import song from '../types/song';
 

// const API_URL = 'http://localhost:5120';  // כתובת ה-API שלך

// // הגדרת סוגי הנתונים עבור ה-State
// interface SongState {
//   songs: song[];
//   loading: boolean;
//   error: string | null;
// }

// // קריאת API להורדת שירים לפי קטגוריה
// export const fetchSongsByCategory = createAsyncThunk<song[], number>(
//   'actionSongs/fetchSongsByCategory',  // שינינו את השם כאן
//   async (categoryId:number) => {
//     try {  
        
//         const response = await axios.get(`${API_URL}/api/Songs/ByCategory/${categoryId}`);
//         console.log(response.data);      
//       return response.data.worksheets;
//     } catch (error) {
        
//     //   throw new Error(error.response ? error.response.data : 'Error fetching songs');
//     }
//   }
// );

// // יצירת ה-Slice
// const actionSongSlice = createSlice({
//   name: 'actionSongs',  // שינינו את השם כאן
//   initialState: {
//     songs: [],
//     loading: false,
//     error: null as string | null,
//   } as SongState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSongsByCategory.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchSongsByCategory.fulfilled, (state, action: PayloadAction<song[]>) => {
//         state.loading = false;
//         state.songs = action.payload;
//       })
//       .addCase(fetchSongsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to load songs';
//       });
//   },
// });

// export default actionSongSlice.reducer;



































import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import song from '../types/song';

const API_URL = 'http://localhost:5120';  // כתובת ה-API שלך

// הגדרת סוגי הנתונים עבור ה-State
interface SongState {
  songs: song[];
  searchResults: song[]; // הוספנו את השדה הזה
  loading: boolean;
  error: string | null;
}

// קריאת API לחיפוש חכם לפי מילת חיפוש
export const searchSongs = createAsyncThunk<song[], string>(
  'actionSongs/searchSongs', // שם הפעולה
  async (query: string) => {
    // try {
      // שליחת הבקשה לשרת לחיפוש לפי מילת חיפוש
      const response = await axios.get(`${API_URL}/api/Songs/search/${query}`);
      return response.data; // החזרת תוצאות החיפוש
    // } catch (error) {
    //   throw new Error('Failed to fetch search results');
    // }
  }
);

// קריאת API להורדת שירים לפי קטגוריה
export const fetchSongsByCategory = createAsyncThunk<song[], number>(
  'actionSongs/fetchSongsByCategory',  
  async (categoryId:number) => {
    // try {  
      const response = await axios.get(`${API_URL}/api/Songs/ByCategory/${categoryId}`);
      return response.data.worksheets;
    // } catch (error) {
    //   throw new Error('Failed to fetch songs');
    // }
  }
);

// יצירת ה-Slice
const actionSongSlice = createSlice({
  name: 'actionSongs',  
  initialState: {
    songs: [],
    searchResults: [], // הגדרת searchResults
    loading: false,
    error: null as string | null,
  } as SongState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSongsByCategory.fulfilled, (state, action: PayloadAction<song[]>) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchSongsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load songs';
      })
      // תוצאות החיפוש
      .addCase(searchSongs.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSongs.fulfilled, (state, action: PayloadAction<song[]>) => {
        state.loading = false;
        state.searchResults = action.payload;  // עדכון תוצאות החיפוש
      })
      .addCase(searchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to search songs';
      });
  },
});

export default actionSongSlice.reducer;
