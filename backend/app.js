const express = require("express");
var bodyParser = require("body-parser");
const instagramService = require("./services/instagramService");
const openConnection = require("./services/dal");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

console.log("******************************************START******************************************");

require("./routes/api/site")(app);

openConnection().then(async (_) => {
  //const instagram = new instagramService('master');
  //instagram.getSavedItems();

  app.listen(3001);
});

console.log("******************************************END******************************************");
