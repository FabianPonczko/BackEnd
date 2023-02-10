// import { Schema } from 'mongoose'
const {Schema} = require('mongoose')
const CartCollection= "carts"
const CartSchema = new Schema(
    {
        timeStamp:{type: String, require:true,max:100},
        title:{type: String, require:true,max:100},
        products:[{type:Schema.Types.ObjectId,ref: "products"}]
    },
    {
        virtuals:true
    }
)
CartSchema.set("toJSON",{
    transform:(_,response)=>{
        response.id=response._id
        delete response._id
        delete response.__v
        return response
    }
})
const CartModels = {CartCollection,CartSchema}
module.export  = CartModels