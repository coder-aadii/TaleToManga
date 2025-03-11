import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="font-manga text-xl text-primary-600 dark:text-primary-400">
              TaleToManga
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Transform your stories into manga with AI
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
              Dashboard
            </Link>
            <a 
              href="https://github.com/yourusername/TaleToManga" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} TaleToManga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 