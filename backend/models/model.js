"use strict";
const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
  id: String,
  username: String,
  created: {
    type: Date,
    default: Date.now
  },
  thumbnail: Buffer,
  favorite: {
    type: Boolean,
    default: false
  },  
  publishedCount: Number,
  status: {
    type: String,
    enum: ["secure", "notsecure", "unknown", "sharer"],
    default: "unknown"
  },
  caption: {
    type: String,
    default: `CN [[USERNAME]]
        
        
        [[TAGS]]`
  },
  type: String,  
  owner: String
});

const Model = mongoose.model("Model", modelSchema);

module.exports = Model;