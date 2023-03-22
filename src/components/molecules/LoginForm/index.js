import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import makeRequestWith from '../../../utils/apiService/client';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './styles';
import { EMAIL_PATTERN } from '@constants/regex';
import Container from '@components/atoms/GridContainer';
import Item from '@components/atoms/GridItem';
import { parseJwt } from '@services/global';
import { setCookie } from '@services/storage';
import { PAGES_ROUTE, ROUTES } from '@constants';

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    const result = await makeRequestWith({ method: 'POST', url: ROUTES.LOGIN, data });
    if (result) {
      const { token } = result;
      const JWTContent = parseJwt(token);
      setCookie('token', token, {
        path: '/',
        expires: new Date(JWTContent.exp * 1000),
      });
      window.location.href = PAGES_ROUTE.DASHBOARD;
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Item xs={12} mb={4}>
          <Typography variant="subtitle2">Login to your account</Typography>
        </Item>
        <Item xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: 'Required' },
              pattern: {
                message: 'Invalid email address',
                value: EMAIL_PATTERN,
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  label="Email"
                  helperText={error?.message}
                />
              );
            }}
          />
        </Item>
        <Item xs={12}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: 'Required' },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  label="Password"
                  helperText={error?.message}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
          />
        </Item>
        <Item xs={12}>
          <Button variant="contained" color="primary" sx={styles.submitBtn} type="submit">
            Login
          </Button>
        </Item>
      </Container>
    </Box>
  );
};

export default LoginForm;
