const {Schema} = require('mongoose')

const ChatCollection= "chats"

const ChatSchema = new Schema(
    {
        timeStamp:{type: String, require:true,max:100},
        messages:{type: String, require:true,max:250},
        createAt:{type: String, require:true,max:100},
        userEmail:{type: String, require:true,max:100},
        isAdmin:{type: String, require:true,max:100},
        to:{type: String, require:true,max:100},
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