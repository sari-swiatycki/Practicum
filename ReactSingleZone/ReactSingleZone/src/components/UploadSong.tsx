import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const UploadSong: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !artist || !audioFile) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('audio', audioFile);

    try {
      const response = await axios.post('http://localhost:5000/api/Songs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Song uploaded successfully!');
    } catch (err) {
      setError('Failed to upload song.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div>
      <h2>Upload a New Song</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Song Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Audio File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="audio/*"
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Song'}
          </button>
        </div>
      </form>
    </div>    
  );
};

export default UploadSong;
