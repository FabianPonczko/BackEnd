// import mongoose from "mongoose"
const mongoose = require('mongoose') 

class MongoDbContainer{
    constructor({name, schema}) {
        this.model=mongoose.model(name,schema)
    }

   
    async getAll() {
       const response = await this.model.find()
       return response
    }
    async save(element){
        const response = await this.model.create(element)
        return response
    }

    async getById(id) {
        const response = this.model.findById(id)
        return response
    }
    async updateById(id,newData) {
        const response = this.model.findByIdAndUpdate(id,newData,{
            new:true
        })
        return response
    }
    async DeleteById(id) {
        const response = this.model.findByIdAndDelete(id)
        return response
    }
    
}

module.exports= {MongoDbContainer}