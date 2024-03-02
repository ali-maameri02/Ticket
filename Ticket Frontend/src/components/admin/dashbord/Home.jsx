import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Grid } from '@mui/material';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Avatar from '@mui/joy/Avatar';
import ReactApexChart from 'react-apexcharts';
import TimeAgo from '../utils/TimeAgo'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


export default function Home() {
  const { t } = useTranslation();
  const categories = [
    "2024-01-01T00:00:00.000Z",
    "2024-02-01T00:00:00.000Z",
    "2024-03-01T00:00:00.000Z",
    "2024-04-01T00:00:00.000Z",
    "2024-05-01T00:00:00.000Z",
    "2024-06-01T00:00:00.000Z",
    "2024-07-01T00:00:00.000Z",
    "2024-08-01T00:00:00.000Z",
    "2024-09-01T00:00:00.000Z",
    "2024-10-01T00:00:00.000Z",
    "2024-11-01T00:00:00.000Z",
    "2024-12-01T00:00:00.000Z",
  ];
  const [apexOptions, setApexOptions] = React.useState({
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: categories
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  });

  const [apexSeries, setApexSeries] = React.useState([
    {
      name: t('sales'),
      data: [150, 200, 120, 180, 160, 220, 200 ,234 ,243,223,342,754,353]
    },
    {
      name:t('users'),
      data: [80, 150, 200, 150, 120, 180, 140, 200, 150, 120,342,543,353]
    }
  ]);
   
  const storedLanguage = Cookies.get('i18next_lng');
  
    const chartData = {
      series: [20,40,40],
      options: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: [(t('blocking')), (t('in_progress')), (t('done'))],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        legend: {
          show: false
        }
      },
    
    
    };
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
   

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<>
              {storedLanguage === 'ar' ? (
                <ChevronLeftRoundedIcon fontSize="sm" />
              ) : (
                <ChevronRightRoundedIcon fontSize="sm" />
              )}
            </>}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="/admin/dashboard"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              {t('dashboard')}
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
          {t('dashboard')}
          </Typography>
        </Box>
       
      </Box>

      
      <Grid container spacing={6} sx={{ px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 } ,maxWidth: '100%', margin:"0 !important", 
}}>
     
     <Grid item xs={12} sm={12} md={6} lg={3} sx={{padding:"0 !important", }}>
        <Card sx={{ [storedLanguage === 'ar' ? 'ml' : 'mr']:'1rem',marginBottom:'1rem',flexDirection:[storedLanguage === 'ar' ? ' row-reverse' : 'row']}}orientation="horizontal" variant="outlined">
        <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png"
            srcSet="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h4" component="h3" fontSize={16}>
          12.3M
        </Typography>
        <Typography level="body-sm">{t('total')} {t('sales')}</Typography>
      </CardContent>
      
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{padding:"0 !important", }}>
        <Card sx={{ [storedLanguage === 'ar' ? 'ml' : 'mr']:'1rem',marginBottom:'1rem',flexDirection:[storedLanguage === 'ar' ? ' row-reverse' : 'row']}}orientation="horizontal" variant="outlined">
        <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_buy.png"
            srcSet="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_buy.png 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h4" component="h3" fontSize={16}>
          12.3M
        </Typography>
        <Typography level="body-sm">{t('total')} {t('orders')}</Typography>
      </CardContent>
      
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{padding:"0 !important", }}>
        <Card sx={{ [storedLanguage === 'ar' ? 'ml' : 'mr']:'1rem',marginBottom:'1rem',flexDirection:[storedLanguage === 'ar' ? ' row-reverse' : 'row']}}orientation="horizontal" variant="outlined">
        <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_users.png"
            srcSet="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_users.png 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h4" component="h3" fontSize={16}>
          12.3M
        </Typography>
        <Typography level="body-sm">{t('total')} {t('users')}</Typography>
      </CardContent>
      
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{padding:"0 !important", }}>
        <Card sx={{ [storedLanguage === 'ar' ? 'ml' : 'mr']:'1rem',marginBottom:'1rem' ,flexDirection:[storedLanguage === 'ar' ? ' row-reverse' : 'row']} }orientation="horizontal" variant="outlined">
        <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_message.png"
            srcSet="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_message.png 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h4" component="h3" fontSize={16}>
          12.3M
        </Typography>
        <Typography level="body-sm">{t('total')} {t('tickets')}</Typography>
      </CardContent>
      
        </Card>
      </Grid>
     
      <Grid xs={12} md={6} lg={8}>
      <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}>
      <CardContent>
        <Typography level="h3" component="h2" fontSize={20}>
          {t('website_users')}
        </Typography>
      </CardContent>
      <ReactApexChart options={apexOptions} series={apexSeries} type="area" height={300} />
      </Card>
      </Grid>
      <Grid xs={12} md={6} lg={4}>
        <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}>
        <CardContent>
        <Typography level="h3" component="h2" fontSize={20}>
          {t('tickets_status')}
        </Typography>
      </CardContent>
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie"   />
        </Card>
      </Grid>
      <Grid xs={12} md={12} lg={12}>
         <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}>
         <CardContent>
          <Typography level="h3" component="h2" fontSize={20}>
           {t('new_tickets')}
           </Typography>
          
           </CardContent>
           <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        <ListItem>
          <ListItemDecorator>
            <Avatar src="/static/images/avatar/1.jpg" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Summer Music Festival</Typography>
            <Typography level="body-sm" noWrap>
                Enjoy a weekend of live music performances from top artists.
            </Typography>
          </ListItemContent>
          <ListItemContent sx={{textAlign: 'end'}}>
            <Typography level="body-xs">
             <TimeAgo timestamp={new Date("Feb 03, 2024 12:00:00").getTime()} />
            </Typography>
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Avatar src="/static/images/avatar/1.jpg" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Summer Music Festival</Typography>
            <Typography level="body-sm" noWrap>
                Enjoy a weekend of live music performances from top artists.
            </Typography>
          </ListItemContent>
          <ListItemContent sx={{textAlign: 'end'}}>
            <Typography level="body-xs">
             <TimeAgo timestamp={new Date("Feb 03, 2024 12:00:00").getTime()} />
            </Typography>
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Avatar src="/static/images/avatar/1.jpg" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Summer Music Festival</Typography>
            <Typography level="body-sm" noWrap>
                Enjoy a weekend of live music performances from top artists.
            </Typography>
          </ListItemContent>
          <ListItemContent sx={{textAlign: 'end'}}>
            <Typography level="body-xs">
             <TimeAgo timestamp={new Date("Feb 03, 2024 12:00:00").getTime()} />
            </Typography>
          </ListItemContent>
        </ListItem>
      </List>
      <Typography level="body-xs" 
       fontSize={12} textAlign={'end'}
      component={Link}
       href="all-tickets/"
       sx={{
        '&:hover': {
          textDecorationLine: 'none',
        },
      }}
                  >
           {t('view_all')}
      </Typography>
        </Card>
      </Grid>
      
    </Grid>
    </Box>
  )
}
