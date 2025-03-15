// src/components/SongsByCategory.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSongsByCategory } from '../Slices/SongSlice';  // תיקנתי את הנתיב
import { RootState } from '../Stores/songStore';  // תיקנתי את הנתיב

const SongsByCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSongsByCategory(parseInt(categoryId)));
    }
  }, [dispatch, categoryId]);

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Songs in Category {categoryId}</h1>
      <div>
        {songs.map((song) => (
          <div key={song.Id}>
            <h3>{song.Title}</h3>
            <p>{song.Artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsByCategory;
