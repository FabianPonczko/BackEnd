const {MongoDbContainer}  = require ('../../containers/MongoDbContainer.js')
const {ProductModels} = require('../../Models/ProductModel.js')

let instancia=null

module.exports =  class ProductMongo extends MongoDbContainer {
    static instancia
    constructor(){
        super({
            name:ProductModels.ProductsCollection,
            schema:ProductModels.ProductSchema
        })
    }
    static getinstanciaProductMongo=()=>{
        if (!instancia){
            instancia = new ProductMongo()
            console.log("instancia Product creada")
        }
        return instancia
    }
    async getAll(option) {
        let response
         if(option){
             response = await this.model.find(option).lean()
        }else{
             response = await this.model.find().lean()
        }
        return response
     }
     async getById(id) {
        try {
            const response = await this.model.findById(id)
            if (!response){
                return {producto:"no encontrado"}    
            }
            return response
        } catch (error) {
            return {error}
        }
        
    }
}