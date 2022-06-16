const ModelService = require("../../services/modelService");

module.exports = (app) => {

  app.get("/instagram/api/model", (req, res) => {
    res.send("/instagram/api/model");
  });

  app.post("/instagram/api/model/getmodels", async (req, res) => {
    const modelService = new ModelService("master");
    const models = await modelService.getModelByPage(req.body.page,  req.body.pageSize);

    res.json(models);
  });
}