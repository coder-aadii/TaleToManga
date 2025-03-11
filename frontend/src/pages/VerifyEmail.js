import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [error, setError] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    let isSubscribed = true;
    
    const verifyEmail = async () => {
      const token = new URLSearchParams(location.search).get('token');
      
      if (!token) {
        if (isSubscribed) {
          setVerificationStatus('failed');
          setError('Verification token is missing');
        }
        return;
      }
      
      // Check if we've already verified this token in this session
      const verifiedToken = sessionStorage.getItem('verifiedToken');
      if (verifiedToken === token) {
        if (isSubscribed) {
          setVerificationStatus('success');
        }
        return;
      }
      
      try {
        await axios.get(`/api/auth/verify-email/${token}`);
        if (isSubscribed) {
          setVerificationStatus('success');
          // Store the verified token in session storage
          sessionStorage.setItem('verifiedToken', token);
        }
      } catch (err) {
        if (isSubscribed) {
          setVerificationStatus('failed');
          setError(err.response?.data?.error || 'Verification failed');
        }
      }
    };
    
    verifyEmail();
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isSubscribed = false;
    };
  }, [location]);
  
  const renderContent = () => {
    switch (verificationStatus) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-lg">Verifying your email...</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Email Verified Successfully!</h2>
            <p className="mb-6">Your email has been verified. You can now log in to your account.</p>
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
          </div>
        );
      
      case 'failed':
        return (
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
            <p className="mb-2 text-red-600">{error}</p>
            <p className="mb-6">Please try again or request a new verification email.</p>
            <Link to="/resend-verification" className="btn btn-primary">
              Resend Verification
            </Link>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="card p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyEmail; 