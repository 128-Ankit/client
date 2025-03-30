import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem('user'));
  },[]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Build Your Professional Portfolio Effortlessly</h1>
      <p className="text-lg text-gray-700 mb-6">Create stunning portfolios with ease and showcase your skills to the world.</p>
      <div className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{
        user?(<Link to="/templates" >Get Started.</Link>):(<Link to="/register" >Get Started.</Link>)
      }</div>
    </div>
  );
};

export default Home;