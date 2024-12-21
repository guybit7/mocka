import { useNavigate } from 'react-router-dom';
import './mu-login.scss';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { muAxiosClient } from '../../api';
import { LOGIN_REQUEST, PUBLIC_CLIENT_APPLICATION, TOKEN_REQUEST } from '../../msalConfig';
import { AuthenticationResult } from '@azure/msal-browser';

export function MuLogin() {
  const navigation = useNavigate();
  const [token, setToken] = useState();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  } as any);

  // const { mutate: signinHandler } = useMutation({
  //   mutationFn: async ({ formData }: any) => await muAxiosClient.post('/api/auth/login', JSON.stringify(formData)),
  //   onSuccess: data => {
  //     console.log(data);

  //     navigation('/');
  //   },
  //   onError: err => {
  //     alert(err);
  //   },
  // });

  const { mutate: postSSO } = useMutation({
    mutationFn: async ({ tokenResponse }: any) =>
      await muAxiosClient.post('/api/auth/sso/call-back', JSON.stringify(tokenResponse)),
    onSuccess: data => {
      navigation('/');
    },
    onError: err => {
      alert(err);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    const loginResponse: AuthenticationResult = await PUBLIC_CLIENT_APPLICATION.loginPopup(LOGIN_REQUEST);
    if (loginResponse.account) {
      PUBLIC_CLIENT_APPLICATION.setActiveAccount(loginResponse.account);
    }
    const tokenResponse: any = await PUBLIC_CLIENT_APPLICATION.acquireTokenSilent(TOKEN_REQUEST);
    // setToken(tokenResponse.accessToken);
    postSSO({ tokenResponse });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formData.email.trim() === '' && formData.passwor.trim() === '') {
      return;
    }
    // signinHandler({ formData });
  };

  const handleSSO = () => {
    handleSignIn();
  };

  // Log out the user
  const logout = async () => {
    try {
      await PUBLIC_CLIENT_APPLICATION.logoutPopup(); // Or use logoutRedirect for a full page redirect
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="login-container">
      <section className="login-section">
        <div className="login-header">
          <Box sx={{ color: 'text.secondary' }}>Mockoto</Box>
        </div>
        <div className="login-form">
          <FormControl fullWidth>
            <TextField
              name="email"
              value={formData.email}
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="password"
              value={formData.password}
              id="password"
              label="password"
              type="password"
              variant="outlined"
              onChange={handleInputChange}
            />
          </FormControl>
        </div>
        <div className="dashbaord-actions">
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <Button variant="contained" onClick={handleSSO}>
            SSO
          </Button>
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </div>
      </section>
      <Box className="login-footer" sx={{ color: 'text.secondary' }}>
        The Mockup System Revolution
      </Box>
    </div>
  );
}
export default MuLogin;
