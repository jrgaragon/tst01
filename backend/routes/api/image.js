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

  app.post("/instagram/api/image/download", async (req, res) => {
    const instagram = new InstagramService("master");
    await instagram.getSavedItems();

    res.json({
      status: 0,
      message: "success",
    });
  });
}