import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MangaProvider } from './context/MangaContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateManga from './pages/CreateManga';
import ViewManga from './pages/ViewManga';
import NotFound from './pages/NotFound';
import VerifyEmail from './pages/VerifyEmail';
import ResendVerification from './pages/ResendVerification';

// Set base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Add auth token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MangaProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/resend-verification" element={<ResendVerification />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/create" 
                    element={
                      <PrivateRoute>
                        <CreateManga />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/manga/:id" 
                    element={
                      <PrivateRoute>
                        <ViewManga />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </MangaProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App; 