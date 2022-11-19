import { Schema } from 'mongoose'

const CartCollection= "carts"

const CartSchema = new Schema(
    {
    timeStamp:{type: String, require:true,max:100},

    title:{type: String, require:true,max:100},
    products:[{tipe:Schema.Types.ObjectId,Ref: "products"}]
    },
    {
        virtuals:true
    }

)

CartSchema.set("toJSON",{
    transform:(_,response)=>{
        response.id=response._id
        // delete response._id
        return response
    }
})

export const CartModels = {CartCollection,CartSchema}