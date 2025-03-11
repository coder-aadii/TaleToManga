import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import MangaContext from '../context/MangaContext';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { mangaList, getMangaHistory, deleteManga, loading, error } = useContext(MangaContext);
  const { user } = useContext(AuthContext);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  useEffect(() => {
    getMangaHistory();
    // eslint-disable-next-line
  }, []);
  
  const handleDelete = async (id) => {
    if (await deleteManga(id)) {
      setDeleteConfirm(null);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}!
          </p>
        </div>
        <Link to="/create" className="btn btn-primary mt-4 md:mt-0">
          Create New Manga
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {mangaList.length === 0 ? (
        <div className="card text-center py-12">
          <h2 className="text-xl font-bold mb-4">No Manga Created Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't created any manga yet. Start by creating your first manga!
          </p>
          <Link to="/create" className="btn btn-primary">
            Create Your First Manga
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mangaList.map(manga => (
            <div key={manga._id} className="card overflow-hidden">
              <div className="relative aspect-[3/2] overflow-hidden bg-gray-200 dark:bg-gray-700">
                {manga.panels && manga.panels.length > 0 ? (
                  <img 
                    src={manga.panels[0].imageUrl} 
                    alt={manga.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 dark:text-gray-400">No image</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 truncate">{manga.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Created: {new Date(manga.createdAt).toLocaleDateString()}
                </p>
                
                <div className="flex justify-between">
                  <Link to={`/manga/${manga._id}`} className="btn btn-primary py-1 px-3">
                    View
                  </Link>
                  
                  {deleteConfirm === manga._id ? (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDelete(manga._id)}
                        className="btn bg-red-600 hover:bg-red-700 text-white py-1 px-3"
                      >
                        Confirm
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(null)}
                        className="btn btn-outline py-1 px-3"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setDeleteConfirm(manga._id)}
                      className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900 py-1 px-3"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 