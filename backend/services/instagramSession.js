const baseService = require("./baseService");
const IG_API = require("instagram-private-api");
const fs = require("fs");

class InstagramSession extends baseService {
  constructor(owner) {
    super();
    this.component = "instagramSession.js";
    this.owner = owner;
    this.user = "Igloo001209";
    this.password = "2547y7n704";
  }

  async existIntagramSession() {
    return fs.existsSync("session.json");
  }

  async getIntagramSession() {
    const session = fs.readFileSync("session.json", "utf-8");
    return session;
  }

  async setIntagramSession(value) {
    delete value.constants;
    fs.writeFileSync("session.json", JSON.stringify(value), "utf-8");
  }

  async getSession(user) {
    const ig = new IG_API.IgApiClient();
    ig.state.generateDevice(user);

    ig.request.end$.subscribe(async () => {
      // const serialized = await ig.state.serialize();
      // this.setIntagramSession(serialized);
    });

    if (await this.existIntagramSession()) {
      try {
        await ig.simulate.preLoginFlow();
        await ig.state.deserialize(this.getIntagramSession());
        await ig.user.info(ig.state.cookieUserId)
        await ig.account.currentUser();
      } catch (e) {
        console.log(e.message);
        await ig.account.login(this.user, this.password);
        const serialized = await ig.state.serialize();
        this.setIntagramSession(serialized);
      }
    } else {
      await ig.account.login(this.user, this.password);
      const serialized = await ig.state.serialize();
      this.setIntagramSession(serialized);
    }
    return ig;
  }
}

module.exports = InstagramSession;
