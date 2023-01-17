import { CartModels,MongoDbContainer } from "../../Containers/index.js";

export class CartsMongo extends MongoDbContainer{
    constructor(){
        super({
            name:CartModels.CartCollection,
            schema:CartModels.CartSchema
        })
    }

    async getAll() {
        const response = await this.model.find().populate("products")
        return response
     }
     async getById(id) {
        const response = this.model.findById(id).populate("products")
        return response
     }
}