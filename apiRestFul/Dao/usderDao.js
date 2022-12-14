
const { MongoDbContainer } =require ("../containers/MongoDbContainer.js");
const { UserModel} =require('../Models/UserModel')

module.exports = class UsersMongo extends MongoDbContainer{
    constructor(){
        super({
            name:UserModel.UserCollection,
            schema:UserModel.UserSchema
        })
    }
}