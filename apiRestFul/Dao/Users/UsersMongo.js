// import { MongoDBContainer } from "../../Containers/index.js";
const {MongoDbContainer} = require('./../../Containers/MongoDbContainer.js')
// import { UserModel } from "../../models/index.js";
const {UserModel} = require('./../../models/UserModel.js')
module.exports =  class UsersMongo extends MongoDbContainer {
    constructor() {
      super({
        name: UserModel.UserCollection,
        schema: UserModel.UserSchema
      });
    }
  }

