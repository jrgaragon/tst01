const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  id: String,
  idPost: String,
  caption: String,
  code: String,
  pk: String,
  pkPost: String,
  image: Buffer,
  url: String,
  created: {
    type: Date,
    default: Date.now
  },
  width: Number,
  height: Number,
  thumbnail: Buffer,
  username: String
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;