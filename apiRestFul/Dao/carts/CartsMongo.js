const { MongoDbContainer } = require("./../../containers/MongoDbContainer");
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
    async getAll() {
        const response = await this.model.find().populate("products")
        return response
    }
    async getById(id) {
        const response = await this.model.findById(id)
        return response
    }
    async getByObjectId(id) {
        const response = await this.model.find(id)
        return response
    }
    async save(id){
        const cartById = await this.getByObjectId({user:id.user})
        for(const item of cartById){
            if(String(item.products) == String(id.products)){
                const response = await this.updateById(item._id,{quantity:item.quantity+1})
                return response
            }
        }
        const newCart = ({...id,quantity:1})
        const response = await this.model.create(newCart)
        return response
    }
}
