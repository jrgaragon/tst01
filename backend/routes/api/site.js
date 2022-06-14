const UserService = require("../../services/userService");

module.exports = (app) => {
  app.get("/instagram/api/site/home", (req, res) => {
    res.send("Hello World");
  });

  app.post("/instagram/api/site/getusers", async (req, res) => {
    const userService = new UserService("master");
    const users = await userService.getUsersByPage(0);

    console.log(`users: ${users.length}`);
        
    res.json(users);
  });
};
