
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
  }

