const baseService = require("./baseService");
const User = require("../models/user");
const utils = require("./utilities");
const u = utils.getInstance();

class userService extends baseService {
  constructor(owner) {
    super();
    this.duplicate = false;
    this.duplicates = [];
    this.component = "userServivce.js";
    this.owner = owner;
  }

  async getUsers(filter) {
    const users = await User.find(filter);
    return users;
  }

  async getUsers() {
    const users = await User.find({});
    return users;
  }

  async exists(userName) {
    const user = await User.findOne({ username: userName });
    return user !== null;
  }

  async crateUser(user) {
    if (!await this.exists(user.username)) {
      const userDB = new User(user);
      return userDB.save();
    }    
  }
}

module.exports = userService;
