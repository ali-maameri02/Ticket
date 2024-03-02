import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Typography from '@mui/joy/Typography';
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/joy/Input";
import Grid  from '@mui/material/Grid';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Login from './Login';
const events = [
    {   id:"101",
        title: 'Music Festival',
        datetime: '2024-05-20 18:00:00',
        deadline: '2024-05-18 12:00:00',
        description: 'A two-day music festival featuring various artists.',
        place: 'Stadium',
        cover_picture: 'event_covers/music_festival.jpg',
        stadium_id: 3,
        theater_id: null,
    },
    {   id :"102",
        title: 'Dance Competition',
        datetime: '2024-07-12 14:00:00',
        deadline: '2024-07-10 12:00:00',
        description: 'An annual dance competition showcasing talent from around the world.',
        place: 'Theater',
        cover_picture: 'event_covers/dance_competition.jpg',
        stadium_id: null,
        theater_id: 4,
    },
    {   
        id :"103",
        title: 'Stand-up Comedy Show',
        datetime: '2024-09-05 20:00:00',
        deadline: '2024-09-03 12:00:00',
        description: 'An evening filled with laughter featuring top comedians.',
        place: 'Theater',
        cover_picture: 'event_covers/comedy_show.jpg',
        stadium_id: null,
        theater_id: 5,
    },
  ]
  
export default function Landing() {
    let Background = "src/assets/tickets.jpg"
    const { t } = useTranslation();
    const storedLanguage = Cookies.get('i18next_lng');
  return (
    <>
        
         <Box sx={{ backgroundImage: `url(${Background})` , backgroundRepeat:'no-repeat',backgroundSize:'cover',
          backgroundPosition: 'center'}} >
         <Container maxWidth="sm"  sx={{pt:"10rem" , pb:"10rem"}}>
         <Typography level="h1" sx={{textAlign:'center' ,color:'#083052',mb:"1rem"}}>{t("get_tickets")}</Typography>
         <Typography level="body-lg" sx={{textAlign:'center' ,color:'dimgray' ,mb:"1rem"}}>{t("discover_events")}</Typography>
         <Input
          size="sm"
          placeholder={t('search_events')}
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
         </Container>

         </Box>
         <Box >
         <Container maxWidth="sm"  sx={{pt:"4rem" , pb:"4rem"}}>
         <Typography level="h1" sx={{textAlign:'center' ,color:'#083052',mb:"1rem"}}>{t("upcoming_events")}</Typography>
         <Typography level="body-lg" sx={{textAlign:'center' ,color:'dimgray' ,mb:"1rem"}}>{t("hottest_events")}</Typography>
         </Container>
         <Grid container spacing={6} sx={{ px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 } ,maxWidth: '100%', margin:"0 !important"}}>
            {events.map((event) => (
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{padding:"0 !important" }}>
                <Card sx={{margin:"1rem",}}>
                <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    src={`${Background}`}
                     loading="lazy"
                     alt=""
                    />
                </AspectRatio>
      
                <div>
                    <Typography level="title-lg" textAlign={'center'}>{event.title}</Typography>
                    <Typography level="body-sm" textAlign={'center'}>{event.datetime}</Typography>
                </div>
                <CardContent orientation="horizontal">
                    <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: [storedLanguage ==="ar" ?'0' :'auto'] ,mr: [storedLanguage === "ar" ?'auto' :'0'], alignSelf: 'center', fontWeight: 600 }}
                    >
                    {t("buy")}
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            ))}
            
         </Grid>
         </Box>
         <Box >
         <Container maxWidth="sm"  sx={{pt:"10rem" , pb:"5rem"}}>
         <Typography level="h1" sx={{textAlign:'center' ,color:'#083052',mb:"1rem"}}>{t("music_sports_theater")}</Typography>
         <Typography level="body-lg" sx={{textAlign:'center' ,color:'dimgray' ,mb:"1rem"}}>{t("the_best_tickets")}</Typography>
         <Box sx={{textAlign:"center"}}>
          <Login justlogin="true" />
         </Box>
         </Container>
         </Box>
       
    </>
  )
}
