import { useNavigate } from 'react-router-dom';
import './mu-login.scss';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, FormControl, TextField } from '@mui/material';

export function MuLogin() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  } as any);

  const { mutate: signinHandler } = useMutation({
    mutationFn: ({ formData }: any) =>
      fetch('http://localhost:3000/api/auth/login', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Send data as JSON
        },
        body: JSON.stringify(formData), // Convert data object to JSON string
      }), //.post('api/auth/login', JSON.stringify(formData)),
    onSuccess: data => {
      console.log(data);
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formData.email.trim() === '' && formData.passwor.trim() === '') {
      return;
    }
    signinHandler({ formData });
  };

  return (
    <div className="login-container">
      <section className="login-section">
        <div className="login-header">
          <span>Welcome to Mocka</span>
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
        </div>
      </section>
      <div className="login-footer">
        <span>The Mockup System Revolution</span>
      </div>
    </div>
  );
}
export default MuLogin;
