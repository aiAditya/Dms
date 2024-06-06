import Button from '@mui/material/Button';
import { users } from 'src/_mock/user';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Iconify from 'src/components/iconify';
import { Box, Dialog, FormLabel, Grid, Popover, Radio, TextField } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import Typography from '@mui/material/Typography';
import Filecard from '../new-card';
export default function CreateButton(){
return (
    <>
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
        <Box component="form" sx={{px:3,py:3,width:600}}>
     <FormControl >
      <FormLabel >Select any one type</FormLabel>
      
      <RadioGroup row defaultValue="Folders" value={value} onChange={handleChange}  >
        <FormControlLabel value="Folders" control={<Radio/>} label="Folders"/>
        <FormControlLabel value="Files" control={<Radio/>} label="Files"/>
      </RadioGroup>
     
     </FormControl>
    {  
    value==="Folders"?
 <Box>
         <Typography variant='h5' mb={2}>Add Folder Name</Typography>
         
         <TextField required id="outlined-required" label="Name of file" fullWidth="true"
          onChange={(event)=>{setFileData(event.target.value);}}
          value={fileData}
         
         />
         <br />
         <br />
         <Typography variant='h5' mb={2}>Description</Typography>
        
         <TextField required   id="outlined-required" label="Description of file" fullWidth="true"
          value={descData} onChange={(e)=>{setDescData(e.target.value)}} />
        <Button variant='outlined' sx={{mt:2}} onClick={handleSubmit}>Submit</Button></Box>
        :
        <Box component="div" display="block" mt={3} >
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
          </Box>

      }
        </Box>
      </Popover>
      </Dialog>
      
    </>
)
}