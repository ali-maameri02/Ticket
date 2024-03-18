import React from 'react'
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Card from '@mui/joy/Card';
import  Link  from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Checkbox from '@mui/joy/Checkbox'
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import axios from "axios";
import Chip from "@mui/joy/Chip";
import Avatar from "@mui/joy/Avatar";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
// function createData(Status, Event, Quentity, Sold, Price,Date) {
//   return { Status , Event, Quentity, Sold, Price , Date};
// }

const handleDownload = (documentUrl) => {
  const fullUrl = `${window.location.origin}/${documentUrl}`;
console.log(documentUrl);
  const a = document.createElement('a');
  a.href = fullUrl;
  a.download = documentUrl.split('/').pop(); 
  a.click();
};



export default function ListingSellTicket() {
  const [tickets, setTickets] = React.useState([]);
  const apiUrl = "http://funpass.io";
   React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/admin/Tickets/')
        .then(response => {
            setTickets(response.data);
            console.log(response.data)
            
        })
        .catch(error => {
            console.error('Error fetching tickets:', error);
        });
}, []); 
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
    {/* <Table sx={{ '& thead th:nth-child(1)': { width: '40%' } }}>
      <thead>
        <tr>
          <th>{t("status")}</th>
          <th>{t("event")}</th>
          <th>{t("quantity")}</th>
          <th>{t("sold")}</th>
          <th>{t("price")}</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((row) => (
          <tr key={row.id}>
            <td>{row.status}</td>
            <td>{row.event_id}</td>
          </tr>
        ))}
      </tbody>
    </Table> */}
    <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px"
          }}
        >
          <thead>
            <tr>
              
              <th style={{ width: 120, padding: "12px 6px" ,textAlign: "start"}}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  fontWeight="lg"
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                    }
                  }}
                >
                  {t('status')}
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" ,textAlign:"start"}}>{t("event")}</th>
              <th style={{ width: 140, padding: "12px 6px" ,textAlign:"start"}}>{t("quantity")}</th>
              <th style={{ width: 240, padding: "12px 6px" ,textAlign:"start"}}>{t('sold')}</th>
              <th style={{ width: 140, padding: "12px 6px" ,textAlign:"start"}}>{t('price')}</th>
              <th style={{ width: 140, padding: "12px 6px" ,textAlign:"start"}}>{t('date')}</th>
              <th style={{ width: 140, padding: "12px 6px" ,textAlign:"start"}}></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Accepted: <CheckRoundedIcon />,
                        Progress: <AutorenewRoundedIcon />,
                        Refused: <BlockIcon />
                      }[ticket.status_display]
                    }
                    color={
                      {
                        Accepted: "success",
                        Progress: "neutral",
                        Refused: "danger"
                      }[ticket.status_display]
                    }
                  >
                    {ticket.status_display}
                  </Chip>
                </td>
                <td>
                  <Typography level="body-xs">{ticket.event}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{ticket.quantity}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{ticket.sold}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{ticket.price}</Typography>

                </td>
                <td>
                  <Typography level="body-xs">{ticket.date_added}</Typography>

                </td>
               
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Link level="body-xs" component="button" onClick={() => handleDownload(ticket.document)}>
                      {t("download")}
                    </Link>
                    {/* <RowMenu /> */}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
    </Table>
    </Box>

    </>
  )
}
