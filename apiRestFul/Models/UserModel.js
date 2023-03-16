// import { Schema } from 'mongoose'
const {Schema} = require('mongoose')

const UserCollection= "users"

const UserSchema = new Schema({
    name:{type: String, require:true,max:100},
    adress:{type: String, require:true,max:150},
    age:{type: Number, require:true,max:120},
    phone:{type: String, require:true,max:24},
    email:{type: String, require:true,max:150},
    password:{type: String, require:true,max:150},
    admin:{type: Boolean},
    cart:[{type:Schema.Types.ObjectId,ref: "carts"}]
},
{
    virtuals:true
})

UserSchema.set("toJSON",{
    transform:(_,response)=>{
        response.id=response._id
        delete response._id
        delete response.__v
        return response
    }
})
const UserModel = {UserCollection,UserSchema}
module.exports.UserModel = {UserCollection,UserSchema}