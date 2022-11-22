import { Schema } from 'mongoose'

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

export const CartModels = {CartCollection,CartSchema}