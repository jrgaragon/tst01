const baseService = require("./baseService");
const Session = require("../models/session");
const utils = require("./utilities");
const u = utils.getInstance();

class sessionService extends baseService {
  constructor(owner) {
    super();
    this.component = "sessionService.js";
    this.owner = owner;
  }

  async get(username) {
    const session = await Session.findOne({ username: username, owner: this.owner });

    if (session != null) {
      return session.value;
    }

    return null;
  }

  async set(username, value) {
    return Session.findOneAndUpdate(
      { username: username, owner: this.owner },
      {
        id: u.guid(),
        username: username,
        owner: this.owner,
        value: JSON.stringify(value),
      },
      { upsert: true, useFindAndModify: false }
    );

    //return session.save();
  }

  async exists(username) {
    const exists = (await this.get(username)) !== null;
    return exists;
  }

  async delete(username) {}
}

module.exports = sessionService;
