import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return <div className="min-h-screen bg-black flex items-center justify-center text-white">Redirecting to Dashboard...</div>;
};

export default Login;
