import React, { useState, Fragment } from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { useTranslation } from 'react-i18next';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PaymentIcon from '@mui/icons-material/Payment';
import ColorSchemeToggle from './ColorSchemeToggle';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import { closeSidebar } from './utils';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {  useNavigate  } from 'react-router-dom';
import ReactCountryFlag from "react-country-flag"
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import LanguageSwitcher from '../../../LanguageSwitcher';
import Cookies from 'js-cookie';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </Fragment>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const storedLanguage = Cookies.get('i18next_lng');
  const { t } = useTranslation();
  const authToken = localStorage.getItem('authToken');
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('sessionExpiration');
    navigate('/admin');
  };
  const translationDirection = storedLanguage === 'ar' ? '-100%' : '100%';

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        // right:[storedLanguage === 'ar' ? '-var(--Sidebar-width)' : 'ml'],
        transform: {
          xs: `translateX(calc(${translationDirection} * (var(--SideNavigation-slideIn, 0) - 1)))`,
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: storedLanguage === 'ar' 
                ? 'translateX(calc(-100% * (var(--SideNavigation-slideIn, 0) - 1) - var(--SideNavigation-slideIn, 0) * 100%))'
                : 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: storedLanguage === 'ar' ? 'translateX(100%)' : 'translateX(100%)',
          },
          
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-lg">Acme Co.</Typography>
        <ColorSchemeToggle sx={{ [storedLanguage === 'ar' ? 'mr' : 'ml']: 'auto' }}  />
        <LanguageSwitcher />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder={t('search')} />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
             role="menuitem"
             component={Link}
             to=""
             selected={location.pathname === '/admin/dashboard/'}>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">{t('dashboard')}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component={Link}
              to="payments"
              selected={location.pathname === '/admin/dashboard/payments/'}
            >
              <PaymentIcon />
              <ListItemContent>
                <Typography level="title-sm">{t('payments')}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ConfirmationNumberIcon />
                  <ListItemContent>
                    <Typography level="title-sm">{t('tickets')}</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton 
                  role="menuitem"
                  component={Link}
                  to="all-tickets"
                  selected={location.pathname === '/admin/dashboard/all-tickets/'}
                  >{t('all_tickets')}</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="blocking-tickets/"
                  selected={location.pathname === '/admin/dashboard/blocking-tickets/'}
                  >{t('blocking')}</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="progress-tickets"
                  selected={location.pathname === '/admin/dashboard/progress-tickets/'}
                  >{t('in_progress')}</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="done-tickets"
                  selected={location.pathname === '/admin/dashboard/done-tickets/'}>{t('done')}</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem>
            <ListItemButton
             role="menuitem"
             component={Link}
             to="events/"
             selected={location.pathname === '/admin/dashboard/events/'}
            >
              <EventIcon />
              <ListItemContent>
                <Typography level="title-sm">{t('events')}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              defaultExpanded
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">{t('users')}</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton 
                  role="menuitem"
                  component={Link}
                  to="my-profile/"
                  selected={location.pathname === '/admin/dashboard/my-profile/'}
                  >{t('my_profile')}</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="users"
                  selected={location.pathname === '/admin/dashboard/users/'}
                  >{t('users')}</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem>
            <ListItemButton
            role="menuitem"
            component={Link}
            to="settings"
            selected={location.pathname === '/admin/dashboard/settings/'}>
              <SettingsRoundedIcon />
              {t('settings')}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Siriwat K.</Typography>
          <Typography level="body-xs">siriwatk@test.com</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={handleLogout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
