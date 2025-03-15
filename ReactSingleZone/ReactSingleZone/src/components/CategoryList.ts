// src/components/CategoryList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../Slices/SongSlice';  // תיקנתי את הנתיב
import { useHistory } from 'react-router-dom';
import { RootState } from '../Stores/songStore';  // תיקנתי את הנתיב

const CategoryList: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categories, loading, error } = useSelector((state: RootState) => state.songs);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    history.push(`/songs/category/${categoryId}`);
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Categories</h1>
      <div>
        {categories.map((category) => (
          <button
            key={category.Id}
            onClick={() => handleCategoryClick(category.Id)}
          >
            {category.Name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
