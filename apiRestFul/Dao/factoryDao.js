
 const {MongoDBService} = require('../services/MongoDBService/index.js')

const UsersMongo =require('./Users/UsersMongo.js')


// const SELECTED_DATABASE = "mongo"
const SELECTED_DATABASE = process.argv[ 2 ]  // || 'mongo'

// -------------------------------------------------------------

const getSelectedDaos = ()=>{
    switch(SELECTED_DATABASE){
        case 'mongo':{
            MongoDBService.init()
            return{
                UserDao:  UsersMongo.getinstanciaUserMongo(),
            }
        }
        case 'filesystem':{
            return {
                UserDao: FileSystem()//datos cono ej.
            }
        }
    }
}
const {UserDao} = getSelectedDaos()

module.exports = {UserDao}