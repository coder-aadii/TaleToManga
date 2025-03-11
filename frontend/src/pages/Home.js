import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-manga text-primary-600 dark:text-primary-400">
            Transform Your Stories Into Manga
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
            TaleToManga uses AI to convert your written stories into beautiful manga-style comic panels.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/create" className="btn btn-primary text-center text-lg px-8 py-3">
                Create Your Manga
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary text-center text-lg px-8 py-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline text-center text-lg px-8 py-3">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Example Manga */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-manga text-gray-800 dark:text-gray-200">
            From Words to Visuals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((panel) => (
              <div key={panel} className="manga-panel aspect-[3/4] overflow-hidden">
                <img 
                  src={`https://res.cloudinary.com/deoegf9on/image/upload/v1741708472/manga1_ksdoae.webp?text=Manga+Panel+${panel}`} 
                  alt={`Example manga panel ${panel}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-manga text-gray-800 dark:text-gray-200">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-primary-600 dark:text-primary-400 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Write Your Story</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start with your story or idea. Our AI will analyze your text and create manga panels that match your narrative.
              </p>
            </div>
            
            <div className="card">
              <div className="text-primary-600 dark:text-primary-400 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Transformation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI technology converts your text into authentic manga-style panels with appropriate visual elements.
              </p>
            </div>
            
            <div className="card">
              <div className="text-primary-600 dark:text-primary-400 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Share Your Manga</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download, share, or keep your manga creations private. Build a collection of your manga stories.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-12 bg-primary-600 dark:bg-primary-800 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-manga">
            Ready to Create Your Manga?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join TaleToManga today and start transforming your stories into visual manga art.
          </p>
          {isAuthenticated ? (
            <Link to="/create" className="btn bg-white text-primary-700 hover:bg-gray-100 text-center text-lg px-8 py-3">
              Create Now
            </Link>
          ) : (
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100 text-center text-lg px-8 py-3">
              Sign Up Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 