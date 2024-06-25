

import { useEffect, useState } from 'react';

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
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function SignupPage() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [inpVal, setInpVal] = useState({
    fname:'',
    email: '',
    password: '',
    cpassword:''
  });
  console.log(inpVal);


  const setVal = (e) => {
    const { name, value } = e.target;

    // eslint-disable-next-line arrow-body-style
    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };

  const validation=async()=>{
    const {fname,email, password,cpassword} = inpVal;
    if(fname===""){
        alert("please enter your name");
    }
   else if(email===""){
      toast("please enter a valid email");
    }else if(!email.includes("@")){
      toast("please enter a valid email");
    }else if(password===""){
      toast("please enter a valid password");
    }else if(cpassword===""){
        toast("please enter a valid cpassword");
    }
    else {
     const res=await axios.post('http://localhost:4001/register',{
      fname,email,password,cpassword
     })
     const data =await res.data;
     console.log(data);
     if(res.status===201){
       toast.success("signup successful");
       setInpVal({...inpVal,fname:"",email:"",password:"",cpassword:""})
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
      <TextField name="fname" label="Name" value={inpVal.fname}  onChange={setVal} />

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
        <TextField
          name="cpassword"
          label="Confirm Password"
          onChange={setVal}
          value={inpVal.cpassword}
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
        /><Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
        Having an account?
       <NavLink to="/login" sx={{ ml: 0.5 }}>
          Login here
        
        </NavLink>
      </Typography>
      </Stack>

      
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        sx={{ my: 3 }}
      >
       SignUp
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
      <div><Toaster/></div>
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
          <Typography variant="h4" sx={{ my: 3 }}>Sign Up to Start</Typography>

          

         
            

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
