import * as React from 'react';
import Avatar from "@mui/joy/Avatar";
import { useParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Grid  from '@mui/joy/Grid';
import dayjs from 'dayjs';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import CardContent from '@mui/joy/CardContent';
import { Document, Page } from 'react-pdf';
import file from "./ticket1.pdf"
import Button from '@mui/joy/Button'
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
const tickets = [
    {
      id: "1",
      event_id: "101",
      quantity: "2",
      status: "Accepted",
      sold: "true",
      Row: "A",
      Section: "Front",
      buyer_id: "201",
      document: "ticket1.pdf",
      price: "50",
      date_added: "2024-01-01T08:00:00Z",
      seller: {
        initial: "S",
        name: "Sarah Johnson",
        email: "sarah@example.com"
      },
      buyer: {
        initial: "M",
        name: "Michael Smith",
        email: "michael@example.com"
      }
    },
    {
      id: "2",
      event_id: "102",
      quantity: "1",
      status: "Progress",
      sold: "true",
      Row: "B",
      Section: "Balcony",
      buyer_id: "202",
      document: "ticket_documents/ticket2.pdf",
      price: "60",
      date_added: "2024-01-02T09:00:00Z",
      seller: {
        initial: "J",
        name: "John Doe",
        email: "john@example.com"
      },
      buyer: {
        initial: "E",
        name: "Emma Brown",
        email: "emma@example.com"
      }
    },
    {
      id: "3",
      event_id: "103",
      quantity: "3",
      status: "Refused",
      sold: "false",
      Row: "C",
      Section: "Main Hall",
      buyer_id: null,
      document: "ticket_documents/ticket3.pdf",
      price: "70",
      date_added: "2024-01-03T10:00:00Z",
      seller: {
        initial: "R",
        name: "Robert Wilson",
        email: "robert@example.com"
      },
      buyer: null
    },
    {
      id: "4",
      event_id: "104",
      quantity: "2",
      status: "Accepted",
      sold: "true",
      Row: "D",
      Section: "Side",
      buyer_id: "204",
      document: "ticket_documents/ticket4.pdf",
      price: "80",
      date_added: "2024-01-04T11:00:00Z",
      seller: {
        initial: "A",
        name: "Alice Johnson",
        email: "alice@example.com"
      },
      buyer: {
        initial: "B",
        name: "Bob Brown",
        email: "bob@example.com"
      }
    },
    {
      id: "5",
      event_id: "105",
      quantity: "4",
      status: "Accepted",
      sold: "true",
      Row: "E",
      Section: "Back",
      buyer_id: "205",
      document: "ticket_documents/ticket5.pdf",
      price: "90",
      date_added: "2024-01-05T12:00:00Z",
      seller: {
        initial: "C",
        name: "Charlie Wilson",
        email: "charlie@example.com"
      },
      buyer: {
        initial: "D",
        name: "David Smith",
        email: "david@example.com"
      }
    },
    {
      id: "6",
      event_id: "106",
      quantity: "1",
      status: "Refused",
      sold: "false",
      Row: "F",
      Section: "Balcony",
      buyer_id: null,
      document: "ticket_documents/ticket6.pdf",
      price: "100",
      date_added: "2024-01-06T13:00:00Z",
      seller: {
        initial: "E",
        name: "Emma Johnson",
        email: "emma@example.com"
      },
      buyer: null
    },
    {
      id: "7",
      event_id: "107",
      quantity: "3",
      status: "Accepted",
      sold: "false",
      Row: "G",
      Section: "Main Hall",
      buyer_id: null,
      document: "ticket_documents/ticket7.pdf",
      price: "110",
      date_added: "2024-01-07T14:00:00Z",
      seller: {
        initial: "F",
        name: "Frank Brown",
        email: "frank@example.com"
      },
      buyer: null
    },
    {
      id: "8",
      event_id: "108",
      quantity: "2",
      status: "Accepted",
      sold: "true",
      Row: "H",
      Section: "Front",
      buyer_id: "208",
      document: "ticket_documents/ticket8.pdf",
      price: "120",
      date_added: "2024-01-08T15:00:00Z",
      seller: {
        initial: "G",
        name: "Grace Wilson",
        email: "grace@example.com"
      },
      buyer: {
        initial: "H",
        name: "Harry Smith",
        email: "harry@example.com"
      }
    },
    {
      id: "9",
      event_id: "109",
      quantity: "1",
      status: "Accepted",
      sold: "false",
      Row: "I",
      Section: "Side",
      buyer_id: null,
      document: "./ticket1.pdf",
      price: "130",
      date_added: "2024-01-09T16:00:00Z",
      seller: {
        initial: "I",
        name: "Isabella Johnson",
        email: "isabella@example.com"
      },
      buyer: null
    },
  ]
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
        id :"109",
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
export default function TicketDetails() {
  const params  = useParams();
  const ticketId = params.id
  const [date, setDate] = React.useState(null);
  const thisTicket = tickets.find(tickit => tickit.id === ticketId)
  const thisTicketEvent =events.find(event => event.id === thisTicket.event_id )
  console.log(thisTicketEvent);
  // console.log(thisTicket.event_id);
  const currentPageInfo = {};
  const TicketStatus = thisTicket.status ;
  const dateEvent = thisTicketEvent.datetime
  const { t } = useTranslation();
    const storedLanguage = Cookies.get('i18next_lng');
  switch (TicketStatus) {
    case "Accepted":
      currentPageInfo.pageName = (t("accepted_ticketes"));
      currentPageInfo.url = "/admin/dashboard/done-tickets/";
      break;
    case 'Progress':
      currentPageInfo.pageName = (t("in_progress_ticketes"));
      currentPageInfo.url = "/admin/dashboard/progress-tickets/";
      break;
    case "Refused":
      currentPageInfo.pageName = (t("blocking_tickets"));
      currentPageInfo.url = "/admin/dashboard/blocking-tickets/";
      break;
    default:
      currentPageInfo.pageName = 'Unknown';
      currentPageInfo.url = '/admin/dashboard/done-tickets/';
      break;
  }
  const downloadPDF = () => {
    // Replace 'your_pdf_file.pdf' with the path to your PDF file
    const pdfPath = thisTicket.document;

    axios({
      url: pdfPath,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileName = `${thisTicket.id}.pdf`;
      saveAs(pdfBlob, (fileName));
    });
  };
  return (
    <div>
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
              {currentPageInfo.pageName}
            </Typography>
            <Typography color="primary" fontWeight={500} fontSize={12}>
            {t("ticket_details")}
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
          {t("ticket_details")}
          </Typography>
        </Box>
       
      </Box>
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 } ,maxWidth: '100%', margin:"0 !important", 
       }}>
        <Grid item xs={12} sm={12} md={12} lg={6} sx={{padding:"0 !important", }}>
          <Card sx={{margin:"1rem"  }}>
          <CardContent>
            <Typography level="h3" component="h2" fontSize={20}>
              {t("user_information")}
            </Typography>
          </CardContent>
              <CardContent className="grid gap-4">

              <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
          <ListItem>
          <ListItemContent >
          <Avatar alt={thisTicket.seller.name} sx={{width:'3rem',height:'3rem'}} />
          </ListItemContent>
        </ListItem>

        <ListItem>
          <ListItemContent >
            <Typography level="title-lg">
            {t("name")}:  
            <Typography level="title-sm">
              {thisTicket.seller.name}
            </Typography>
            
            </Typography>
          
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent >
            <Typography level="title-lg">
              {t("email")}: 
               <Typography level="title-sm">
             {thisTicket.seller.email}
            </Typography></Typography>
          
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent >
            <Typography level="title-lg">{t("contact_details")}:<Typography level="title-sm">
            +1 888 8888 8888
            </Typography></Typography>
            
          </ListItemContent>
        </ListItem>
              </List>
              </CardContent>
          </Card>
          <Card sx={{margin:"1rem" }}>
          <CardContent>
            <Typography level="h3" component="h2" fontSize={20}>
            {t("ticket_details")}
            </Typography>
          </CardContent>
              <CardContent className="grid gap-4">

              <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
    

        <ListItem>
          <ListItemContent >
            <Typography level="title-lg">{t("status")}:  <Typography level="title-sm">
              {thisTicket.status}
            </Typography></Typography>
          
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent >
            <Typography level="title-lg">{t("event")}:  <Typography level="title-sm">
             {thisTicketEvent.title}
            </Typography></Typography>
          
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent >
            <Typography level="title-lg">{t("date_created")}:<Typography level="title-sm">
            {thisTicket.date_added}
            </Typography></Typography>
            
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent >
            <Typography level="title-lg">{t("quantity")}:<Typography level="title-sm">
            {thisTicket.quantity}
            </Typography></Typography>
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent >
            <Typography level="title-lg">{t("price")}:<Typography level="title-sm">
            {thisTicket.price}
            </Typography></Typography>
            
          </ListItemContent>
        </ListItem>
              </List>
              </CardContent>
          </Card>
          <Card sx={{margin:"1rem"  }}>
          <CardContent>
            <Typography level="h3" component="h2" fontSize={20}>
            {t("note_admin")}
            </Typography>
          </CardContent>
              <CardContent className="grid gap-4">
              I'm unable to login to my account. I've tried resetting my password but I'm not receiving the reset email. Please assist.
              </CardContent>
          </Card>
          <Card sx={{margin:"1rem"  }}>
          <CardContent>
            <Typography level="h3" component="h2" fontSize={20}>
            {t("attachments")}
            </Typography>
          </CardContent>
              <CardContent className="grid gap-4">
              {/* <Document file={file}>
                 <Page pageNumber={1} />
                   </Document> */}
          <Button onClick={downloadPDF}>{t("download")}</Button>
              </CardContent>
          </Card>
          
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} sx={{padding:"0 !important", }}>
        <Card sx={{margin:"1rem" ,maxWidth: '100%'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar defaultValue={dayjs(dateEvent)} />
            </LocalizationProvider>
        </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{padding:"0 !important", }} >
        <Card sx={{margin:"1rem"  }}>
            <Card sx={{margin:"1rem"  }}>
          <CardContent>
            <Typography level="h3" component="h2" fontSize={20}>
            {t("admin_notes")}
            </Typography>
          </CardContent>
              <CardContent className="grid gap-4">
              <FormControl>
                <Input placeholder={t("input_here")} />
                <FormHelperText>{t("notification_to_seller")} </FormHelperText>
                </FormControl>
              </CardContent>
            </Card>
            <Card sx={{margin:"1rem"  }}>
          <CardContent>
            <Typography level="h3" component="h2" fontSize={20}>
            {t("update_status")} 
            </Typography>
          </CardContent>
              <CardContent className="grid gap-4">
              <Select
                    defaultValue={[thisTicket.status]}
                    multiple
                    sx={{
                      minWidth: '13rem',
                    }}
                    slotProps={{
                      listbox: {
                        sx: {
                          width: '100%',
                        },
                      },
                    }}
                  >
              <Option value="Accepted">{t("accepted")} </Option>
              <Option value="Refused">{t("refused")} </Option>
              <Option value="Progress">{t("progress")} </Option>
              </Select>
              </CardContent>
            </Card>
            <Button type="submit" sx={{width: 'fit-content', alignSelf: 'end'}}>{t("update_ticket")} </Button>
        </Card>
        </Grid>
       </Grid>
          
      </Box>    
    </div>
  )
}





// function TicketDetails() {
//  

// export default TicketDetails;

