const baseService = require("./baseService");
const Model = require("../models/model");
const utils = require("./utilities");
const u = utils.getInstance();

class modelService extends baseService {
  constructor(owner) {
    super();
    this.duplicate = false;
    this.duplicates = [];
    this.component = "modelServivce.js";
    this.owner = owner;
  }

  async getModels(filter) {
    const users = await Model.find(filter);
    return users;
  }

  async getModelByPage(page) {
    let models = await Model.find({}).lean();
    let modelThumb64 = [];

    modelThumb64 = models.map((u) => {
      let tempModel = {...u};
      
      tempModel.thumbnail = `data:image/png;base64, ${u.thumbnail.toString(
        "base64"
      )}`;
      //delete tempModel.thumbnail;

      return tempModel;
    });

    return modelThumb64;
  }

  async exists(userName) {
    const model = await Model.findOne({ username: userName });
    return model !== null;
  }

  async crateModel(model) {
    if (!(await this.exists(model.username))) {
      const modelDB = new Model(model);
      return modelDB.save();
    }
  }
}

module.exports = modelService;
