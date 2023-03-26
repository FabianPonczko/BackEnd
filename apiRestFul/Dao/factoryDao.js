
 const {MongoDBService} = require('./../services/MongoDBService/index.JS')

// const UsersMongo =require('./Users/UsersMongo.js')

const {CartMongo,ProductMongo,UsersMongo,ChatMongo} = require('./index.js')


// const SELECTED_DATABASE = "mongo"
const SELECTED_DATABASE = process.argv[ 2 ]  // || 'mongo'

// -------------------------------------------------------------

const getSelectedDaos = ()=>{
    switch(SELECTED_DATABASE){
        case 'mongo':{
            MongoDBService.init()
            return{
                UserDao:  UsersMongo.getinstanciaUserMongo(),
                ProductDao : ProductMongo.getinstanciaProductMongo(),
                CartDao : CartMongo.getinstanciaCartsMongo(),
                ChatDao: ChatMongo.getinstanciaChatsMongo()
            }
        }
        case 'filesystem':{
            return {
                UserDao: FileSystem()//datos cono ej.
            }
        }
    }
}
const {UserDao,ProductDao,CartDao,ChatDao} = getSelectedDaos()

module.exports = {UserDao,ProductDao,CartDao,ChatDao}