const baseService = require("./baseService");
const Session = require("./sessionService");
const IG_API = require("instagram-private-api");
const fs = require("fs");

class InstagramSession extends baseService {
  constructor(owner) {
    super();
    this.component = "instagramSession.js";
    this.owner = owner;
    this.user = "dev_ig_01";
    this.password = "er!Emg24$ZFj";
    this.session = new Session(owner);
  }

  async existIntagramSession() {
    return await this.session.exists(this.user);
  }

  async getIntagramSession() {
    const session = await this.session.get(this.user);   
    return session;
  }

  async setIntagramSession(value) {
    delete value.constants;
    await this.session.set(this.user, value);    
  }

  async getSession() {
    const ig = new IG_API.IgApiClient();
    ig.state.generateDevice(this.owner);

    if (await this.existIntagramSession()) {
      try {
        await ig.simulate.preLoginFlow();
        const session = await this.getIntagramSession();       
        await ig.state.deserialize(session);
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
