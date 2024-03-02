import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './components/admin/utils/i18n'; 
import Cookies from 'js-cookie';
import ReactCountryFlag from "react-country-flag";
import Button from '@mui/material/Button';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const storedLanguage = Cookies.get('i18next_lng');
console.log(storedLanguage);

  React.useEffect(() => {
    document.documentElement.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [storedLanguage]);


  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    Cookies.set('i18next_lng', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  };
  const { t } = useTranslation();
  return (
    <div>
<Dropdown>
        <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'outlined' } }}
        sx={{minWidth:'2rem',minHeight:"2rem"}}
      >
        <ReactCountryFlag 
        countryCode={storedLanguage === 'ar' ? 'SA' : 'US'} 
        svg title={storedLanguage === 'ar' ? 'SA' : 'US'} />
        </MenuButton>
        <Menu sx={{ zIndex: 10001, backgroundColor: 'var(--joy-palette-background-surface)',}} >
        <MenuItem onClick={() => changeLanguage('en')}>
          <ReactCountryFlag
                countryCode="US"
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title="US" 
               />
               {t('english')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('ar')}> 
        <ReactCountryFlag
                countryCode="SA"
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title="US" 
               />
                {t('arabic')}
        </MenuItem>
        </Menu>
        </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
