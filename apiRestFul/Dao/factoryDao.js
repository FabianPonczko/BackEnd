
 const {MongoDBService} = require('../services/MongoDBService/index.js')

const UsersMongo =require('./Users/UsersMongo.js')

const {CartMongo,ProductMongo,UsersMongo} = require('./index.js')


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
                CartDao : CartMongo.getinstanciaCartsMongo()
            }
        }
        case 'filesystem':{
            return {
                UserDao: FileSystem()//datos cono ej.
            }
        }
    }
}
const {UserDao,ProductDao,CartDao} = getSelectedDaos()

module.exports = {UserDao,ProductDao,CartDao}