const baseService = require("./baseService");
const User = require("../models/user");
const utils = require("./utilities");
const u = utils.getInstance();

class userService extends baseService {
  constructor(owner) {
    super();
    this.duplicate = false;
    this.component = "userServivce.js";
    this.owner = owner;
  }

  async getUsers(filter) {
    const users = await User.find(filter);
    return users;
  }

  async getUsersByPage(page) {
    let users = await User.find({}).lean();
    let usersThumb64 = [];

    usersThumb64 = users.map((u) => {
      let tempUser = {...u};
      
      tempUser.thumbnail64 = `data:image/png;base64, ${u.thumbnail.toString(
        "base64"
      )}`;
      delete tempUser.thumbnail;

      return tempUser;
    });

    return usersThumb64;
  }

  async exists(userName) {
    const user = await User.findOne({ username: userName });
    return user !== null;
  }

  async crateUser(user) {
    if (!(await this.exists(user.username))) {
      const userDB = new User(user);
      return userDB.save();
    }
  }
}

module.exports = userService;
