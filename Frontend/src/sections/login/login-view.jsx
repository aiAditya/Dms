import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function LoginView() {
 
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
 
  const navigate=useNavigate() ;


  const [inpVal, setInpVal] = useState({
    email: '',
    password: '',
  });
  console.log(inpVal);


  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal(() => ({
        ...inpVal,
        [name]: value,
      }));
  };

  const validation=async()=>{
    const {email, password} = inpVal;
    if(email===""){
      toast.error("please enter a valid email");
    }else if(!email.includes("@")){
      toast.error("please enter a valid email");
    }else if(password===""){
      toast.error("please enter a valid password");
    }else {
     
      try {
        const res = await axios.post('http://localhost:4001/login', {
          email,
          password,
        });
  
        const data = await res.data;
        console.log(data);
  
        if (res.status === 201) {  // Assuming the server responds with status 200 for successful login
          localStorage.setItem('userDataToken', data.token);
          navigate("/");
          setInpVal({ ...inpVal, email: "", password: "" });
          toast.success("Login successful");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Username or password incorrect");
        } else {
          console.error("An error occurred:", error);
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    }
  
  }

  const handleClick = (e) => {
    e.preventDefault();
    validation();
    
    // router.push('/');
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={inpVal.email}  onChange={setVal} />

        <TextField
          name="password"
          label="Password"
          onChange={setVal}
          value={inpVal.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Toaster/>
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Start</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
           <NavLink to="/register" sx={{ ml: 0.5 }}>
             Get started
            
            </NavLink>
          </Typography>

          <Stack direction="row" spacing={2}>
            {/* <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button> */}
          </Stack>

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
