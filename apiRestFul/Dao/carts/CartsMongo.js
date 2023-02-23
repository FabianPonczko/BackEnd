const { MongoDbContainer } = require("../../Containers/MongoDbContainer");
const { CartModels } = require("../../Models/CartModel");

let instancia = null

 module.exports =  class CartMongo extends MongoDbContainer{
    static instancia
    constructor(){
        super({
            name:CartModels.CartCollection,
            schema: CartModels.CartSchema
        })
    }
    static getinstanciaCartsMongo = ()=>{
        if (!instancia){
            instancia = new CartMongo()
            console.log("instancia Cart creada")
        }
        return instancia
    }
}
