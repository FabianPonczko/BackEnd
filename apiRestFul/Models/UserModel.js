// import { Schema } from 'mongoose'
const {Schema} = require('mongoose')

const UserCollection= "users"

const UserSchema = new Schema({
    // name:{type: String, require:true,max:100},
    email:{type: String, require:true,max:150},
    password:{type: String, require:true,max:150},
    name:{type: String, require:true,max:150},
    adress:{type: String, require:true,max:350},
    age:{type: Number, require:true,max:150},
    phone:{type: String, require:true,max:500},
    photo:{type: String, require:true,max:500},
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