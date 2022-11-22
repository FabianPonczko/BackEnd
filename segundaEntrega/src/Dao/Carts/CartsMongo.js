import { CartModels,MongoDbContainer } from "../../Containers/index.js";

export class CartsMongo extends MongoDbContainer{
    constructor(){
        super({
            name:CartModels.CartCollection,
            schema:CartModels.CartSchema
        })
    }

    async getById(id) {
        const response = await this.model.findById(id).populate("products")
        return response
    }
}