
const { MongoDbContainer } =require ("./../Containers/MongoDbContainer.js");
const { UserModel} =require('./../Models/UserModel')

module.exports = class UsersMongo extends MongoDbContainer{
    constructor(){
        super({
            name:UserModel.UserCollection,
            schema:UserModel.UserSchema
        })
    }
}