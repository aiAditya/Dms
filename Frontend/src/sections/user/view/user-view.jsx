/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';

import Cardmenu from 'src/sections/overview/card-create';

import { users } from 'src/_mock/user';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Iconify from 'src/components/iconify';
import { Box, Dialog, FormLabel, Grid, Popover, Radio, TextField } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import styled from '@emotion/styled';
import { Outlet, Route, Routes, useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Subfolder from '../subfolderpage/subfolder';
import Folder from '../Folder/Folder';
import Breadcrumb from '../breadcrumb/Breadcrumb';

// eslint-disable-next-line import/order
import { SearchContext } from 'src/contextprovider/searchquery';

// ----------------------------------------------------------------------

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

export default function UserPage() {


  const [currentPath, setCurrentPath] = useState([]);
  const [pathName, setPathName] = useState({ title: 'Root', newId: null });
  const [value, setValue] = useState('folder');
  const [descData, setDescData] = useState('');
  const [fileData, setFileData] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState('');
  const [folders, setFolder] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
 const {filter}=useContext(SearchContext);
 const [filterFolders, setFilterFolders] = useState([]);
 
  useEffect(() => {
    

    const fetchData = async () => {
      const data = await fetchDataByParentId(currentFolderId);
      setFolder(data);
      
      // console.log(currentPath,"currentPath")
      // console.log(currentFolderId,"currentFolderId");
    };
    
      fetchData();
    
    console.log('render');
  }, [currentFolderId, location, pathName, currentPath]);

  useEffect(() => {
    console.log(currentPath, 'currentPath of this useEffect');
  }, [currentPath]);
 

 useEffect(()=>{
  let pathNameAdded = false;
  if (!currentPath.includes(pathName) && !pathNameAdded) {
    setCurrentPath((current) => [...current, pathName]);
    pathNameAdded = true; // Mark pathName as added
  }
 },[pathName])

useEffect(()=>{
  const filtered = folders.filter(folder =>
    folder.name.toLowerCase().includes(filter.toLowerCase())
  );
  setFilterFolders(filtered);

},[filter,folders])


  const handleFileData = (e) => {
    setFileData(e.target.value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   
    console.log(anchorEl);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handlePathClick = (index, paths) => {
    console.log(currentPath, index, 'oldCurrentPath');
    // if (index === 0) {
    //   setCurrentFolderId(null);
    //   console.log(currentPath, 'hello world');
    // } else {
      // Create a new array by slicing the currentPath array
      const newPath = currentPath.slice(0, index + 1);
      console.log(newPath, 'new currentPath');

      // Update state with the new array
      setCurrentPath(newPath);
      setCurrentFolderId(newPath[index].newId);
      navigate(`/roots/${newPath[index].newId}`);
    
  };

  // console.log(currentPath, "currentPath of the current path");

  const fetchDataByParentId = async (folderId) => {
    try {
      const response = await axios.get('http://localhost:4001/api/folders', {
        params: {
          parentId: folderId,
        },
      });
      // console.log("response after data fetch",response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const url = 'http://localhost:4001/api/data';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: fileData,
      types: value,
      // descriptionOfFile: descData,
      // path: location.pathname,
      parentId: currentFolderId,
    };
    console.log(data);
    try {
      const response = await axios.post(url, data);

      console.log(response.data);
      console.log(location.pathname); // Handle the response data as needed
    } catch (error) {
      console.error('Error posting data:', error);
    }
    handleClose();
    const data1 = await fetchDataByParentId(currentFolderId);
    setFolder(data1);
    setFileData('');
    setDescData('');
    toast.success("folder successfully created");
  };

  const deleteData = async (folderId) => {
    console.log('deleteData', folderId);
    try {
      const response = await axios.delete('http://localhost:4001/api/deletes', {
        params: { id: folderId },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    const data1 = await fetchDataByParentId(currentFolderId);
    setFolder(data1);
    toast.success("folder deleted successfully ");
    
  };

  // file favorite folder
  const updateFavorites = async (folderId) => {
    try {
      const response = await axios.put(`http://localhost:4001/api/${folderId}/favorite`);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
    const data1 = await fetchDataByParentId(currentFolderId);
    setFolder(data1);
    toast.success("favorite folder successfully")
  };

  // file upload function for uploading files

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('parentId', currentFolderId);

    try {
      await axios.post('http://localhost:4001/api/upload-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data1 = await fetchDataByParentId(currentFolderId);
      setFolder(data1);
    } catch (error) {
      console.error('Error uploading file', error);
    }
    // handleClose();
  };

  const handleFileChange = (e) => {
    handleFileUpload(e.target.files[0]);
    console.log('changed file', e.target.files[0]);
    handleClose(); //
    toast.success("File Uploaded Successfully");
  };

  const handleOpenFile = (newUrl) => {
    window.open(newUrl, '_blank');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container maxWidth="xl">
      <Toaster position="top-right"
  reverseOrder={false}/>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 5, mt: 2 }}
      >
        <Breadcrumb path={currentPath} handlePathClick={handlePathClick} />
        {/* <Typography variant="h4">{pathName} </Typography> */}
        <Stack direction="row" spacing={2}>
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
                <FormControl>
                  <FormLabel>Select any one type</FormLabel>

                  <RadioGroup row defaultValue="folder" value={value} onChange={handleChange}>
                    <FormControlLabel value="folder" control={<Radio />} label="Folders" />
                    <FormControlLabel value="file" control={<Radio />} label="Files" />
                  </RadioGroup>
                </FormControl>
                {value === 'folder' ? (
                  <Box>
                    <Typography variant="h5" mb={2}>
                      Add Folder Name
                    </Typography>

                    <TextField
                      required
                      id="outlined-required"
                      label="Name of file"
                      fullWidth="true"
                      onChange={handleFileData}
                      value={fileData}
                    />
                    <br />
                    <br />
                    <Typography variant="h5" mb={2}>
                      Description
                    </Typography>

                    <TextField
                      required
                      id="outlined-required"
                      label="Description of file"
                      fullWidth="true"
                      value={descData}
                      onChange={(e) => {
                        setDescData(e.target.value);
                      }}
                    />
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Box>
                ) : (
                  <Box component="div" display="block" mt={3}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<Iconify icon="eva:upload-fill" />}
                    >
                      Upload file
                      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                    </Button>
                  </Box>
                )}
              </Box>
            </Popover>
          </Dialog>
        </Stack>
      </Stack>
      {/* <Outlet/> */}
      <Routes>
        {/* <Route  path="" element={ <Subfolder folders={folders} handleOpenFile={handleOpenFile} setCurrentFolderId={setCurrentFolderId} deleteData={deleteData}/>}/> */}
        <Route
          path={`:${currentFolderId}?`}
          element={
            <Subfolder
              filterFolders={filterFolders}
              folders={folders}
              handleOpenFile={handleOpenFile}
              setPath={setPathName}
              updateFavorites={updateFavorites}
              setCurrentFolderId={setCurrentFolderId}
              deleteData={deleteData}
             
            />
          }
        />
      </Routes>
    </Container>
  );
}

