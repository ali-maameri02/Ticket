// Admin.jsx
import React from 'react';
import AdminLogin from './AdminLogin';
import Dashbord from './dashbord/Dashbord';
import { BrowserRouter as Router, Routes, Route,Navigate, useNavigate ,Outlet } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoutes';


import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';



const theme = createTheme();


export default function Admin() {


  return (
    <ThemeProvider theme={theme}>
      <Outlet />
     
    </ThemeProvider>
  );
}
