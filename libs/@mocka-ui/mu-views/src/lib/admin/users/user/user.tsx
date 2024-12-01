import { MuInput, MuModal } from '@mockoto-ui-common/design-system';
import { MuModalFooterCommonActions } from '@mockoto-ui-common/ui-components';
import { muAxiosClient, muQueryClient } from '@mu/mu-auth';
import { Box, Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './user.scss';

interface UserFormData {
  email: string;
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export function User() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [isValid, setIsValid] = useState(false);

  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const { mutate: userMutate } = useMutation({
    mutationFn: (formData: UserFormData) =>
      isCreateMode ? muAxiosClient.post('/api/user', formData) : muAxiosClient.put('/api/user', formData),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['users'], exact: true });
      handleClose();
    },
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    validateField(name);
  };

  const validateField = (name: string) => {
    const formErrors = { ...errors };

    switch (name) {
      case 'email':
        formErrors.email = formData.email ? '' : 'Email is required';
        break;
      case 'fullName':
        formErrors.fullName = formData.fullName ? '' : 'Full Name is required';
        break;
      case 'username':
        formErrors.username = formData.username ? '' : 'Username is required';
        break;
      case 'password':
        formErrors.password = formData.password ? '' : 'Password is required';
        break;
      case 'confirmPassword':
        formErrors.confirmPassword = formData.confirmPassword
          ? formData.confirmPassword === formData.password
            ? ''
            : 'Passwords must match'
          : 'Confirm Password is required';
        break;
      default:
        break;
    }

    setErrors(formErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    navigate('../');
  };

  const validateForm = () => {
    const formErrors = { email: '', fullName: '', username: '', password: '', confirmPassword: '' };
    let formValid = true;

    if (!formData.email) {
      formErrors.email = 'Email is required';
      formValid = false;
    }
    if (!formData.fullName) {
      formErrors.fullName = 'Full Name is required';
      formValid = false;
    }
    if (!formData.username) {
      formErrors.username = 'Username is required';
      formValid = false;
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
      formValid = false;
    }
    if (!formData.confirmPassword) {
      formErrors.confirmPassword = 'Confirm Password is required';
      formValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = 'Passwords must match';
      formValid = false;
    }

    setErrors(formErrors);
    setIsValid(formValid);
    return formValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert('Form is not valid');
      return;
    }
    userMutate(formData);
  };

  return (
    <MuModal
      open={true}
      onClose={handleClose}
      header={<span>User</span>}
      children={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MuInput
                label="Username"
                name="username"
                value={formData.username}
                error={!!errors.username}
                helperText={errors.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <MuInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MuInput
                label="Email"
                name="email"
                value={formData.email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <MuInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                error={!!errors.password}
                helperText={errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <MuInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>
        </Box>
      }
      footer={<MuModalFooterCommonActions onSave={handleSubmit} onClose={handleClose} />}
    />
  );
}

export default User;
