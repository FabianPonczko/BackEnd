
const {MongoDbContainer} = require('../../Containers/MongoDbContainer.js')
const {UserModel} = require('../../models/UserModel.js')

let instancia = null
module.exports =  class UsersMongo extends MongoDbContainer {
  static instancia  
  constructor() {
      super({
        name: UserModel.UserCollection,
        schema: UserModel.UserSchema
      });
    }
    static getinstanciaUserMongo=()=>{
      if (!instancia){
        instancia = new UsersMongo()
        console.log("se crea instancia User")
      }
      return instancia
    }
    async getAll(option) {
      let response
       if(option){
           response = await this.model.find(option).populate("carts").lean()
      }else{
          response = await this.model.find().populate({path:"carts",populate: {path:'products'}}).lean()
          // response = await this.model.find().populate("carts")
      }
      return response
   }
   async getById(id) {
    const response = await this.model.findById(id).populate({path:"carts",populate: {path:'products'}}).lean()
    return response
}
  
  }

