import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../Stores/songStore';
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { fetchSongsByCategory } from '../Slices/actionSongSlice';

interface SongsListProps {
    categoryId: number;
}
const SongsList: React.FC<SongsListProps> = ({ categoryId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { songs, loading, error } = useSelector((state: RootStore) => state.actionSongs);


    useEffect(() => {
        console.log("id ", categoryId);
        dispatch(fetchSongsByCategory(categoryId));
        console.log("dfgthyjuk")
    }, [dispatch, categoryId]);

    if (loading) return <p>טוען שירים...</p>;
    if (songs.length === 0) return <p>אין שירים בקטגוריה זו.</p>;

    return (
        <div>
            <h2>שירים בקטגוריה {categoryId}</h2>
            {songs.map((song, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h3>{song.title}</h3>
                    <p>אמן: {song.artist}</p>
                    <audio controls>
                        <source src={song.audioUrl} type="audio/mp3" />
                        הדפדפן שלך לא תומך בניגון שמע.
                    </audio>
                </div>
            ))}
        </div>
    );
};

export default SongsList;