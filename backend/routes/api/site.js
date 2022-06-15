const ModelService = require("../../services/modelService");
const InstagramService = require("../../services/instagramService");

module.exports = (app) => {

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.post("/instagram/api/site/getmodels", async (req, res) => {
    const modelService = new ModelService("master");
    const models = await modelService.getModelByPage(req.body.page);

    res.json(models);
  });

  app.post("/instagram/api/site/download", async (req, res) => {
    const instagram = new InstagramService("master");
    await instagram.getSavedItems();

    res.json({
      status: 0,
      message: "success",
    });
  });
};
