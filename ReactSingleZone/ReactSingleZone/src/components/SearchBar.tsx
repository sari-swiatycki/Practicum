import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../Stores/songStore";
import { searchSongs } from "../Slices/actionSongSlice";
import { Box, TextField, CircularProgress } from "@mui/material";
import  song  from "../types/song";
import { useState } from "react";
const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector(
    (state: RootStore) => state.actionSongs
  );
  const [query, setQuery] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim().length > 2) {
      dispatch(searchSongs(value)); // שולח את מילת החיפוש ל-redux
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <TextField
        label="חפש שיר..."
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearch}
        sx={{ bgcolor: "white" }}
      />

      {loading && <CircularProgress sx={{ alignSelf: "center" }} />}

      {/* הצגת תוצאות החיפוש */}
      {query.length > 2 && !loading && searchResults.length === 0 && (
        <p>לא נמצאו תוצאות לחיפוש שלך.</p>
      )}

      {/* הצגת תוצאות החיפוש */}
      {query.length > 2 && !loading && searchResults.length > 0 && (
        <Box>
          <h3>תוצאות חיפוש</h3>
          {searchResults.map((song: song, index: number) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3>{song.title}</h3>
              <p>אמן: {song.artist}</p>
              <audio controls>
                <source src={song.audioUrl} type="audio/mp3" />
                הדפדפן שלך לא תומך בניגון שמע.
              </audio>
            </div>
          ))}
        </Box>
      )}

      {/* הצגת שגיאה אם יש */}
      {/* {error && <p>שגיאה: {error}</p>} */}
    </Box>
  );
};

export default SearchBar;