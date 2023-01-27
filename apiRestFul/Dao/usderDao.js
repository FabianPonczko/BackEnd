
const  MongoDbContainer  =require ("./../Containers/MongoDbContainer.js");
const { UserModel} =require('./../Models/UserModel.js')

module.exports = class UsersMongo extends MongoDbContainer{
    constructor(){
        super({
            name:UserModel.UserCollection,
            schema:UserModel.UserSchema
        })
    }
    // async getAll() {
    //     const response = await this.model.find().populate("products")
    //     return response
    //  }
    //  async getById(id) {
    //     const response = this.model.findById(id).populate("products")
    //     return response
    //  }
}