// import {Container} from '../Containers/index.js'

// import { FireBaseDBservice } from '../services/FireBaseService/index.js'
// import { MongoDBService } from '../services/index.js'
 const {MongoDBService} = require('../services/MongoDBService/index')
// import {CartsMongo,CartsFireBase,CartsFileSystem} from './Carts/index.js'
// import {ProductsMongo, ProductsFireBase,ProductsFileSystem } from './Products/index.js'

// import { UsersMongo } from "./Users/index.js";
const UsersMongo =require('./Users/UsersMongo')


// ----------------------------------------------------------------
// Cambiar SELECTED_DATABASE para usar DB: "mongo" ó DB:"firebase"
// ---------------------------------------------------------------

const SELECTED_DATABASE = "mongo"

// -------------------------------------------------------------

const getSelectedDaos = ()=>{
    switch(SELECTED_DATABASE){
        case "mongo":{
            MongoDBService.init()
            return{
                UserDao: new UsersMongo(),

            }
        }
        case "firebase":{
             FireBaseDBservice.init()
            return{
                ProductDao: new ProductsFireBase(),
                CartDao: new CartsFireBase()
            }
        }
        case "filesystem":{

            return{
                ProductDao: new  ProductsFileSystem(),
                CartDao: new CartsFileSystem()
            }
        }
    }

}
const {ProductDao,CartDao} = getSelectedDaos()

module.export = {ProductDao,CartDao}