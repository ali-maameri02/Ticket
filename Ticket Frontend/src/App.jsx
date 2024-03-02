// App.jsx
import React from 'react';
import {Routes, Route , useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/admin/Admin';
import ErrorPage from './ErrorPage';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/dashbord/Dashbord';
import MyProfile from './components/admin/dashbord/MyProfile';
import Payments from './components/admin/dashbord/Payments';
import AllTikets from './components/admin/dashbord/AllTikets';
import BlockingTickets from './components/admin/dashbord/BlockingTickets';
import DoneTickets from './components/admin/dashbord/DoneTickets';
import ProgressTickets from './components/admin/dashbord/ProgressTickets';
import TicketDetails from './components/admin/dashbord/TicketDetails';
import Events from './components/admin/dashbord/Events';
import Users from './components/admin/dashbord/Users';
import Settings from './components/admin/dashbord/Settings';
import HomeAdmin from './components/admin/dashbord/Home';
import BlockingTicketsTable from './components/admin/dashbord/BlockingTicketsTable';
import DoneTicketsTable from './components/admin/dashbord/DoneTicketsTable';
import ProgressTicketsTable from './components/admin/dashbord/ProgressTicketsTable';
import PrivateRoutes from './components/admin/utils/PrivateRoutes';
import Landing from './components/Landing';
import SellTiketsDashboard from './components/SellTiketsDashboard';
import HomeSellTicket from './components/HomeSellTicket';
import ListingSellTicket from './components/ListingSellTicket';
import SalesSellTicket from './components/SalesSellTicket';



function App() {
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
        <Route  element={<Home />} >
         <Route index element={<Landing />} />
         <Route path="sell-tickets" element={<SellTiketsDashboard />}>
          <Route  index element ={<HomeSellTicket />}/>
          <Route path="listings" element ={<ListingSellTicket />}/>
          <Route path="sales" element ={<SalesSellTicket />}/>
         </Route>
        </Route>
        <Route path="admin" element={<Admin />}>
              <Route index element={<AdminLogin onLogin={handleLogin}/>}/>
              <Route 
              key={isAuthenticated}
              path="dashboard"
              element={<PrivateRoutes  Component={Dashboard} isAuthenticated={isAuthenticated} />}>
                  <Route path="payments" element={<Payments />} />
                  <Route path="my-profile" element={<MyProfile />} />
                  <Route path="all-tickets" element={<AllTikets />} />
                  <Route path="done-tickets" element={<DoneTickets />} >
                      <Route index element={<DoneTicketsTable />} />
                      <Route path=":id" element={<TicketDetails />} />
                  </Route>
                  <Route path="blocking-tickets" element={<BlockingTickets />}>
                      <Route index element={<BlockingTicketsTable />} />
                      <Route path=":id" element={<TicketDetails />} />
                  </Route>
                  <Route path="progress-tickets" element={<ProgressTickets />}>
                      <Route index element={<ProgressTicketsTable />} />
                      <Route path=":id" element={<TicketDetails />} />
                  </Route>
                  <Route path="events" element={<Events />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="users" element={<Users />} />
                  <Route index element={<HomeAdmin />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    
  );
}

export default App;