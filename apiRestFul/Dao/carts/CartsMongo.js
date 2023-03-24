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
        console.log("id",id)
        const cartById = await this.getByObjectId({products:id.products})
        console.log(" caertById ",cartById)
        if(cartById.length>0){
            const id = cartById[0]._id
            console.log(cartById[0].quantity)
             return await this.updateById(id,{quantity:cartById[0].quantity+1})
            
        }else{
            quantity=1
        }
        
        const newCart = ({...id, quantity:quantity})
        const response = await this.model.create(newCart)
        return response
    }
}
