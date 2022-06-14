const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  id: String,
  username: String,
  value: String,
  created: {
    type: Date,
    default: Date.now,
  },
  owner: String,
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
