const baseService = require("./baseService");
const Image = require("../models/image");
const utils = require("./utilities");
const u = utils.getInstance();

class imageService extends baseService {
  constructor(owner) {
    super();
    this.duplicate = false;
    this.duplicates = [];
    this.component = "imageServivce.js";
    this.owner = owner;
  }

  async getImagesByPage({ username, page, pageSize }) {
    let images = await Image.find({ username: username, owner: this.owner })
      .sort({ username: "asc" })
      .skip(page * pageSize)
      .limit(pageSize)
      .lean();

    let imagesThumb64 = [];

    imagesThumb64 = images.map((u) => {
      let tempImage = { ...u };
      tempImage.thumbnail = `data:image/png;base64, ${u.thumbnail.toString("base64")}`;
      return tempImage;
    });

    return imagesThumb64;
  }

  async getImagesById(id) {
    let image = await Image.findOne({ id: id, owner: this.owner }).lean();

    delete image.thumbnail;
    image.image = `data:image/png;base64, ${image.image .toString("base64")}`;

    return image;
   
  }
}

module.exports = imageService;
