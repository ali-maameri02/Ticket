import React from 'react'
import Card from '@mui/joy/Card';
import Typography  from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import { borderColor } from '@mui/system';

import { useTranslation } from 'react-i18next';
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer >
        <Card sx={{backgroundColor: 'white' ,borderRadius:"0" ,borderColor:'#dcdcdc61'}}>
            <Typography textAlign={'center'}>©{`${new Date().getFullYear()} TickPick LLC. ${t("all_rights")}`}</Typography>
            <Box sx={{textAlign:'center'}}>
            <Link><FacebookIcon sx={{color:"gray",margin:"0 1rem"}} /></Link>
            <Link><InstagramIcon sx={{color:"gray",margin:"0 1rem"}}/></Link>
            <Link><XIcon sx={{color:"gray",margin:"0 1rem"}} /></Link>
            </Box>
        </Card>
    </footer>
  )
}
