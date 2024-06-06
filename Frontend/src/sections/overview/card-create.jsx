import React, { useState } from 'react';
import PropTypes from 'prop-types'

import Card from '@mui/material/Card';
import { Box, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material';

import folder from '/assets/images/open-folder.png';
import Iconify from 'src/components/iconify';

export default function Cardmenu({title}){

const [open ,setOpen]=useState(null);


  const handleClick =(event)=>{
    setOpen(event.currentTarget);
  }
const handleCloseMenu=()=>{
  setOpen(null);
}


    return (
        <Card
        component={Stack}
        spacing={3}
        direction="row"
        sx={{
          px: 3,
          py: 5,
          borderRadius: 2,
        }}
        justifyContent="space-between"
      >
        <Stack spacing={2} direction="row" alignItems="center">
        <img src={folder} alt='folder' width={64} height={64}/>
  
          <Typography variant="sub-variant">{title}</Typography>
  
        </Stack>
        <Box >
        <IconButton onClick={handleClick} >
        <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>
        </Box>
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:trash-2-outline" sx={{mr:1}}/>
          Delete
          </MenuItem>
        </Popover>
      </Card>
    )
}

Cardmenu.propTypes = {
    title: PropTypes.any,
}