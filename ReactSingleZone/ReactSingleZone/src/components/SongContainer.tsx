import React, { useState } from "react";
import { Box } from "@mui/material";
// import SearchBar from "./SearchBar";
import CategoryList from "./CategoryList";
import SongsList from "./SongsList";
import SearchBar from "./searchBar";

const SongContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // עדכון החיפוש
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setSelectedCategory(null); // מנקה את הבחירה בקטגוריה
    }
  };

  // עדכון הקטגוריה
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSearchQuery(""); // מנקה את שדה החיפוש
  };

  return (
    <Box>
      {/* חיפוש */}
      <SearchBar onSearch={handleSearch} />

      {/* קטגוריות */}
      <CategoryList onCategorySelect={handleCategorySelect} />

      {/* שירים לפי חיפוש או קטגוריה */}
      {searchQuery ? (
        <SongsList searchQuery={searchQuery} /> // אם יש חיפוש, הצגת תוצאות החיפוש
      ) : selectedCategory ? (
        <SongsList categoryId={selectedCategory} /> // אחרת, הצגת שירים מהקטגוריה
      ) : (
        <p>בחר קטגוריה או חפש שיר...</p>
      )}
    </Box>
  );
};

export default SongContainer;
