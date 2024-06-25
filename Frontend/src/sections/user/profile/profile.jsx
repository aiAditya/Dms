import { Box, Card, Container, TextField, Typography } from '@mui/material';
import { Grid } from 'react-loader-spinner';

// eslint-disable-next-line import/no-absolute-path
import userImage from '/assets/images/Profile.jpg';
import { useContext } from 'react';
import { mainContext } from 'src/contextprovider/Context';

export default function Profile() {
    const {loginData} =useContext(mainContext)
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5, mt: 2 }}>
        Profile Page
      </Typography>
      <Card>
        <Box component="div" sx={{ display: 'flex', gap: '20px' }}>
          <img src={userImage} alt="profile" width={400} height={400} />

          <Box component="div" sx={{ display:"flex",flexDirection:"column", width: '100%', padding:2,justifyContent:"space-evenly"}}>
            <TextField
              fullWidth
              id="outlined-read-only-input"
            //   label="Name"
              value={loginData.fname}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              id="outlined-read-only-input"
            //   label="Email"
              value={loginData.email}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              id="outlined-read-only-input"
            //   label="Password"
              value={loginData.password}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              id="outlined-read-only-input"
            //   label="Confirm Password"
              value={loginData.cpassword}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
