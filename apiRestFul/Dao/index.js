
 const {MongoDBService} = require('./../services/MongoDBService/index.js')

const UsersMongo =require('./Users/UsersMongo.js')


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
const {ProductDao,CartDao,UserDao} = getSelectedDaos()

module.exports = {ProductDao,CartDao,UserDao}