const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer=require("multer");
const { Types } = mongoose;
const cors = require("cors");

const app = express();
app.use(express.json());
const File = require("./model/model.js");

dotenv.config();

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = req.body.folderPath || 'uploads';
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage ,dest: 'uploads/'});


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve the uploaded files statically














// Mongoose connection section
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("error connecting to database", err);
  });

// Models importing and working with models
const populateContent = async (folder) => {
  await folder.populate("content").execPopulate();
  await Promise.all(folder.content.map(populateContent));
  return folder;
};

app.get("/api/folders", async (req, res) => {
  const {parentId}=req.query;
  console.log(parentId);
  try {
    let query;
    if (parentId && Types.ObjectId.isValid(parentId)) {
      query = { parent: parentId };
    } else if (!parentId) {
      query = { parent: null };
    } else {
      return res.status(400).json({ error: 'Invalid parentId' });
    }
    const folders = await File.find(query).populate("content");
    // const path = [];
    // let currentFolder = folders;

    // while (currentFolder) {
    //   path.unshift(currentFolder);
    //   currentFolder = await File.findById(currentFolder.parent);
    // }
    // console.log(folders);
    // res.json({ folders: folders,path});
  
    res.json(folders);
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
});

//favorites api

app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await File.find({ isFavorite: true });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
app.get("/api/value", async (req, res) => {
  try {
    const folderCount = await File.countDocuments({ type: "folder" });
    const fileCount = await File.countDocuments({ type: "file" });
    res.status(200).json({ folderCount: folderCount, fileCount: fileCount});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/data", async (req, res) => {
  const { name, parentId, types ,isChecked} = req.body;
  console.log("Request Body:", req.body);
  try {
    const parentFolder = parentId ? await File.findById(parentId) : null;
    const folderPath = parentFolder
      ? `${parentFolder.path}/${name}`
      : `${name}`;

    const newFolder = new File({
      name,
      type: types,
      path: folderPath,
      parent: parentId || null,
      isFavorite: isChecked,
    });
    await newFolder.save();
    console.log("file created successfully");

    if (parentFolder) {
      parentFolder.content.push(newFolder._id);
      await parentFolder.save();
    }
    res
      .status(201)
      .json({ message: "folder created successfully", folder: newFolder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//delete Api

app.delete("/api/deletes",async(req, res) => {
  const {id}=req.query;
  console.log(id)
  try{
    console.log("id:",id)
   const result= await File.findByIdAndDelete({_id:id})
   console.log(result)
   res.status(200).json({ message:"folder deleted successfully"})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message});
  }
})  

app.post('/api/upload-file', upload.single('file'), async (req, res) => {
  const { originalname: name } = req.file;
  const { parentId } = req.body;

  try {
    const parentFolder = parentId ? await File.findById(parentId) : null;
    const filePath = parentFolder ? `${parentFolder.path}/${name}` : `/${name}`;
    const fileUrl = `http://localhost:4001/uploads/${req.file.filename}`; 

    const newFile = new File({
      name: name,
      type: 'file',
      path: filePath,
      parent: parentId || null,
      url: fileUrl,
      
    });

    await newFile.save();
    console.log(newFile.name);

    if (parentFolder) {
      parentFolder.content.push(newFile._id);
      await parentFolder.save();
    }

    res.status(201).json(newFile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.put('/api/:id/favorite',async(req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    
    file.isFavorite = !file.isFavorite;
    await file.save();
    
    res.status(200).json(file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});



app.listen(port, (err) => {
  if (err) {
    console.error("error listening on port", err);
    process.exit(1);
  }
  console.log("listening on port " + port);
});
