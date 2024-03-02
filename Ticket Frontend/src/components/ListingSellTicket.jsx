import React from 'react'
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Card from '@mui/joy/Card';
import  Link  from '@mui/joy/Link';
export default function ListingSellTicket() {
  const { t } = useTranslation();
  const storedLanguage = Cookies.get('i18next_lng');
  return (
    <>
    <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: "1rem" }} textAlign="center">
    <Typography variant='h5' sx={{ mb: "1rem" }}>{t('listings')}</Typography>
    <Link  href="/sell-tickets" style={{
    backgroundColor: '#3399ff',
    borderRadius: '300px',
    color: "white",
    transition: 'all 0.3s ease-in-out',
    textDecoration: 'none',
    padding: '10px 20px', 
    display: 'inline-block',
    '&:hover': {
        backgroundColor: '#2370bd',
    },
}}>
    {t("add_tickets")}
</Link>
    </Box>
    {/* <Box>
      <Card  sx={{display:'flex', flexDirection:'row' , background:"radial-gradient(circle, rgba(63,94,251,0.6530987394957983) 0%, rgba(252,70,107,0.5718662464985995) 99%)"}}>
        <Box>
        <img src="https://static.tickpick.com/content/tp/sell/sq_wh_sad.svg" class="sadFace" alt="sad face no listings showed up"  />
        </Box>
        <Typography  display={'flex'} flexDirection={'column'} justifyContent={'space-between'} sx={{ mb: "1rem" }}>
        <Typography level='h3'>{t('no_active_listings')}</Typography>
        <Typography level="body-sm">{t('add_tickets_and_create_a_listing_to_get_started')}</Typography>
        </Typography>
      </Card>
    </Box> */}
    <Box>
      
    </Box>

    </>
  )
}
