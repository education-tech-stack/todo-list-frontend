import { useNavigate } from 'react-router-dom';

import { Button } from '@chakra-ui/react';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token here
    navigate('/login');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
