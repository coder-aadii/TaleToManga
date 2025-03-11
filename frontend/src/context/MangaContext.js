import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const MangaContext = createContext();

export const MangaProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [mangaList, setMangaList] = useState([]);
  const [currentManga, setCurrentManga] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Get user's manga history
  const getMangaHistory = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const res = await axios.get('/api/manga');
      setMangaList(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch manga history');
    } finally {
      setLoading(false);
    }
  };

  // Get manga by ID
  const getMangaById = async (id) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const res = await axios.get(`/api/manga/${id}`);
      setCurrentManga(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch manga');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Generate manga from story
  const generateManga = async (title, story) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setGenerationProgress(10);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 1000);
      
      const res = await axios.post('/api/manga/generate', { title, story });
      
      clearInterval(progressInterval);
      setGenerationProgress(100);
      
      setCurrentManga(res.data);
      setMangaList(prev => [res.data, ...prev]);
      setError(null);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate manga');
      return null;
    } finally {
      setLoading(false);
      // Reset progress after a delay
      setTimeout(() => setGenerationProgress(0), 1000);
    }
  };

  // Update manga
  const updateManga = async (id, updates) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const res = await axios.put(`/api/manga/${id}`, updates);
      
      // Update current manga if it's the one being edited
      if (currentManga && currentManga._id === id) {
        setCurrentManga(res.data);
      }
      
      // Update manga in list
      setMangaList(prev => 
        prev.map(manga => manga._id === id ? res.data : manga)
      );
      
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update manga');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete manga
  const deleteManga = async (id) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      await axios.delete(`/api/manga/${id}`);
      
      // Remove from list
      setMangaList(prev => prev.filter(manga => manga._id !== id));
      
      // Clear current manga if it's the one being deleted
      if (currentManga && currentManga._id === id) {
        setCurrentManga(null);
      }
      
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete manga');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <MangaContext.Provider
      value={{
        mangaList,
        currentManga,
        loading,
        error,
        generationProgress,
        getMangaHistory,
        getMangaById,
        generateManga,
        updateManga,
        deleteManga,
        clearError
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};

export default MangaContext; 