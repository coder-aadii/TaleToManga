import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import ThemeContext from '../../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const authLinks = (
    <>
      <li className="px-4 py-2 md:py-0">
        <Link 
          to="/dashboard" 
          className="block hover:text-primary-500"
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </Link>
      </li>
      <li className="px-4 py-2 md:py-0">
        <Link 
          to="/create" 
          className="block hover:text-primary-500"
          onClick={() => setIsMenuOpen(false)}
        >
          Create Manga
        </Link>
      </li>
      <li className="px-4 py-2 md:py-0">
        <button 
          onClick={handleLogout}
          className="block w-full text-left hover:text-primary-500"
        >
          Logout
        </button>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="px-4 py-2 md:py-0">
        <Link 
          to="/login" 
          className="block hover:text-primary-500"
          onClick={() => setIsMenuOpen(false)}
        >
          Login
        </Link>
      </li>
      <li className="px-4 py-2 md:py-0">
        <Link 
          to="/register" 
          className="block hover:text-primary-500"
          onClick={() => setIsMenuOpen(false)}
        >
          Register
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-manga text-2xl text-primary-600 dark:text-primary-400">
                TaleToManga
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <ul className="flex space-x-4">
              {isAuthenticated ? authLinks : guestLinks}
              <li className="px-4">
                <button 
                  onClick={toggleDarkMode}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </li>
            </ul>
          </div>
          
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleDarkMode}
              className="p-1 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 