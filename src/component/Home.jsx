import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    const storedName = localStorage.getItem('fullName');
    if (storedName) {
      setUsername(storedName);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    navigate('/login');
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Welcome{username ? `, ${username}` : ''}</h1>
      <p className="mt-4">You have successfully logged in.</p>
      <button
        onClick={handleLogout}
        className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
