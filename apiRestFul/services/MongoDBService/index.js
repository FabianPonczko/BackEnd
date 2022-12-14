// import mongoose from "mongoose";
const mongoose = require ('mongoose')
// import { config } from "../../config/index.js";
const {config} = require('../../config/index.js')

const init = async ()=>{
    try {
        mongoose.connect(config.DATABASES.mongo.url,{
            dbName:config.DATABASES.mongo.dbName
        })
        console.log("conectado con mongodb")
    } catch (error) {
        console.log(error)
    }
}
const MongoDBService ={
    init
}
module.exports = {MongoDBService }