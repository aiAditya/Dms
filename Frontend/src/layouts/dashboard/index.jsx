import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { mainContext } from 'src/contextprovider/Context';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const {loginData,setLoginData} = useContext(mainContext);
  
  const DashboardValid = async () => {
    const token = localStorage.getItem('userDataToken');
    // console.log(token);
    if (!token) {
      console.log('Token is missing, redirecting to login.');
      navigate('/login'); // Redirect to login page if token is missing
      return;
    }
    try {
      const res = await axios.get('http://localhost:4001/validuser', {
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
      });
      const data = await res.data;
      console.log(data);
       

      if (res.status === 401 || !data) {
        console.log('user not authenticated');
        navigate('*');
      } else {
        console.log('user verified');
        setLoginData(data);
        console.log(loginData)
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    DashboardValid();
  }, []);
  useEffect(() => {
    // This useEffect will log loginData whenever it changes
    console.log('Updated loginData:', loginData);
  }, [loginData]); // Add loginData as a dependency
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} loginData={loginData} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} loginData={loginData}/>

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
