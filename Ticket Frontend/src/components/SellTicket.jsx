import React from 'react'
import Button from '@mui/joy/Button';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
export default function SellTicket() {
 
  const { t } = useTranslation();
  const storedLanguage = Cookies.get('i18next_lng');
  return (
    <>
    <Link to="sell-tickets" style={{ textDecoration: 'none' }}>
    <Button  variant="plain" sx={{ backgroundColor: '#02dba4', boxShadow: '0 2px 8px rgb(27 39 51 / 15%)', borderRadius: '300px !important', color: "white" , ml:"0.5rem",mr:"0.5rem",  transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#00a57b', 
    },}}>
        
        {t("sell_tickets")}
      </Button>
      </Link>
    </>
  )
}
