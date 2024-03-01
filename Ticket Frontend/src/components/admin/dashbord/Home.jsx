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
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://funpass.io/api/admin/calculate-statistics/');
        setStatistics(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);
  const [apexOptions, setApexOptions] = useState({
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
      categories: []
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  });
  
  const [apexSeries, setApexSeries] = useState([
    { name: 'Sales', data: [] },
    { name: 'Users', data: [] }
  ]);
  
  useEffect(() => {
    fetchSalesAndUsersData();
  }, []);
  
  const fetchSalesAndUsersData = async () => {
    try {
      const response = await fetch('http://funpass.io/api/admin/sales_and_users_data/');
      if (response.ok) {
        const data = await response.json();
        const { salesData, usersData } = data;
  
        // Extract categories from the keys of salesData
        const categories = Object.keys(salesData);
  
        const salesSeries = Object.values(salesData);
        const usersSeries = Object.values(usersData);
  
        setApexOptions(prevOptions => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: categories
          }
        }));
  
        setApexSeries([
          { name: 'Sales', data: salesSeries },
          { name: 'Users', data: usersSeries }
        ]);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Check if categories are available before rendering the chart
  const isChartReady = apexOptions.xaxis.categories.length > 0;
  
  const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchTicketStatistics = async () => {
            try {
                const response = await axios.get('http://funpass.io/api/admin/ticket_statistics/');
                console.log(response.data)
                const pieData = {
                    series: Object.values(response.data),
                    options: {
                        chart: {
                            width: '100%',
                            type: 'pie',
                        },
                        labels: Object.keys(response.data),
                        theme: {
                            monochrome: {
                                enabled: true,
                            },
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    offset: -5,
                                },
                            },
                        },
                        dataLabels: {
                            formatter(val, opts) {
                                const name =
                                    opts.w.globals.labels[opts.seriesIndex];
                                return [name, val.toFixed(1) + '%'];
                            },
                        },
                        legend: {
                            show: false,
                        },
                    },
                };
                setChartData(pieData);
            } catch (error) {
                console.error('Error fetching ticket statistics:', error);
            }
        };

        fetchTicketStatistics();
    }, []);


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
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
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
              Dashboard
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Dashboard
          </Typography>
        </Box>
       
      </Box>

      
      <Grid container spacing={6} sx={{ px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 } ,maxWidth: '100%', margin:"0 !important", 
}}>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{padding:"0 !important", }}>
        <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}orientation="horizontal" variant="outlined">
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
        {statistics ? statistics.total_sales : 'Loading...'}
        </Typography>
        <Typography level="body-sm">Total Sales</Typography>
      </CardContent>
      
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{padding:"0 !important", }}>
        <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}orientation="horizontal" variant="outlined">
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
        {statistics ? statistics.total_orders : 'Loading...'}
                </Typography>
        <Typography level="body-sm">Total Order</Typography>
      </CardContent>
      
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{padding:"0 !important", }}>
        <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}orientation="horizontal" variant="outlined">
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
        {statistics ? statistics.total_users : 'Loading...'}
                </Typography>
        <Typography level="body-sm">Total Users</Typography>
      </CardContent>
      
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{padding:"0 !important", }}>
        <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}orientation="horizontal" variant="outlined">
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
        {statistics ? statistics.total_tickets : 'Loading...'}
        </Typography>
        <Typography level="body-sm">Total Tickets</Typography>
      </CardContent>
      
        </Card>
      </Grid>
      <Grid xs={12} md={6} lg={8}>
      <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}>
      <CardContent>
        <Typography level="h3" component="h2" fontSize={20}>
          Website Users
        </Typography>
      </CardContent>
      {isChartReady ? (
      <ReactApexChart options={apexOptions} series={apexSeries} type="area" height={350} />
    ) : (
      <p>Loading chart...</p>
    )}
      </Card>
      </Grid>
      <Grid xs={12} md={6} lg={4}>
        <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}>
        <CardContent>
        <Typography level="h3" component="h2" fontSize={20}>
          Tickets Status
        </Typography>
      </CardContent>
      {chartData && (
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="pie"
                />
            )}
        </Card>
      </Grid>
      <Grid xs={12} md={12} lg={12}>
         <Card sx={{marginRight:'1rem',marginBottom:'1rem'}}>
         <CardContent>
          <Typography level="h3" component="h2" fontSize={20}>
           News Tickets
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
       fontSize={12} textAlign="right" 
      component={Link}
       href="all-tickets/"
       sx={{
        '&:hover': {
          textDecorationLine: 'none',
        },
      }}
                  >
           View All
      </Typography>
        </Card>
      </Grid>
      
    </Grid>
    </Box>
  )
}
