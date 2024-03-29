const {Schema} = require('mongoose')

const CartCollection= "carts"

const CartSchema = new Schema(
    {
        timeStamp:{type: String, require:true,max:100},
        quantity:{type:Number},
        total:{type:Number},
        products: {type:Schema.Types.ObjectId,ref: "products"},
        user:{type: String, require:true,max:100},
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


module.exports.CartModels = {CartCollection,CartSchema}