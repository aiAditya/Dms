import { Box, Card, Checkbox, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types'

import folder from '/assets/images/open-folder.png';
import Iconify from 'src/components/iconify';
import { Link } from 'react-router-dom';
import file from '/assets/images/file.jpg'



export default function Filecard( {title,handleCurrentFolderId,deleteFolder,id,onDelete,value,onSetUrl,url,setPath ,updateFavorites,isFavorite} ){

const [open,setOpen]=useState(null)
const [close,setClose]=useState(false)
const [isChecked,setIsChecked]=useState(false)

const handleChange=(e)=>{
setIsChecked(e.target.checked);
updateFavorites(id);
}
const handleClick=(event)=>{
    setOpen(event.currentTarget)
}

 const handleCloseMenu=()=>{
  console.log(id)
  console.log("hello")
  setOpen(null)
  console.log("deleted")
  
}
const deleteButton=()=>{
  onDelete(id)
  setOpen(null)
}

const handleUrl=()=>{
  onSetUrl(url)
  setPath(title)
}

    return (
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
        <Stack spacing={0.5}  alignItems="center">
          {value==="folder"?(
          <Link to={`/roots/${id}`} onClick={()=>{handleCurrentFolderId();setPath({title,newId:id}) ;console.log(title)}}>
             <img src={folder} alt='folder' width={64} height={64} /></Link> 
           ) :(
            <Box sx={{cursor:"pointer"}}onClick={handleUrl}> <img src={file} alt='file' width={64} height={64} /></Box>
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem  onClick={deleteButton}>
          <Iconify icon="eva:trash-2-outline" sx={{mr:1}}/>
          Delete
          </MenuItem>
        </Popover>

    
        </Card>
    );
}
Filecard.propTypes={
    title:PropTypes.any,
    handleCurrentFolderId:PropTypes.func,
    deleteFolder: PropTypes.func,
    id:PropTypes.string,
    onDelete: PropTypes.func,
    value:PropTypes.string,
    url: PropTypes.string,
    onSetUrl: PropTypes.func,
    setPath: PropTypes.func,
}