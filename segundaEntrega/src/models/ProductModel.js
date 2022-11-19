import { Schema } from 'mongoose'

const ProductsCollection= "products"

const ProductSchema = new Schema({
    title:{type: String, require:true,max:100},
    description:{type: String, require:true,max:150},
    code:{type: String, require:true,max:10},
    thumbnail:{type: String, require:true,max:150},
    price:{type: Number, require:true},
    stock:{type: Number, require:true},
    timeStamp:{type: String, require:true,max:100},
},
{
    virtuals:true
}

)

ProductSchema.set("toJSON",{
    transform:(_,response)=>{
        response.id=response._id
        // delete response._id
        return response
    }
})

export const ProductModels = {ProductsCollection,ProductSchema}