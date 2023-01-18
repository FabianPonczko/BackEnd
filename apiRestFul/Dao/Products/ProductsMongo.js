import { MongoDbContainer, ProductModels } from "../Containers/index.js";

export class ProductsMongo extends MongoDbContainer{
    constructor(){
        super({
            name:ProductModels.ProductsCollection,
            schema:ProductModels.ProductSchema
        })
    }
}