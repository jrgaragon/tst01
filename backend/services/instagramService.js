const baseService = require("./baseService");
const Image = require("../models/image");
const sharp = require("sharp");
const axios = require("axios");
const utils = require("./utilities");
const u = utils.getInstance();
const InstragramSession = require("./instagramSession");
const ModelService = require("./modelService");

class instagramService extends baseService {
  constructor(owner) {
    super();
    this.duplicate = false;
    this.duplicates = [];
    this.component = "instagramServie.js";
    this.owner = owner;
    this.session = new InstragramSession(this.owner);
    this.modelService = new ModelService(this.owner);
  }

  async getSavedItems() {
    const ig = await this.session.getSession();
    const feed = ig.feed.saved();
    const promises = [];

    do {
      const items = await feed.items();
      const images = await this.scrapItems(items);

      for (const result of images) {
        await this.saveModel(result);

        for (const image of result) {
          promises.push(this.saveImage(image));
        }
      }

      await Promise.all(promises);

      console.log("Waiting");
      await u.sleep(5000);
      console.log("Waiting Completed");
    } while (feed.isMoreAvailable() && !this.duplicate);

    console.log("DONE");
    return;
  }

  async saveModel(images) {
    for (const img of images) {
      await this.modelService.crateModel({
        id: u.guid(),
        username: img.username,
        thumbnail: img.thumbnail,
        publishedCount: 0,
        type: "model",        
        owner: this.owner,
      });
    }
  }

  async saveImage(image) {
    if (!(await Image.exists({ pk: image.pk, owner: this.owner }))) {
      const imagedb = new Image(image);
      await imagedb.save();
    } else {
      this.duplicate = true;
    }
  }

  async scrapItems(items) {
    let result = [];
    let promises = [];

    for (let item of items) {
      let user = await item.user.username;

      let itemdb = {
        idPost: item.id,
        pkPost: item.pk,
        code: item.code,
        username: user,
        caption: this.getCaption(item),
      };

      if (item.carousel_media && item.carousel_media.length > 0) {
        promises.push(this.scrapCarousel(item.carousel_media, itemdb));
      } else {
        promises.push(this.scrapImage(item, itemdb));
      }
    }

    result = await Promise.all(promises);
    return result;
  }

  async scrapCarousel(carousel, mainItem) {
    const images = [];
    for (let media of carousel) {
      let image = media.image_versions2.candidates[0];
      let imageBuffer = await this.getImage(image.url);

      let imagedb = {
        id: media.id,
        pk: media.pk,
        width: image.width,
        height: image.height,
        url: image.url,
        image: imageBuffer.data,
        size: imageBuffer.data.length,
        thumbnail: await sharp(imageBuffer.data).resize(180, 290).toBuffer(),
        owner: this.owner,
      };

      images.push({ ...mainItem, ...imagedb });
    }

    return images;
  }

  async scrapImage(image, mainItem) {
    const images = [];
    let imageCandidate = image.image_versions2.candidates[0];
    let imageBuffer = await this.getImage(imageCandidate.url);
    let imagedb = {
      id: image.id,
      width: imageCandidate.width,
      height: imageCandidate.height,
      url: imageCandidate.url,
      image: imageBuffer.data,
      size: imageBuffer.data.length,
      thumbnail: await sharp(imageBuffer.data).resize(180, 290).toBuffer(),
      owner: this.owner,
    };
    images.push({ ...mainItem, ...imagedb });
    return images;
  }

  getCaption(item) {
    if (item.caption && item.caption.text) return item.caption.text;
    else {
      return "";
    }
  }

  getImage(uri) {
    return axios.get(uri, {
      responseType: "arraybuffer",
      timeout: 1000 * 30,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 Edg/83.0.478.61",
    });
  }
}

module.exports = instagramService;
