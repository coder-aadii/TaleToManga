import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MangaContext from '../context/MangaContext';

const ViewManga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMangaById, currentManga, loading, error, updateManga, deleteManga } = useContext(MangaContext);
  const [isPublic, setIsPublic] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    getMangaById(id);
    // eslint-disable-next-line
  }, [id]);
  
  useEffect(() => {
    if (currentManga) {
      setIsPublic(currentManga.isPublic);
    }
  }, [currentManga]);
  
  const handleTogglePublic = async () => {
    const newIsPublic = !isPublic;
    setIsPublic(newIsPublic);
    await updateManga(id, { isPublic: newIsPublic });
  };
  
  const handleDelete = async () => {
    if (await deleteManga(id)) {
      navigate('/dashboard');
    }
  };
  
  const handleDownload = () => {
    // In a real implementation, this would create a PDF or image collection
    alert('Download functionality would be implemented here');
  };
  
  const handleShare = () => {
    // In a real implementation, this would open a share dialog
    alert('Share functionality would be implemented here');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="card text-center py-8">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-4">Error Loading Manga</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }
  
  if (!currentManga) {
    return (
      <div className="card text-center py-8">
        <h2 className="text-xl font-bold mb-4">Manga Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The manga you're looking for doesn't exist or has been deleted.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{currentManga.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Created: {new Date(currentManga.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button onClick={handleDownload} className="btn btn-outline">
            Download
          </button>
          <button onClick={handleShare} className="btn btn-outline">
            Share
          </button>
          <button 
            onClick={handleTogglePublic} 
            className={`btn ${isPublic ? 'btn-primary' : 'btn-outline'}`}
          >
            {isPublic ? 'Public' : 'Private'}
          </button>
          <button 
            onClick={() => setShowDeleteConfirm(true)} 
            className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900"
          >
            Delete
          </button>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Manga</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Are you sure you want to delete "{currentManga.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="btn bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Story Section */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Original Story</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {currentManga.story}
        </p>
      </div>
      
      {/* Manga Panels */}
      <h2 className="text-2xl font-bold mb-4">Manga Panels</h2>
      
      {currentManga.panels && currentManga.panels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentManga.panels.map((panel, index) => (
            <div key={index} className="manga-panel">
              <img 
                src={panel.imageUrl} 
                alt={`Panel ${panel.order}`}
                className="w-full h-auto"
              />
              <div className="p-3 bg-gray-100 dark:bg-gray-800 border-t border-black">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Panel {panel.order}:</span> {panel.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-8 mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            No panels available for this manga.
          </p>
        </div>
      )}
      
      <div className="flex justify-between">
        <Link to="/dashboard" className="btn btn-outline">
          Back to Dashboard
        </Link>
        <Link to="/create" className="btn btn-primary">
          Create New Manga
        </Link>
      </div>
    </div>
  );
};

export default ViewManga; 