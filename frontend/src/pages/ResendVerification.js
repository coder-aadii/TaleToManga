import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      setStatus('submitting');
      setError(null);
      
      const res = await axios.post('/api/auth/resend-verification', { email });
      
      setStatus('success');
      setMessage(res.data.message);
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.error || 'Failed to resend verification email');
    }
  };
  
  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto">
        <div className="card p-8">
          <div className="text-center">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Verification Email Sent!</h2>
            <p className="mb-6">{message || 'A new verification email has been sent. Please check your inbox.'}</p>
            <Link to="/login" className="btn btn-primary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-center mb-6">Resend Verification Email</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : 'Resend Verification Email'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResendVerification; 