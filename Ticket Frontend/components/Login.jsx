import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
export default function Login() {
    const [open, setOpen] = React.useState(false);
    const [openSingup, setOpenSingup] = React.useState(false);
   
  return (
    <React.Fragment>
       <Button variant="plain" onClick={() => setOpenSingup(true)} sx={{ color:"#3399ff" ,'&:hover': { backgroundColor: 'transparent !important' }}}>
        Sing up
    </Button>
    <Button variant="soft" onClick={() => setOpen(true)} sx={{backgroundColor:'#3399ff' , color:"white" ,boxShadow:' 0 2px 8px rgb(27 39 51 / 15%)',borderRadius:' 300px !important' }}>
      Login
    </Button>
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openSingup}
      onClose={() => setOpenSingup(false)}
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
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign up to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="johndoe@email.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Email</FormLabel>
          <Input
            name="confirm email"
            type="email"
            placeholder="johndoe@email.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
          />
        </FormControl>
        <Typography
          
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          By purchasing a ticket or signing up, you agree to the user agreement and the privacy policy.
        </Typography>
        <Button sx={{backgroundColor:'#3399ff' , color:"white" ,borderRadius:' 5px !important',mt:1 , width:'100%' }}>Sign Up</Button>
        
      </Sheet>
    </Modal>
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
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
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome Again!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="johndoe@email.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
          />
        </FormControl>

        <Button sx={{backgroundColor:'#3399ff' , color:"white" ,borderRadius:' 5px !important',mt:1 , width:'100%' }}>Login</Button>
       
      </Sheet>
    </Modal>
  </React.Fragment>
  )
}
