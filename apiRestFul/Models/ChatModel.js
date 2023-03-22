// import { Schema } from 'mongoose'
const {Schema} = require('mongoose')

const ChatCollection= "chats"

const ChatSchema = new Schema(
    {
        timeStamp:{type: String, require:true,max:100},
        messages:{type: String, require:true,max:250},
        user:[{type:Schema.Types.ObjectId,ref: "users"}]
    },
    {
        virtuals:true
    }
)
ChatSchema.set("toJSON",{
    transform:(_,response)=>{
        response.id=response._id
        delete response._id
        delete response.__v
        return response
    }
})
const ChatModels = {ChatCollection,ChatSchema}
module.exports.ChatModels = {ChatCollection,ChatSchema}