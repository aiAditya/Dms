import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from 'src/_mock/account';
import { ListItemButton, filledInputClasses } from '@mui/material';


import PropTypes from 'prop-types';
import axios from 'axios';
import { mainContext } from 'src/contextprovider/Context';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover({ loginData }) {
  const [open, setOpen] = useState(null);
  const navigate=useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const {setLoginData} = useContext(mainContext);
  const logoutuser = async () => {
    const token =  localStorage.getItem("userDataToken");
    console.log(token);
    try {
      const response=await axios.get("http://localhost:4001/logout",{
       
      headers:{  'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        Accept: 'application/json'
       },
      credentials:"include"

      })
      const data=await response.data;
      console.log(data);
      if(response.status ===201 ){
        console.log("user logout")
        localStorage.removeItem("userDataToken");
        setLoginData(false)
        navigate("login")
      }else{
        console.log("data is not found")
       
      }


    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout=()=>{
    logoutuser();
    setOpen(null);
  }
  const handleClose = () => {
    
    setOpen(null);
  };
  const handleProfile=(index)=>{
    if(index===1){
      navigate("/profile");  
    }
    setOpen(null);

  }
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {loginData.fname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {loginData.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option,index) => (
          <MenuItem key={option.label} onClick={()=>{handleProfile(index);handleClose()}}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <ListItemButton
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
          
        >
          Logout
        </ListItemButton>
      </Popover>
    </>
  );
}
AccountPopover.propTypes = {
  loginData: PropTypes.object,
};
