
const { MongoDbContainer, ProductModels } =require ("../../Containers/index.js");

export default class ProductsMongo extends MongoDbContainer{
    constructor(){
        super({
            name:ProductModels.ProductsCollection,
            schema:ProductModels.ProductSchema
        })
    }
}