const mongoose = require('mongoose');
const hasher = require('crypto-js');

class adminUser {
  constructor(_id, adminUserModel) {
    this.adminUserModel = adminUserModel;
    this._id = _id;
  }

  async validate() {
    try {
      if (mongoose.Types.ObjectId.isValid(this._id)) {
        const user = await this.adminUserModel.findById(this._id);
        if (user) {
          this.data = user;
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error(e);
    }
  }

  async login(body, cookies) {
    try {
      const user = await this.adminUserModel.findOne({
        email: `${body.email}`
      })

      if (!user) return;
      else if (user.password == hasher.SHA256(body.password)) {
        cookies.set('id', `${user._id}`)
      }
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = adminUser;
