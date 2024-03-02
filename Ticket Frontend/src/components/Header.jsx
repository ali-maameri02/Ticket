import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/material/Divider';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import ListItem from '@mui/joy/ListItem';
// import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
// import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { Pages } from './Navpage';
import Login from './Login';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import SellTicket from './SellTicket';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/joy/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import axios from 'axios';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

export default function Header() {
  const [userData, setUserData] = React.useState([]);
  const apiUrl = "http://127.0.0.1:8000/";
  const getCSRFToken = () => {
    const csrfTokenElement = document.getElementsByName('csrfmiddlewaretoken')[0];
    return csrfTokenElement ? csrfTokenElement.value : null;
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const csrfToken = getCSRFToken(); 
      const response = await axios.get(`${apiUrl}/api/users/get-user-data/`, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Authorization': `Token ${localStorage.getItem('authTokenUser')}`,
        },
      });

      const userInfo = response.data.user_info;
      setUserData(userInfo);

      console.log('User Data:', response.data.user_info);
      console.log(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const storedLanguage = Cookies.get('i18next_lng');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  const [scrolling, setScrolling] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const isTop = window.scrollY < 50;
      if (!isTop) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  React.useEffect(() => {
    const authTokenUser = localStorage.getItem('authTokenUser');
    if (authTokenUser) {
      setIsAuthenticated(true); 
    }
  }, []);

  const isSellTicketsRoute = location.pathname === '/sell-tickets' || location.pathname.startsWith("/sell-tickets/");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAvatar = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position={scrolling ? 'fixed' : 'fixed'} className={`header ps-5 pe-5 ${scrolling ? 'scrolled' : ''}`} sx={{ backgroundColor: scrolling ? '#fff' : 'transparent' , transition: 'background-color 0.3s ease, position 0.3s ease', }}>
      <Container maxWidth="xl" className='p-0'>
        <Toolbar disableGutters >
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,flexGrow: isSellTicketsRoute ? "1" : "0" }}>
              <a href="/"> <img src="../src/assets/Tickpick_black_flat.png" alt="Tickpick_black_flat" 
          className='logo '  /></a>
               
            </Box>
            {!isSellTicketsRoute && (
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
          </Box>)}
          {!isSellTicketsRoute && (
          <Drawer open={open} onClose={() => setOpen(false)} className="sidebar" 
          sx={{ '--drawer-left': storedLanguage === "ar" ? 'auto' : '0',
          '--left': storedLanguage === "ar" ? 'calc(100% + var(--Drawer-horizontalSize)) ' : '0 ',
          '--transform': storedLanguage === "ar" ? ' 100%' : '-100%'
        }}
       >
        
              <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom : '1rem',
            
            
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
             <Accordion key={page}  >
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
          </Drawer>)}
          {!isSellTicketsRoute && (
          <Box className='ms-3' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <List sx={{flexDirection:'row'}}>
                {Pages.map((page)=>(
                      <ListItem key={page} sx={{p:"0 !important"}}> 
                         <Dropdown>
                            <MenuButton variant="plain" size="sm" sx={{'&:hover': { backgroundColor: 'transparent !important' ,color :'#3399ff' }}}>{page.title}</MenuButton>
                            <Menu sx={{boxShadow : 'none'}} size="sm">
                              {page.pages && page.pages.map((subPage)=>(
                              <MenuItem sx={{ '&:hover': { backgroundColor: 'transparent !important' ,color :'#3399ff'}}} key={subPage.title}>{subPage.title}</MenuItem>
                              ))}
                            </Menu>
                          </Dropdown>
                      </ListItem>
                ))}
              </List>
          </Box>
          )}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 , flexGrow: 1,}}>
                <img src="../src/assets/Tickpick_black_flat.png" alt="Tickpick_black_flat" 
          className='logo '  />
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
          {!isSellTicketsRoute && (
           <SellTicket />
          )}
          {!isAuthenticated && (
            <Login />
          )}
          {isAuthenticated &&(
            <>
            <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={openAvatar ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
               <Avatar  variant="solid"  sx={{ width: 32, height: 32 }} alt={userData?.username ? userData.username.toUpperCase() : ''}/>
            </IconButton>
          </Tooltip>
                <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openAvatar}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose} sx={{gap:"0.5rem",pt:'0'}}>
                <ConfirmationNumberIcon sx={{backgroundColor:"green"  , color: '#FFFf' , borderRadius:"50rem" ,p:"0.1rem"}} />
                {t('orders')}
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{gap:"0.5rem",pt:'0'}}>
                  <LocalAtmIcon sx={{backgroundColor:"#3399ff"  , color: '#FFFf' , borderRadius:"50rem" ,p:"0.1rem"}}  />
                 {t("my_credit")}
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{gap:"0.5rem",pt:'0'}}>
                  <TroubleshootIcon sx={{backgroundColor:"orange"  , color: '#FFFf' , borderRadius:"50rem" ,p:"0.1rem"}}  />
                 {t("tracked_events")}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{pt:'0'}}>
                  {t('dashboard')}
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{pt:'0'}}>
                  {t('sales')}
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{pt:'0'}}>
                  {t('logout')}
                </MenuItem>
              </Menu>
              </>
          )}
          </Box>
          <Box sx={{ flexGrow: 0 , mr: 1 ,ml:1}}>
          <LanguageSwitcher />
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  )
}
