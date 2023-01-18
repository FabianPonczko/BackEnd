// import { MongoDBContainer } from "../../Containers/index.js";
const {MongoDbContainer} = require('./Containers/MongoDbContainer')
// import { UserModel } from "../../models/index.js";
const {UserModel} = require('./../../Models/UserModel.js')
module.exports =  class UsersMongo extends MongoDbContainer {
    constructor() {
      super({
        name: UserModel.UserCollection,
        schema: UserModel.UserSchema
      });
    }
  }

