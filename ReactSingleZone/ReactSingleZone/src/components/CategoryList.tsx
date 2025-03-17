import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../Stores/songStore";
import SongsList from "./SongsList";
import { fetchCategories } from "../Slices/SongSlice";
import { Box, Button, Typography } from "@mui/material";

const CategoryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootStore) => state.songs
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  if (loading) return <Typography>טוען קטגוריות...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;

  return (
    <Box>
      {/* כותרת */}
      <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>
        קטגוריות
      </Typography>

      {/* תפריט קטגוריות בעיצוב מודרני וגלילה אופקית */}
      <Box
        sx={{
          
          top: 80,
          left: 0,
          width: "100%",
          bgcolor: "black",
          p: 2,
          boxShadow: 3,
          overflowX: "auto",
          whiteSpace: "nowrap",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          height: "60px",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "contained" : "outlined"}
              sx={{
                bgcolor: selectedCategory === category.id ? "gray" : "black",
                color: "white",
                "&:hover": { bgcolor: "darkgray" },
                minWidth: "150px",
              }}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </Box>

      {/* קומפוננטת השירים בהתאם לקטגוריה שנבחרה */}
      <Box sx={{ mt: 10 }}>
        {selectedCategory && <SongsList categoryId={selectedCategory} />}
      </Box>
    </Box>
  );
};
export default CategoryList;