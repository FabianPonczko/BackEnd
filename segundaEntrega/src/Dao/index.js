// import {Container} from '../Containers/index.js'

import { FireBaseDBservice } from '../services/FireBaseService/index.js'
import { MongoDBService } from '../services/index.js'
import {CartsMongo} from './Carts/index.js'
import {ProductsMongo, ProductsFireBase} from './Products/index.js'


// const PRODUCTS_FILENAME = 'products'
// const CART_FILENAME = 'cart'

// const productsDao = new Container(PRODUCTS_FILENAME)
// const cartDao = new Container(CART_FILENAME)

const SELECTED_DATABASE = "firebase"
const getSelectedDaos = ()=>{
    switch(SELECTED_DATABASE){
        case "mongo":{
            MongoDBService.init()
            return{
                ProductDao: new ProductsMongo(),
                CartDao: new CartsMongo()
            }
        }
        case "firebase":{
            FireBaseDBservice.init()
            return{
                ProductDao: new ProductsFireBase(),
                CartDao: new CartsMongo()
            }
        }
    }

}
const {ProductDao,CartDao} = getSelectedDaos()

export {ProductDao,CartDao}