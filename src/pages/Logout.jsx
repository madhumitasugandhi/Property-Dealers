// src/pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth/session/token
    localStorage.removeItem('auth_token');
    sessionStorage.clear();

    // Redirect to login
    navigate('/login');
  }, [navigate]);

  return <p>Logging you out...</p>;
};

export default Logout;
