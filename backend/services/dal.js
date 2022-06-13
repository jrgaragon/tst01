const mongoose = require("mongoose");

const address = `mongodb://127.0.0.1:27017/instagram`;

const openConnection = async () => {
  mongoose.connect(address, process.mongoose);
  mongoose.connection.on("open", _ => console.log("connected"));
  mongoose.connection.on("error", err => console.error(err));
};

module.exports = openConnection;