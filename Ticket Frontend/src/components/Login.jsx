import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import axios from 'axios';

export default function Login() {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: '',
  });
  const [signupData, setSignupData] = React.useState({
    email: '',
    confirmEmail: '',
    password: '',
  });

  const handleLogin = () => {
    setOpenLogin(true);
    setOpenSignup(false);
  };

  const handleSignup = () => {
    setOpenLogin(false);
    setOpenSignup(true);
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://funpass.io/api/users/login/', loginData);
      // Handle the response as needed
      console.log('Login Response:', response.data);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignupSubmit = async () => {
    try {
      const response = await axios.post('http://funpass.io/api/users/signup/', signupData);
      console.log('Signup Response:', response.data);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="plain" onClick={handleSignup} sx={{ color: "#3399ff", '&:hover': { backgroundColor: 'transparent !important' }, display: { xs: 'none', md: 'inline-block' } }}>
        Sign up
      </Button>
      <Button variant="soft" onClick={handleLogin} sx={{ backgroundColor: '#3399ff', boxShadow: '0 2px 8px rgb(27 39 51 / 15%)', borderRadius: '300px !important', color: "white" }}>
        Login
      </Button>

      {/* Login Modal */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openLogin}
        onClose={() => setOpenLogin(false)}
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
              name="username"
              type="email"
              placeholder="johndoe@email.com"
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </FormControl>
          <Button sx={{ backgroundColor: '#3399ff', color: "white", borderRadius: '5px !important', mt: 1, width: '100%' }} onClick={handleLoginSubmit}>
            Login
          </Button>
          <Typography
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Need an account? <Button variant="plain" onClick={handleSignup} sx={{ padding: "0", color: "#3399ff", '&:hover': { backgroundColor: 'transparent !important' } }}>Sign up</Button>
          </Typography>
        </Sheet>
      </Modal>

      {/* Signup Modal */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openSignup}
        onClose={() => setOpenSignup(false)}
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
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Email</FormLabel>
            <Input
              name="confirmEmail"
              type="email"
              placeholder="johndoe@email.com"
              onChange={(e) => setSignupData({ ...signupData, confirmEmail: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
          </FormControl>
          <Typography
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            By purchasing a ticket or signing up, you agree to the user agreement and the privacy policy.
          </Typography>
          <Button sx={{ backgroundColor: '#3399ff', color: "white", borderRadius: '5px !important', mt: 1, width: '100%' }} onClick={handleSignupSubmit}>
            Sign Up
          </Button>
          <Typography fontSize="sm"
            sx={{ alignSelf: 'center' }}>
            Already have an account? <Button variant="plain" onClick={handleLogin} sx={{ padding: "0", color: "#3399ff", '&:hover': { backgroundColor: 'transparent !important' } }}>Login</Button>
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
