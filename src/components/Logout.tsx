import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token here
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
