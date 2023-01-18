import { FireBaseDbContainer } from "./../../Containers/index.js";

export class ProductsFireBase extends FireBaseDbContainer{
    constructor(){
        super({
            collections:"products",
        })
    }
}