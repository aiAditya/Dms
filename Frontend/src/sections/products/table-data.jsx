import { Checkbox, IconButton, MenuItem, Popover, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types"
import { useState } from "react";
import Iconify from "src/components/iconify";

export default function TableData({id,name,owner,size}){
const [open,setOpen]=useState(null);

const handleClick=(event)=>{
    setOpen(event.currentTarget)
}
const handleCloseMenu=()=>{
    setOpen(null);
}
    return (
        <TableRow key={id}>
            <TableCell padding="checkbox">
            <Checkbox/>
            </TableCell>
            <TableCell>
             {name}
             <Checkbox defaultChecked color="success"icon={<Iconify  icon="mi:favorite" />} checkedIcon={<Iconify icon="uis:favorite" />}/>
          
            </TableCell>
            <TableCell>
             {owner}
            </TableCell>
            <TableCell>
             /{size}
            </TableCell>
            <TableCell>
                <IconButton onClick={handleClick}>
                    <Iconify icon="eva:more-vertical-fill"/>
                </IconButton>
                <Popover open={open} anchorEl={open}
                
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical:"center",
                    horizontal:"left",
                }}
                transformOrigin={{
                    vertical:"top",
                    horizontal:"right",
                }}
                PaperProps={{
                    sx: { width: 140 },
                  }}
                >
                    <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:trash-2-outline" sx={{mr:2}}/>
          Delete
          </MenuItem>
                </Popover>
            </TableCell>
        </TableRow>
    )
};


TableData.propTypes={
    id:PropTypes.any,
    name:PropTypes.any,
    size:PropTypes.any,
    owner:PropTypes.any,
};