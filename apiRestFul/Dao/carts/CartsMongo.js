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
        // console.log("1",id)
        const cartById = await this.getByObjectId({user:id.user})
        // console.log("cartById ",cartById)
        
        
        for(const item of cartById){
            
            if(String(item.products) == String(id.products)){
                // console.log("igual",item._id)
                const response = await this.updateById(item._id,{quantity:item.quantity+1})
                // console.log("response ",response)
                return response
            }
        }
        // if(cartById.length>0&&cartById[0].products==id.products){
        //       const id = cartById[0]._id
        //       const response = await this.updateById(id,{quantity:cartById[0].quantity+1})
        //       return response
        // }
              
        // console.log("111",id.products)
        const newCart = ({...id, quantity:1})
        // // console.log(newCart)
        const response = await this.model.create(newCart)
       
        return response
        
        //   await UserDao.this.UserDao.updateById(newCart.user,{cart:response._id})
        //  return response
    }
}
