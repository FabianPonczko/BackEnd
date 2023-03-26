const normalizr = require('normalizr')
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize
const util = require('util')
const schema = normalizr.schema

const author = new schema.Entity('author',{idAttribute: 'id'})//{idAttribute: 'email'}

const mensajes = new schema.Entity('mensajes',{
    mensajes : author
})

const normalizeData = ((data) =>{
    // console.log("data",util.inspect(data,false,12,false))
    return normalize(data,mensajes)
} )
// console.log(normalizeData,null,12)

const desnormalizeData = (data) =>denormalize(data.result,mensajes,normalizeData.entities)
// console.log(desnormalizeData,null, 12)

module.exports={
    normalizeData,
    desnormalizeData
}