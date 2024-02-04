import React from 'react';
import AdminLogin from './AdminLogin';
import Dashbord from './dashbord/Dashbord';
import { BrowserRouter as Router, Routes, Route,Navigate, useNavigate  } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoutes';

export default function Admin() {
  const authToken = localStorage.getItem('authToken');
  const initialIsAuthenticated = authToken !== null;
  
  const [isAuthenticated, setAuthenticated] = React.useState(initialIsAuthenticated);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuthentication = () => {
      const storedToken = localStorage.getItem('authToken');
      const sessionExpiration = localStorage.getItem('sessionExpiration');

      if (storedToken && sessionExpiration) {
        const expirationTime = parseInt(sessionExpiration, 10);
        const currentTime = new Date().getTime();

        if (currentTime < expirationTime) {
          setAuthenticated(true);
        } else {
          handleLogout(); // Session has expired, log the user out
        }
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = () => {
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem('sessionExpiration', expirationTime.toString());

      setAuthenticated(true);
      navigate('/admin/dashboard');
    } else {
      console.error('No token stored in localStorage');
    }
  };

 const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('sessionExpiration');
    setAuthenticated(false);
    navigate('/');
  };

  return (
   
      <Routes>
        <Route index path="/" element={<AdminLogin onLogin={handleLogin} />} />
       
       
        <Route
          key={isAuthenticated}
          path="/dashboard/*"
          element={<PrivateRoute  Component={Dashbord} isAuthenticated={isAuthenticated} />}
        />
      
      </Routes>
    
  );
}
