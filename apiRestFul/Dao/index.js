
 const {MongoDBService} = require('../services/MongoDBService/index.js')

const UsersMongo =require('./Users/UsersMongo.js')


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
    }
}
const {UserDao} = getSelectedDaos()

module.exports = {UserDao}