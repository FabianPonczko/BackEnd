// import mongoose from "mongoose"
const mongoose = require('mongoose') 

class MongoDbContainer{
    constructor({name, schema}) {
        this.model=mongoose.model(name,schema)
    }
   
    async getAll(option) {
       let response
        if(option){
            response = await this.model.find(option).lean()
       }else{
            response = await this.model.find().lean()
       }
       return response
    }
    async save(element){
        const response = await this.model.create(element)
        return response
    }
    async getOne(options) {
        const response = await this.model.findOne(options)//.lean().exec();
        return response
      }

    async getById(id) {
        try {
            const response = await this.model.findById(id)
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateById(id,newData) {
        const response = await this.model.findByIdAndUpdate(id,newData,{
            new:true
        })
        return response
    }
    async DeleteById(id) {
        try {
            const response = await this.model.findByIdAndDelete(id)
            return  response
        } catch (error) {
            return {error}
        }
    }
    
}

module.exports = {MongoDbContainer}