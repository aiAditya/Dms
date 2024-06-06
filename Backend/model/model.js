const mongoose = require("mongoose");

// Use destructuring to get the Schema object directly from mongoose
const { Schema } = mongoose;

const fileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["file", "folder"] },
  path: { type: String, required: true },
  url: { 
    type: String,
    validate: {
      validator: function(v) {
        if (this.type === "file") {
          return !!v; // URL is required for files
        }
        return true; // URL is not required for folders
      },
      message: props => `URL is required for files.`,
    },
  }, 
  parent: { type: Schema.Types.ObjectId, ref: "File", default: null },
  content: [{ type: Schema.Types.ObjectId, ref: "File" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isFavorite: { type: Boolean, default: false },
});

fileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
