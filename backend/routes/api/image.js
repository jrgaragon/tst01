const ImageService = require("../../services/imageService");
const InstagramService = require("../../services/instagramService");

module.exports = (app) => {

  app.get("/instagram/api/image", (req, res) => {
    res.send("/instagram/api/image");
  });

  app.post("/instagram/api/image/getimages", async (req, res) => {
    const imageService = new ImageService("master");
    const images = await imageService.getImagesByPage({...req.body});

    res.json(images);
  });

  app.post("/instagram/api/image/getimagepages", async (req, res) => {
    const imageService = new ImageService("master");
    console.log({ ...req.body })
    const pages = await imageService.getPages({ ...req.body });

    res.json({ pages: pages });
  });

  app.post("/instagram/api/image/getimage", async (req, res) => {
    const imageService = new ImageService("master");
    //console.log(req.body.id)
    const image = await imageService.getImagesById(req.body.id);

    res.json(image);
  });

  app.post("/instagram/api/image/download", async (req, res) => {
    const instagram = new InstagramService("master");
    await instagram.getSavedItems();

    res.json({
      status: 0,
      message: "success",
    });
  });
}