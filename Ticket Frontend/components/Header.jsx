import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/joy/Drawer';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/material/Divider';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Pages } from './Navpage';
import Login from './Login';
const pages = ['Products', 'Pricing', 'Blog'];

export default function Header() {
  const [open, setOpen] = React.useState(false);


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className = 'header ps-5 pe-5' sx={{backgroundColor:'transparent'}}>
      <Container maxWidth="xl" className='p-0'>
        <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                <img src="../src/assets/Tickpick_black_flat.png" alt="Tickpick_black_flat" 
          className='logo '  />
            </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpen(true)}
              color="#3399ff"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer open={open} onClose={() => setOpen(false)} className="sidebar" >
              <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom : '1rem'
            
          }}
        >
          <Box sx={{ mr: 1 }}>
                <img src="../src/assets/Tickpick_black_flat.png" alt="Tickpick_black_flat" 
                className='logo'  />
            </Box>
          <ModalClose id="close-icon" sx={{ position: 'initial' }} />
              </Box>
              <Divider />
             <List
          size="lg"
          component="nav"
          sx={{
            flex: 'none',
            fontSize: 'xl',
            '& > div': { justifyContent: 'start' },
          }}
        >
          <AccordionGroup sx={{ maxWidth: 400 }}>
          {Pages.map((page ) => ( 
             <Accordion key={page} >
                <ListItemButton sx={{ '&:hover': { backgroundColor: 'transparent !important' } }}>
                     <AccordionSummary sx={{ '&:hover': { backgroundColor: 'transparent !important' } }} >{page.title}</AccordionSummary> 
                     </ListItemButton>
                <AccordionDetails>
                {page.pages && page.pages.map((subPage) => (
              <ListItemButton key={subPage.title} sx={{ '&:hover': { backgroundColor: 'transparent !important' } }}>
                {subPage.title}
              </ListItemButton>
            ))}
                </AccordionDetails>
            </Accordion>
              ))}
          </AccordionGroup>
        </List>
      </Drawer>
          <Box className='ms-5' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 , flexGrow: 1,}}>
                <img src="../src/assets/Tickpick_black_flat.png" alt="Tickpick_black_flat" 
          className='logo '  />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Login />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
