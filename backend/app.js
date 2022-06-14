const express = require('express');
const instagramService = require("./services/instagramService");
const openConnection = require("./services/dal");
const app = express();
console.log(
  "******************************************START******************************************"
);

require('./routes/api/site')(app);

openConnection().then(async (_) => {
    //const instagram = new instagramService('master');
    //instagram.getSavedItems();
    
    app.listen(3000);

});



console.log(
  "******************************************END******************************************"
);
