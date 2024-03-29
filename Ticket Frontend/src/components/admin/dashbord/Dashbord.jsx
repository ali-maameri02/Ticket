// Dashbord.jsx 
import * as React from 'react';
import { CssVarsProvider  } from '@mui/joy/styles';
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID
} from "@mui/material/styles";
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './Sidebar';
import Header from './Header';
import Home from './Home';
import Payments from './Payments';
import MyProfile from './MyProfile';
import AllTickets from './AllTikets';
import BlockingTickets from './BlockingTickets';
import DoneTickets from './DoneTickets';
import ProgressTickets from './ProgressTickets';
import Events from './Events';
import Settings from './Settings';
import Users from './Users';
import TicketDetails from './TicketDetails';


import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

export default function Dashboard() {
  const materialTheme = extendMaterialTheme();
  return (
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
    
       <CssVarsProvider >

       <CssBaseline  />

      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow:'auto'
          }}
        >
          <Outlet />
        
        </Box>
       
      </Box>

      </CssVarsProvider> 

      </MaterialCssVarsProvider>
   
  );
}