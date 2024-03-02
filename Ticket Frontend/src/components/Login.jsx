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
import axios, { AxiosError } from 'axios';

import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
export default function Login(props) {
  const { t } = useTranslation();
  const storedLanguage = Cookies.get('i18next_lng');
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
  const [signupError, setSignupError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
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
<<<<<<< HEAD
      console.log(loginData);
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', loginData);
=======
      const response = await axios.post('http://funpass.io/api/users/login/', loginData);
      // Handle the response as needed
>>>>>>> ebe37f78e27f09ddfbec493f86b264658371d4e2
      console.log('Login Response:', response.data);
      setLoginError('');
      setOpenLogin(false);
      setOpenSignup(false);
      const token = response.data.token;
      localStorage.setItem('authTokenUser', token);
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError(t('login_error'));
    }
  };

  const handleSignupSubmit = async () => {
    try {
      const response = await axios.post('http://funpass.io/api/users/signup/', signupData);
      console.log('Signup Response:', response.data);
      setSignupError('');
      setOpenLogin(true);
      setOpenSignup(false);

    } catch (error) {
      console.error('Error during signup:',error);
      if(error.response.data.email[0]==='User with this email already exists.'){
        setSignupError(t('user_exists'))
      }else{
        setSignupError(t('singup_error'));
      }
      

    }
  };

  return (
    
    <React.Fragment>
      <Button variant="plain" onClick={handleSignup} sx={{ color: "#3399ff",transition: 'all 0.3s ease-in-out', '&:hover': { backgroundColor: 'transparent !important' ,color:"#2370bd"}, display: {xs:"none", sm:"none", md: 'none', lg: [props.justlogin === 'true' ? 'none' : 'inline-block']} }}>
        {t("sign_up")}
      </Button>
      <Button variant="soft" onClick={handleLogin} sx={{ backgroundColor: '#3399ff', boxShadow: '0 2px 8px rgb(27 39 51 / 15%)', borderRadius: '300px !important', color: "white" ,
       transition: 'all 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: '#2370bd', // Adjusted box-shadow on hover
    }, }}>
       {t("login")}
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
          <ModalClose variant="plain" sx={{ m: 1,[storedLanguage === "ar" ? "left": "right"]: "var(--ModalClose-inset, 0.625rem) ",[storedLanguage === "en" ? "left": "right"]: "auto"}} />
          <div>
            <Typography level="h4" component="h1">
              <b>{t("welcome_again")}</b>
            </Typography>
            <Typography level="body-sm">{t("sign_in_continue")}</Typography>
          </div>
          <FormControl>
            <FormLabel>{t("email")}</FormLabel>
            <Input
              name="username"
              type="email"
              placeholder="johndoe@email.com"
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{t("password")}</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder={t("password")}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </FormControl>
          <Button sx={{ backgroundColor: '#3399ff', color: "white", borderRadius: '5px !important', mt: 1, width: '100%' }} onClick={handleLoginSubmit}>
            {t("login")}
          </Button>
          <Typography
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            {t("need_account")}? <Button variant="plain" onClick={handleSignup} sx={{ padding: "0", color: "#3399ff", '&:hover': { backgroundColor: 'transparent !important' } }}>{t("sign_up")}</Button>
          </Typography>
          {loginError && (
          <Typography textColor={'danger.500'}  sx={{ mt: 1, textAlign: 'center' }}>{loginError}</Typography>
        )}
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
          <ModalClose variant="plain" sx={{ m: 1,[storedLanguage === "ar" ? "left": "right"]: "var(--ModalClose-inset, 0.625rem) ",[storedLanguage === "en" ? "left": "right"]: "auto"}} />
          <div>
            <Typography level="h4" component="h1">
              <b>{t("welcome_")}</b>
            </Typography>
            <Typography level="body-sm">{t("sign_up_continue")}</Typography>
          </div>
          <FormControl>
            <FormLabel>{t("email")}</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{t("confirm_email")}</FormLabel>
            <Input
              name="confirmEmail"
              type="email"
              placeholder="johndoe@email.com"
              onChange={(e) => setSignupData({ ...signupData, confirmEmail: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{t("password")}</FormLabel>
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
{t("agreement_policy")}          </Typography>
          <Button sx={{ backgroundColor: '#3399ff', color: "white", borderRadius: '5px !important', mt: 1, width: '100%' }} onClick={handleSignupSubmit}>
           {t("sign_up")}
          </Button>
          <Typography fontSize="sm"
            sx={{ alignSelf: 'center' }}>
            {t("already_have_account")}? <Button variant="plain" onClick={handleLogin} sx={{ padding: "0", color: "#3399ff", '&:hover': { backgroundColor: 'transparent !important' } }}>{t("login")}</Button>
          </Typography>
          {signupError && (
          <Typography textColor={'danger.500'}  sx={{ mt: 1, textAlign: 'center' }}>{signupError}</Typography>
        )}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
