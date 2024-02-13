import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { jsPDF } from 'jspdf';
import axios from "axios";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import Breadcrumbs from '@mui/joy/Breadcrumbs';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import DeleteIcon from '@mui/icons-material/Delete';





function RowMenu() {
  return (
    <IconButton aria-label="delete">
  <DeleteIcon />
  </IconButton>
  );
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}


export default function AllTikets() {
  const [order, setOrder] = React.useState("desc")
  const [selected, setSelected] = React.useState([])
  const [open, setOpen] = React.useState(false)
  
  const [tickets, setTickets] = useState([]);
  const apiUrl = "http://127.0.0.1:8000";
  useEffect(() => {
      // Fetch ticket data from the backend
      axios.get('http://127.0.0.1:8000/api/admin/Tickets/')
          .then(response => {
              setTickets(response.data);
              console.log(response.data)
              
          })
          .catch(error => {
              console.error('Error fetching tickets:', error);
          });
  }, []); 
  
  
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
          onChange={handleSelectChange}
        >
          <Option value="">All</Option>
          <Option value="Accepted">Accepted</Option>
          <Option value="Refused">Refused</Option>
          <Option value="Progress">Progress</Option>
        </Select>
      </FormControl>
      

    </React.Fragment>
  )
  const [searchQuery, setSearchQuery] = React.useState('');

const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
   
};
const [filterSearchtickets,setFilterSearchCourse] = React.useState([]);
// console.log(filterSearchtickets);
React.useEffect(()=>{
if(searchQuery ==''){
setFilterSearchCourse(tickets);
  }
else{
  const filteredtickets = tickets.filter((ticket) =>
  (typeof ticket.id === 'string' && ticket.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
  ticket.date_added.toLowerCase().includes(searchQuery.toLowerCase()) ||
  ticket.seller_username.toLowerCase().includes(searchQuery.toLowerCase()) ||
  ticket.seller_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  ticket.status_display.toLowerCase().includes(searchQuery.toLowerCase())
);
setFilterSearchCourse(filteredtickets)
}
} , [tickets,searchQuery]); 

const [selectedOption, setSelectedOption] = React.useState('');

  const handleSelectChange = (event ,newValue) => {
    setSelectedOption(newValue)
    }
const [filterStatusTickets,setFilterStatusTickets] = React.useState([]);
// console.log(filterStatusTickets);
React.useEffect(() => {
  if (selectedOption === '') {
    setFilterStatusTickets(filterSearchtickets);
  } else {

    const filter = filterSearchtickets.filter(ticket => ticket.status_display === selectedOption);
      setFilterStatusTickets(filter);

    }
}, [selectedOption,filterSearchtickets]);
// console.log(filterStatusTickets);

const handleDownloadPDF = () => {
  const doc = new jsPDF();
  let yPos = 10;

  const columnWidths = [40, 60, 40, 70]; 

  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255); 
  doc.setFillColor(151, 195, 240); 
  doc.rect(10, yPos, columnWidths.reduce((acc, width) => acc + width, 0), 10, 'F'); 
  doc.text('Invoice', 15, yPos + 8);
  doc.text('Date',  55, yPos + 8);
  doc.text('Status', 105, yPos + 8);
  doc.text('Seller', 130, yPos + 8);
  yPos += 10;

  filterStatusTickets.forEach((ticket, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(240, 240, 240); 
    } else {
      doc.setFillColor(255, 255, 255); 
    }
    doc.rect(10, yPos, columnWidths.reduce((acc, width) => acc + width, 0), 10, 'F'); 
    doc.setTextColor(0, 0, 0); 
    doc.text(`INV-${ticket.id}`, 15, yPos + 8);
    doc.text(ticket.date_added, 40, yPos + 8);
    doc.text(ticket.status, 105, yPos + 8);
    doc.text(`${ticket.seller_username} (${ticket.seller_email})`, 130, yPos + 8);
    yPos += 10;
  });

  doc.save('table_data.pdf');
};
const handleDownload = (documentUrl) => {
  const fullUrl = `${window.location.origin}/${documentUrl}`;
console.log(documentUrl);
  const a = document.createElement('a');
  a.href = fullUrl;
  a.download = documentUrl.split('/').pop(); 
  a.click();
};
  return (
    <>
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
              All Tickets
            </Typography>
          </Breadcrumbs>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              mt: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Tickets
            </Typography>
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </Box>
          <React.Fragment >
           <Sheet
           className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          onChange={handleSearchInputChange}
         
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
          </Sheet>
          <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" }
          }
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for Ticket</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            onChange={handleSearchInputChange}

          />
        </FormControl>
        {renderFilters()}
        </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "block" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0
        }}
      >
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
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== tickets.length
                  }
                  checked={selected.length === tickets.length}
                  onChange={event => {
                    setSelected(
                      event.target.checked ? tickets.map(row => row.id) : []
                    )
                  }}
                  color={
                    selected.length > 0 || selected.length === tickets.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)"
                    }
                  }}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Seller</th>
              <th style={{ width: 140, padding: "12px 6px" }}> </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(filterStatusTickets, getComparator(order, "id")).map(ticket => (
              <tr key={ticket.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(ticket.id)}
                    color={selected.includes(ticket.id) ? "primary" : undefined}
                    onChange={event => {
                      setSelected(ids =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter(itemId => itemId !== row.id)
                      )
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">INV-{ticket.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{ticket.date_added}</Typography>
                </td>
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
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm" alt={ticket.seller_username} src={ticket.seller_profile_picture}></Avatar>
                    <div>
                      <Typography level="body-xs">
                        {ticket.seller_username}
                      </Typography>
                      <Typography level="body-xs">
                        {ticket.seller_email}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Link level="body-xs" component="button" onClick={() => handleDownload(ticket.document)}>
                      Download
                    </Link>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex"
          }
        }}
      >
     
    
      </Box>
      
         </React.Fragment>


















        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {filterStatusTickets.map((ticket) => (
        <List
          key={ticket.id}
          size="sm"
          sx={{
            '--ListItem-paddingX': 0,
          }}
        >
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
              <ListItemDecorator>
                <Avatar alt={ticket.seller.name} size="sm"></Avatar>
              </ListItemDecorator>
              <div>
                <Typography fontWeight={600} gutterBottom>
                  {ticket.seller.name}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {ticket.seller.email}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">{ticket.date}</Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{ticket.id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Link level="body-sm" component="button">
                    Download
                  </Link>
                  <RowMenu />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  Accepted: <CheckRoundedIcon />,
                  Progress: <AutorenewRoundedIcon />,
                  Refused: <BlockIcon />
                }[ticket.status]
              }
              color={
                {
                  Accepted: "success",
                  Progress: "neutral",
                  Refused: "danger"
                }[ticket.status]
              }
            >
              {ticket.status}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
      >
          <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          >
           <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography level="body-sm" mx="auto">
          Page 1 of 10
          </Typography>
          <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
        </Box>
        
     </>
  )
}