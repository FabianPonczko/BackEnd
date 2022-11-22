// import {Container} from '../Containers/index.js'

import { FireBaseDBservice } from '../services/FireBaseService/index.js'
import { MongoDBService } from '../services/index.js'
import {CartsMongo,CartsFireBase,CartsFileSystem} from './Carts/index.js'
import {ProductsMongo, ProductsFireBase,ProductsFileSystem } from './Products/index.js'


// ----------------------------------------------------------------
// Cambiar SELECTED_DATABASE para usar DB: "mongo" ó DB:"firebase"
// ---------------------------------------------------------------

const SELECTED_DATABASE = "firebase"

// -------------------------------------------------------------

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
            // FireBaseDBservice.init()
            return{
                ProductDao: new ProductsFireBase(),
                CartDao: new CartsFireBase()
            }
        }
        case "filesystem":{
            // FireBaseDBservice.init()
            return{
                ProductDao: new  ProductsFileSystem(),
                CartDao: new CartsFileSystem()
            }
        }
    }

}
const {ProductDao,CartDao} = getSelectedDaos()

export {ProductDao,CartDao}