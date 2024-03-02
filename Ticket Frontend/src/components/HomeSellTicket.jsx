import React from 'react';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/material/Grid';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Select from '@mui/joy/Select';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkboxjoy from '@mui/joy/Checkbox';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
const events = [
  {
    id: "101",
    title: 'Music Festival',
    datetime: '2024-05-20 18:00:00',
    deadline: '2024-05-18 12:00:00',
    description: 'A two-day music festival featuring various artists.',
    place: 'Stadium',
    cover_picture: 'event_covers/music_festival.jpg',
    stadium_id: 3,
    theater_id: null,
  },
  {
    id: "102",
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
    id: "103",
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

export default function HomeSellTicket() {
  const { t } = useTranslation();
  const storedLanguage = Cookies.get('i18next_lng');
  const [searchActive, setSearchActive] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [filteredEvents, setFilteredEvents] = React.useState(events);
  const [selectedEvent, setSelectedEvent] = React.useState(null); 
  const [currency, setCurrency] = React.useState('dollar');
  const [openCreditCard, setOpenCreditCard] = React.useState(false);
  const handleSearch = () => {
    setSearchActive(true);
    filterEvents();
  }

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === '') {
      setSearchActive(false);
      setFilteredEvents(events);
    }
  }

  const filterEvents = () => {
    const filtered = events.filter(event => {
      const searchText = searchInput.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchText) ||
        event.description.toLowerCase().includes(searchText) ||
        event.datetime.toLowerCase().includes(searchText) ||
        event.place.toLocaleLowerCase().includes(searchText)
      )
    });
    setFilteredEvents(filtered);
  }

  const handleBackButton = () => {
    setSearchActive(false);
    setSearchInput('');
  }

  const handleSelectEvent = (eventId) => {
    // Find the selected event from the events array
    const event = events.find(event => event.id === eventId);
    setSelectedEvent(event);
  }

  const handleCloseForm = () => {
    setSelectedEvent(null); // Reset selected event when form is closed
  }

  return (
    <>
      <Box sx={{ display: searchActive ? 'none' : 'block' }}>
        <Typography variant='h5' sx={{ mb: "1rem" }}>{t('add_tickets')}</Typography>
        <Box sx={{ display: 'flex', gap: "1rem" }}>
          <Input
            size="sm"
            placeholder={t('search_events')}
            sx={{ flexGrow: 1, padding: "1rem", borderRadius: "5rem" }}
            onChange={handleInputChange}
          />
          <Button variant="soft" onClick={handleSearch} sx={{
            backgroundColor: '#3399ff', boxShadow: '0 2px 8px rgb(27 39 51 / 15%)',
            borderRadius: '300px !important', color: "white",
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#2370bd',
            },
          }}>
            {t('search')}
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: searchActive ? 'none' : 'block' }}>
        <Typography level="h1" textAlign={'center'}>
          {t('faq')}
        </Typography>
        <Card>
          <AccordionGroup
            sx={{
              maxWidth: "100%",
              [`& .${accordionSummaryClasses.indicator}`]: {
                transition: '0.2s',
              },
              [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
                transform: 'rotate(45deg)',
              },
            }}
          >
            <Accordion>
              <AccordionSummary sx={{ minHeight: '5rem' }} indicator={<AddIcon />}>First accordion</AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary sx={{ minHeight: '5rem' }} indicator={<AddIcon />}>Second accordion</AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary sx={{ minHeight: '5rem' }} indicator={<AddIcon />}>Third accordion</AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </Card>
      </Box>

      <Box sx={{ display: searchActive ? 'block' : 'none' }}>
        {!selectedEvent ? ( 
          <>
            <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: "1rem" }} textAlign="center">
              <Typography variant='h5' >{t('select_your_event')}</Typography>
              <Button variant="soft" sx={{
                backgroundColor: '#9e9e9e', borderRadius: '300px !important', color: "white",
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#02dba4',
                },
              }} onClick={handleBackButton}>{t("back")}</Button>
            </Box>
            <Box>
              <Card>
                <Typography variant='caption'>{t("events_found_for")}  "{searchInput}" </Typography>
                {filteredEvents.map((event) => (
                  <React.Fragment key={event.id}>
                    <Divider />
                    <Grid container spacing={6} sx={{
                      px: { xs: 0, md: 0 }, py: { xs: 2, md: 3 }, maxWidth: '100%', margin: "0 !important",
                      alignItems: 'center', position: 'relative'
                    }}>
                      <Grid item xs={2} sm={2} md={2} lg={2} sx={{ padding: "0 !important", [storedLanguage === "ar" ? "borderLeft" : "borderRight"]: "1px solid #e6e6e6" }}>
                        <Typography sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography level="title-lg">
                            {new Date(event.datetime).toLocaleDateString(storedLanguage === 'ar' ? 'ar-EG' : undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                          <Typography level="body-xs">
                            {new Date(event.datetime).toLocaleTimeString(storedLanguage === 'ar' ? 'ar-EG' : undefined, {
                              hour: 'numeric',
                              minute: 'numeric'
                            })}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={10} sm={8} md={8} lg={8} sx={{ padding: "0 !important" }}>
                        <Typography sx={{ display: 'flex', flexDirection: 'column', padding: '0 0.5REM' }}>
                          <Typography level="title-lg" sx={{
                            textDecoration: "none",
                            whiteSpace: 'nowrap',
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}>{event.title}</Typography>
                          <Typography level="body-xs" sx={{
                            textDecoration: "none",
                            whiteSpace: 'nowrap',
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }} >{event.description}</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={0} sm={2} md={2} lg={2} sx={{ padding: "0 !important" }}>
                        <Button
                          sx={{
                            width: '100%',
                            position: { xs: 'absolute', sm: 'static' },
                            color: { xs: 'transparent', sm: 'white' },
                            right: { xs: '0', sm: 'auto' },
                            backgroundColor: { xs: 'transparent', sm: '#3399ff' },
                            top: "0",
                            height: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                              backgroundColor: { xs: 'transparent', sm: '#2370bd' },
                            },
                          }}
                          onClick={() => handleSelectEvent(event.id)}>
                          {t('select')}
                        </Button>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
              </Card>
            </Box>
          </>
        ) : (
          <>
            <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: "1rem" }} textAlign="center">
              <Typography variant='h5' >{t('select_your_event')}</Typography>
              <Button variant="soft" sx={{
                backgroundColor: '#9e9e9e', borderRadius: '300px !important', color: "white",
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#02dba4',
                },
              }} onClick={handleCloseForm}>{t("back")}</Button>
            </Box>
          <Box display={'flex'} gap={'0.5rem'} flexDirection='column'>
          <Typography variant='h5' sx={{ mb: "1rem" }}>{t('enter_listing_details')}</Typography>
              <Card sx={{display:'flex', flexDirection:'row'}}>
                    <img src={selectedEvent.cover_picture} />
                    <Typography sx={{display:'flex', flexDirection:'column', gap:"0.5rem"}}>
                      <Typography level='h3' >{selectedEvent.title}</Typography>
                      <Typography level='body-sm'>{selectedEvent.description}</Typography>
                    </Typography>
              </Card>
            <Card>
                <Typography sx={{display:'flex', flexDirection:'column', gap:"0.5rem"}}>
                      <Typography level='h3' >{t('ticket_info')}</Typography>
                      <Typography level='body-sm'>{t('double_check_for_accuracy')}</Typography>
                 </Typography>
                 <FormHelperText id="select-field-demo-helper">
                      {t("number_of_tickets")}
                    </FormHelperText>
                    <Select
                      defaultValue={2}
                      slotProps={{
                        button: {
                          id: 'select-num-ticket',
                          'aria-labelledby': 'select-field-demo-label select-num-ticket',
                        },
                      }}
                    >
                      {[...Array(12)].map((_, index) => (
                          <Option key={index + 1} value={index + 1}>
                            {index + 1}
                          </Option>
                        ))}
                    </Select>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={"space-between"} gap={"0.5rem"}>
                    <Input placeholder={t("section")} variant="outlined" color="neutral" fullWidth/> 
                    <Input placeholder={t('row')}variant="outlined" color="neutral" fullWidth/>
                    </Box>
            </Card>
            <Card>
            <Typography level='h3' >{t('ticket_price')}</Typography>
                    <Input
                placeholder={(t('amount'))}
                startDecorator={{
                  dollar: '$',
                  riyal: 'ر.س',
                  dirham: 'د.إ', 
                  dinar: 'د.ك', 
                  rial: 'ر.ع', 
                  dinarBahrain: 'د.ب', 
                }[currency]}
                endDecorator={
                  <React.Fragment>
                    <Divider orientation="vertical" />
                    <Select
                      variant="plain"
                      value={currency}
                      onChange={(_, value) => setCurrency(value)}
                      slotProps={{
                        listbox: {
                          variant: 'outlined',
                        },
                      }}
                      sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
                    >
                      <Option value="dollar">{t('us_dollar')}</Option>
                            <Option value="riyal">{t('saudi_riyal')}</Option>
                            <Option value="dirham"> {t('uae_dirham')}</Option>
                            <Option value="dinar"> {t('kuwaiti_dinar')}</Option>
                            <Option value="rial">{t('omani_rial')} </Option>
                            <Option value="dinarBahrain">{t('bahraini_dinar')} </Option>
                    </Select>
                  </React.Fragment>
        }
        sx={{ width: 300 }}
      />
            </Card>
            <Card>
            <Typography level='h3' >{t('delivery_details')}</Typography>
            <Box display={'flex'}  flexDirection='column' gap={"0.5rem"}>
              <Typography display={'flex'}  flexDirection='column' sx={{mb:"0.5rem"}}>
                <Typography level='body-md'>{t("how_will_they_be_delivered")}</Typography>
                <Typography level='body-sm'>{t("select_how_tickets_will_be_delivered")}</Typography>
              </Typography>
              <FormHelperText id="select-field-demo-helper">
                      {t("ticket_type")}
                    </FormHelperText>
                    <Select
                      defaultValue='electronic_transfer'
                      slotProps={{
                        button: {
                          id: 'select-type-ticket',
                          'aria-labelledby': 'select-field-demo-label select-type-ticket',
                        },
                      }}
                    >
                      
                      <Option value="electronic_transfer">{t('electronic_transfer')}</Option>
                        <Option value="electronic_pdf_tickets">{t('electronic_pdf_tickets')}</Option>
                        <Option value="paper_fedex_tickets">{t('paper_fedex_tickets')}</Option>
                        <Option value="account_transfer">{t('account_transfer')}</Option>
                        
                    </Select>
            </Box>
            </Card>
            <Card>
            <Typography level='h3' >{t('seller_requirements')}</Typography>
            <Box display={'flex'}  flexDirection='row' justifyContent={'space-between'}>
              <Typography display={'flex'}  flexDirection='column' sx={{mb:"0.5rem"}}>
                <Typography level='body-md'>{t("country_of_residence")}</Typography>
                <Typography level='body-sm'>{t("what_country_is_your_permanent_residency")}</Typography>
              </Typography>
                    <Select
                    sx={{width:"30%"}}
                      defaultValue='saudi_arabia'
                      slotProps={{
                        button: {
                          id: 'select-type-ticket',
                          'aria-labelledby': 'select-field-demo-label select-type-ticket',
                        },
                      }}
                  
                    >
                      
                      <Option value="saudi_arabia">{t('saudi_arabia')}</Option>
                        <Option value="united_arab_emirates">{t('united_arab_emirates')}</Option>
                        <Option value="kuwait">{t('kuwait')}</Option>
                        <Option value="oman">{t('oman')}</Option>
                        <Option value="qatar">{t('qatar')}</Option>

                        
                    </Select>
            </Box>
            <Box display={'flex'}  flexDirection='row' justifyContent={'space-between'}>
              <Typography display={'flex'}  flexDirection='column' sx={{mb:"0.5rem"}}>
                <Typography level='body-md'>{t("contact_phone_number")}</Typography>
                <Typography level='body-sm'>{t("we_require_a_phone_number_to_contact_you")}</Typography>
              </Typography>
              <Input placeholder={t("contact_phone")} variant="outlined" color="neutral" sx={{width:"30%"}}/> 
            </Box>
            <Box display={'flex'}  flexDirection='row' justifyContent={'space-between'} alignItems={'center'}>
              <Typography display={'flex'}  flexDirection='column' sx={{mb:"0.5rem", width:"80%",}}>
                <Typography level='body-md'>{t("credit_card_on_file")}</Typography>
                <Typography level='body-sm'>{t("to_provide_our_buyertrust_guarantee")}. <a href='#'>learn more</a> </Typography>
              </Typography>
              <React.Fragment>
                   <Button
                          sx={{
                            color: 'white' ,
                            backgroundColor: '#3399ff' ,
                            width:"20%",
                            height:'fit-content',
                            '&:hover': {
                              backgroundColor:'#2370bd' ,
                            },
                          }}
                          onClick={() => setOpenCreditCard(true)}
                          >
                          {t('add_card')}
                        </Button>
                        <Modal
                              aria-labelledby="modal-title"
                              aria-describedby="modal-desc"
                              open={openCreditCard}
                              onClose={() => setOpenCreditCard(false)}
                              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                          <Sheet
                                  variant="outlined"
                                  sx={{
                                    maxWidth: 500,
                                    borderRadius: 'md',
                                    p: 3,
                                    boxShadow: 'lg',
                                  }}
                                >
                                  <ModalClose variant="plain" sx={{ m: 1 , left:storedLanguage ==="ar" ? "var(--ModalClose-inset, 0.625rem)" :'auto' ,right:storedLanguage ==="ar" ? "auto" :'var(--ModalClose-inset, 0.625rem)' }} />
                                  <Card
                                          variant="outlined"
                                          sx={{
                                            maxHeight: 'max-content',
                                            maxWidth: '100%',
                                            mx: 'auto',
                                            resize: 'horizontal',
                                          }}
                                        >
                                          <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                                           {t("add_new_card")}
                                          </Typography>
                                          <Divider inset="none" />
                                          <CardContent
                                            sx={{
                                              display: 'grid',
                                              gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                              gap: 1.5,
                                            }}
                                          >
                                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                              <FormLabel>
                                           {t("expiry_date")}
                                              </FormLabel>
                                              <Input endDecorator={<CreditCardIcon />} />
                                            </FormControl>
                                            <FormControl>
                                              <FormLabel>
                                           {t("card_number")}
                                              </FormLabel>
                                              <Input endDecorator={<CreditCardIcon />} />
                                            </FormControl>
                                            <FormControl>
                                              <FormLabel>
                                              {t("cvc_cvv")}
                                              </FormLabel>
                                              <Input endDecorator={<InfoOutlined />} />
                                            </FormControl>
                                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                              <FormLabel>{t("card_holder_name")}</FormLabel>
                                              <Input placeholder={t('enter_cardholders_full_name')} />

                                            </FormControl>
                                            <FormControlLabel   sx={{m:"0"}}
                                             control={<Checkbox sx={{p:"0"}} />} 
                                                label={t('save_card')}
                                                />
                                            <CardActions sx={{ gridColumn: '1/-1' }}>
                                              <Button variant="solid" color="primary">
                                                {t("add_card")}
                                              </Button>
                                            </CardActions>
                                          </CardContent>
                                        </Card>
                                </Sheet>
                       </Modal>
                       </React.Fragment>
            </Box>
            <FormGroup>
            <Box display={'flex'}  flexDirection='row' justifyContent={'space-between'} alignItems={'center'}>
           <Box>
          
                      <FormControlLabel control={<Checkbox  />} 
                    label={
                      <React.Fragment>
                         {t("by_providing_your_phone_number_and_leaving_the_box_checked")} {' '}
                        <a href='#'>{t("user_agreement")} </a>
                        {t("&")} 
                        <a href='#'>{t('privacy_policy')}</a>.
                      </React.Fragment>
                    }
                    required/>
                      <FormControlLabel required control={<Checkbox />} label={
                        <React.Fragment>
                        {t("i_agree_to_TickPick")} {' '}
                       <a href='#'>{t("terms_and_conditions")} </a>
                       {t("i_agree_to_tickpick_terms_and_conditions")} {' '}
                     </React.Fragment>
                      } />
                  
           </Box>
            </Box>
           </FormGroup>

            </Card>
            <Card>
            <Button onClick={handleCloseForm}>{t("create_listing")}</Button>
            </Card>

          </Box>
          </>
        )}
      </Box>
    </>
  )
}
