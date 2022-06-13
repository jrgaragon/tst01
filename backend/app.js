const instagramService = require("./services/instagramService");
const openConnection = require("./services/dal");
console.log(
  "******************************************START******************************************"
);

openConnection().then(async (_) => {
    const instagram = new instagramService();
    instagram.getSavedItems('master');
});



console.log(
  "******************************************END******************************************"
);
