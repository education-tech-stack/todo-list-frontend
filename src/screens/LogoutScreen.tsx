import { useEffect } from 'react';
import React, { useNavigate } from 'react-router-dom';

function LogoutScreen(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('authToken');
    navigate('/login');
  }, []);

  return <div>Logging out...</div>;
}

export default LogoutScreen;
