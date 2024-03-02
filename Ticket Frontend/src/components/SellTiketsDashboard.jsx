import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import  Card from '@mui/joy/Card';
import Grid from '@mui/joy/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { textAlign } from '@mui/system';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link, Outlet } from 'react-router-dom';

export default function SellTiketsDashboard() {
  const [isMediumScreen, setIsMediumScreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 900); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);
  const { t } = useTranslation();
  const storedLanguage = Cookies.get('i18next_lng');
  return (
    <>
    <Box>
        <Container maxWidth="xl"  sx={{pt:"5rem" , pb:"5rem"}}>
            <Grid container  spacing={6} sx={{ maxWidth: '100%', margin:"0 !important" , justifyContent:'space-between'}}>
            <Grid item xs={12} sm={6} md={4}  lg={4} sx={{padding:"0 !important" ,position :isMediumScreen ? 'fixed' :'inherit', bottom : isMediumScreen ?'0':'auto' ,zIndex:"1" }}>
                <Card sx={{mr : storedLanguage === "ar" ? 'auto' : '1rem',ml: storedLanguage === "ar" ? '1rem' : 'auto'}} >
                <nav aria-label="main mailbox folders">
        <List sx={{display:isMediumScreen ? 'flex':'inherit'}}>
          <ListItem disablePadding>
            <ListItemButton  component={Link}  to="" selected={location.pathname === '/sell-tickets'} >
              <ListItemIcon sx={{minWidth:"2rem"}}>
                <HomeIcon  sx={{backgroundColor:"#ffb222"  , color: '#FFFf' , borderRadius:"50rem" ,p:"0.1rem" }} />
              </ListItemIcon>
              <ListItemText   sx={{textAlign:storedLanguage==='ar'?"start":"auto"}} >
                {t('home') }
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link}  to="listings" selected={location.pathname === '/sell-tickets/listings'}  >
              <ListItemIcon sx={{minWidth:"2rem"}}>
                <SellIcon sx={{backgroundColor:"#ff0066"  , color: '#FFFf' , borderRadius:"50rem" ,p:"0.1rem" }} />
              </ListItemIcon>
              <ListItemText primary={t("listings")}   sx={{textAlign:storedLanguage==='ar'?"start":"auto"}} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link}  to="sales" selected={location.pathname === '/sell-tickets/sales'} >
              <ListItemIcon sx={{minWidth:"2rem"}}>
                <AttachMoneyIcon sx={{backgroundColor:"green"  , color: '#FFFf' , borderRadius:"50rem" ,p:"0.1rem" }} />
              </ListItemIcon>
              <ListItemText primary={t("sales")}   sx={{textAlign:storedLanguage==='ar'?"start":"auto"}}/>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider sx={{display : isMediumScreen ? 'none':'block'}} />
      <Box sx={{display : isMediumScreen ? 'none':'block'}}> 
      <nav aria-label="secondary mailbox folders" >
        <List>
          <ListItem disablePadding>
            <ListItemButton  component={Link}  to="/contect"  >
            <ListItemIcon sx={{minWidth:"2rem"}}>
                <LocalPhoneIcon sx={{backgroundColor:"yellow"  , color: '#FFFf' , borderRadius:"50rem" ,p:"0.1rem" }} />
              </ListItemIcon>
              <ListItemText primary={t("contact_us")} sx={{textAlign:storedLanguage==='ar'?"start":"auto"}} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      </Box>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} sx={{padding:"0 !important" }}>
            <Card sx={{mr : storedLanguage === "ar" ? '1rem' : 'auto',ml: storedLanguage === "ar" ? 'auto' : '1rem'
                 ,border:'none' ,background:'none' ,padding:"0"}}>
                    <Outlet />
            </Card>
            </Grid>
            </Grid>
        </Container>
    </Box>
    </>
  )
}
