import { CartModels,MongoDbContainer } from "../../Containers/index.js";

export class CartsMongo extends MongoDbContainer{
    constructor(){
        super({
            name:CartModels.CartCollection,
            schema:CartModels.CartSchema
        })
    }
}