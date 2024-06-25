import { Box, Card, Checkbox, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import Iconify from 'src/components/iconify';

// eslint-disable-next-line import/no-absolute-path
import folder from '/assets/images/open-folder.png';
import PropTypes from 'prop-types'

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function ProductCard({deleteData,value,id,title,isFavorite,path,updateData,url,newData,favoriteUrl,handleFavoriteOpenFile}){
   const [open,setOpen]=useState(null);
   const [close,setClose]=useState(false)
   const [isChecked,setIsChecked]=useState();
    const handleChange=(e)=>{
        setIsChecked(e.target.checked);
        updateData(id);
       
        console.log("llooo")
        }
        const handleClick=(event)=>{
            setOpen(event.currentTarget)
        }
        
         const handleCloseMenu=()=>{
        //   console.log(id)
          console.log("hello")
          setOpen(null)
          console.log("deleted")
          
        }
        const deleteButton=()=>{
         deleteData(id)
          setOpen(null)
        }
        const handleUrl=async()=>{
          await handleFavoriteOpenFile(favoriteUrl)
        }

    return(
        <Card
        component={Stack}
        
        direction="row"
        sx={{
          px: 3,
          py: 2,
          
          
        }}
        justifyContent="center"
        onMouseEnter={() => setClose(true)}
        onMouseLeave={() => setClose(false)}
      >
        <Stack spacing={0.5} direction="column" alignItems="center">
          {/* <img src={value==="folder"?folder:file} alt=''width={64}height={64}/>
          <Typography variant="sub-variant">{title}
           <Checkbox color="success" checked={isFavorite} onChange={handleChange} icon={<Iconify  icon="mi:favorite" />} checkedIcon={<Iconify icon="uis:favorite" />}/>
          </Typography> */}
        
        {value==="folder"?(
          <Link to={`/starred/${title}`} onClick={()=>{newData(id) ;console.log(title)}}>
             <img src={folder} alt='folder' width={64} height={64} /></Link> 
           ) :(
            <Box sx={{cursor:"pointer"}} onClick={handleUrl}> <img src={`/assets/images/${url.split(".")[1]}.png`} alt='file' width={64} height={64} /></Box>
           )
            }
          <Typography variant="sub-variant">{title}
           <Checkbox color="success" checked={isFavorite} onChange={handleChange} icon={<Iconify  icon="mi:favorite" />} checkedIcon={<Iconify icon="uis:favorite" />}/>
          </Typography>
        </Stack>
        {close && 
        <Box sx={{position:"absolute",right:"8px"}}>
        <IconButton onClick={handleClick} >
        <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>
        </Box>}
        <Popover 
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        
        anchorOrigin={{
          vertical:"top",
          horizontal:"left",
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 140 },
        }}
        >
        {/* <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 1 }} />
          Edit
        </MenuItem> */}
        <MenuItem  onClick={deleteButton}>
          <Iconify icon="eva:trash-2-outline" sx={{mr:1}}/>
          Delete
          </MenuItem>
        </Popover>

    
        </Card>
    );
}

ProductCard.propTypes={
    id:PropTypes.any,
    deleteData: PropTypes.func,
    value: PropTypes.string,
    title: PropTypes.string,
    isFavorite: PropTypes.bool,
    path: PropTypes.string,
    updateData: PropTypes.func,
    url:PropTypes.string,
}