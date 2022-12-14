// import { MongoDBContainer } from "../../Containers/index.js";
const MongoDBContainer = require('../../Containers/MongoDbContainer')
// import { UserModel } from "../../models/index.js";
const UserModel = require('../../models/UserModel')
module.exports = class UsersMongo extends MongoDBContainer {
  constructor() {
    super({
      name: UserModel.UserCollection,
      schema: UserModel.UserSchema,
    });
  }
}
