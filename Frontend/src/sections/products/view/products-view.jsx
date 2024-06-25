import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, Checkbox, Dialog, Popover, Table, TableContainer, TableHead, TablePagination, TextField, TableCell, TableRow } from '@mui/material';
import Iconify from 'src/components/iconify';
import styled from '@emotion/styled';
import Scrollbar from 'src/components/scrollbar';

import axios from 'axios';
import Filecard from 'src/sections/user/new-card';
import ProductCard from '../productcard';
// eslint-disable-next-line import/order
import toast, { Toaster } from 'react-hot-toast';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ProductsView() {
  
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchData();
  }, [])
 
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/favorites")
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  }
  const deleteData=async(folderId)=>{
  try {
    const response = await axios.delete('http://localhost:4001/api/deletes', {
      params: { id: folderId },
    });
      toast.success("data deleted successfully")
     console.log(response.data);
  } catch (error) {
    console.error(error);
  }
 await fetchData();
  }

 const updateData=async(folderId)=>{
  try{
  const response =await axios.put(`http://localhost:4001/api/${folderId}/favorite`)
  console.log(response.data);
  
}catch(error){
  console.error(error);
}
toast.success("Item unfavorite successfully")
  fetchData();
 }

 const newData=async(folderId)=>{
  console.log(folderId);
  try{
   const response= await axios.get("http://localhost:4001/api/folders",{
      params: { parentId: folderId }
    })
    setData(response.data)
  }catch(err){
    console.log(err)
  }
 };
 const handleFavoriteOpenFile = (newUrl) => {
  window.open(newUrl, '_blank');
};

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container maxWidth="xl">
      <div><Toaster/></div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 5, mt: 2 }}
      >
        <Typography variant="h4">Starred 👋</Typography>
        {/* <Stack direction="row" spacing={2}>
          <Button
            aria-describedby={id}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClick}
          >
            Create
          </Button>
          <Dialog onClose={handleClose} open={open}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 400, left: 800 }}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
            >
              <Box component="form" sx={{ px: 3, py: 3, width: 600 }}>
                <Typography>Add Classification List</Typography>
                <TextField required id="outlined-required" label="Name of file" fullWidth />
                <br />
                <br />
                <Typography>Description</Typography>
                <TextField required id="outlined-required" label="Description of file" fullWidth />
              </Box>
            </Popover>
          </Dialog>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<Iconify icon="eva:upload-fill" />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Stack> */}
      </Stack>
      
        
         
          <Grid container spacing={3} mt={2}>
        
        {data && data.map((data1) => 
        <Grid item xs={12} sm={6} md={3} key={data1._id}>
           <ProductCard id={data1._id} title={data1.name}
            owner={data1.type} path={data1.path} value={data1.type}
            url={data1.url}
            isFavorite={data1.isFavorite}
            deleteData={deleteData}
            updateData={updateData}
            favoriteUrl={data1.url}
            newData={newData}
            handleFavoriteOpenFile={handleFavoriteOpenFile} 
             />
            </Grid>
        )}
  
  
        </Grid>
        
      
    </Container>
  );
}
