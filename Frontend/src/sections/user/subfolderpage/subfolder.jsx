import PropTypes from "prop-types";

import { Grid } from "@mui/material";
import Filecard from "../new-card";
export default function Subfolder({folders,setCurrentFolderId,deleteData,handleOpenFile,setPath,updateFavorites}){

    const handleDeleteFolder = async (folderId) => {
        // Call deleteData function with folder ID
        await deleteData(folderId);
      };
      const handleOpenFileData=async(newUrl)=>{
       await handleOpenFile(newUrl);
      }
     const handlePath=async(path,id)=>{
     await setPath(path,id)
     }
     const handleFavorites=async(folderId)=>{
        await updateFavorites(folderId);
     };
    return (
        <Grid container spacing={3} mt={2}>
        
        {folders.map((folder) => 
        <Grid item xs={12} sm={6} md={3} key={folder._id}>
           <Filecard title={folder.name} id={folder._id} setPath={handlePath} isFavorite={folder.isFavorite} updateFavorites={handleFavorites} onSetUrl={handleOpenFileData} onDelete={handleDeleteFolder} url={folder.url} value={folder.type}  handleCurrentFolderId={()=>{setCurrentFolderId(folder._id);}} />
            </Grid>
        )}
  
  
        </Grid>
    );
}

Subfolder.propTypes={
    folders: PropTypes.array,
    setCurrentFolderId: PropTypes.func,
    deleteData: PropTypes.func,
    handleOpenFile: PropTypes.func,
    setPath: PropTypes.func,
    // value:PropTypes.string,
    
}