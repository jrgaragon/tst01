const ModelService = require("../../services/modelService");
const InstagramService = require("../../services/instagramService");

module.exports = (app) => {

  app.get("/", (req, res) => {
    res.send("Hello World");
  });
};
