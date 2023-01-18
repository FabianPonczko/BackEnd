import {FireBaseDbContainer} from './../../Containers/index.js'
export class CartsFireBase extends FireBaseDbContainer{
    constructor(){
        super({
            collections:"carts"
        })
    }
}