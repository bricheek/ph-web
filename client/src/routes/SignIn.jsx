import {
    Box,
    Button,
    LinearProgress,
    TextField,
    Typography,
  } from '@mui/material';
  import { useState } from 'react';
  import { useForm, Controller } from 'react-hook-form';
  import isEmail from 'is-email';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../auth';
  export default function SignIn() {
    const {
      control,
      handleSubmit,
      setError,
      formState: { errors },
    } = useForm();
    const [errorMessage, setErrorMessage] =
      useState(undefined);
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const onSubmit = async (data) => {
      const { email, password } = data;
      setIsSigningIn(true);
      setErrorMessage(undefined);
      try {
        await signIn({ email, password });
        navigate('/');
      } catch (error) {
        const res = error.response;
        if (res) {
          const code = res.data?.error?.code;
          if (code === 'user-not-found') {
            setError('email', {
              message: 'No user has this email',
            });
            return;
          }
          if (code === 'wrong-password') {
            setError('password', {
              message: 'Wrong password',
            });
            return;
          }
        }
        setErrorMessage("Can't sign in right now");
      } finally {
        setIsSigningIn(false);
      }
    };
    const [isSigningIn, setIsSigningIn] = useState(false);
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Enter an email',
              validate: {
                validateEmail: (email) =>
                  isEmail(email) || 'Enter a valid email',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Email"
                {...field}
                helperText={errors.email?.message}
                error={Boolean(errors.email)}
                type="email"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Enter a password' }}
            render={({ field }) => (
              <TextField
                label="Password"
                {...field}
                helperText={errors.password?.message}
                error={Boolean(errors.password)}
                sx={{ marginTop: 2 }}
                type="password"
              />
            )}
          />
          <LinearProgress
            variant="indeterminate"
            sx={{
              visibility: isSigningIn ? 'visible' : 'hidden',
              marginTop: 2,
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Sign in
          </Button>
          <Box
            sx={{
              marginTop: 2,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                visibility: errorMessage
                  ? 'visible'
                  : 'hidden',
              }}
              color="error"
            >
              {errorMessage}
            </Typography>
          </Box>
        </form>
      </Box>
    );
  }