import { faker } from '@faker-js/faker';

import { PieChart,pieArcLabelClasses } from '@mui/x-charts/PieChart';

import { Box, Button, Card, Divider, Grid, IconButton, Paper, Stack, TextField } from '@mui/material';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
// import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import Iconify from 'src/components/iconify';
// import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { useEffect, useState } from 'react';
import Cardmenu from '../card-create';
import axios from 'axios';
// ----------------------------------------------------------------------



export default function AppView() {
  const [itemData, setItemData] = useState([]);
 useEffect(()=>{
  countData();
 },[]);


  const countData=async()=>{
    try{
    const countValue=await axios.get("http://localhost:4001/api/value")
    console.log(countValue.data);
    setItemData(countValue.data);
    }
    catch(error){
      console.error("Error getting value")
    }
  }
  const data1 = [
    { label: 'Folders', value: itemData.folderCount },
    { label: 'File', value: itemData.fileCount },
    
  ];
  
  const series = [
    {
      innerRadius: 0,
      outerRadius: 200,
      id: 'series-1',
      data: data1,
      arcLabel:(item)=>`${item.label} (${item.value})`,
      arcLabelMinAngle: 45,
    },
  ];
  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 5, mt: 2 }}
      >
        <Typography variant="h4">Dashboard 👋</Typography>
      </Stack>
     <Card>
     <Grid container >
      <Grid item xs={12} sm ={6} lg={12}>
        <Box component="div" sx={{display:"flex"}}>
        <PieChart series={series} width={600} height={600} 
        // onItemClick={
        //   (event,d)=> {setItemData(d);console.log(d)}}
        //   sx={{
        //     [`& .${pieArcLabelClasses.root}`]: {
        //       fill: 'white',
        //       fontWeight: 'bold',
        //     },
        //   }}
          /></Box>
      </Grid>
  
     </Grid></Card>
    </Container>
  );
}
