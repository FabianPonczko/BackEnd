const normalizr = require('normalizr')
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema

const author = new schema.Entity('author',{idAttribute: 'email'})//{idAttribute: 'email'}

const mensajes = new schema.Entity('mensajes',{
    mensaje : author
})

const normalizeData = (data) => normalize(data,mensajes)
console.log(normalizeData,null,12)

const desnormalizeData = (data) =>denormalize(data.result,mensajes,normalizeData.entities)
console.log(desnormalizeData,null, 12)

module.exports={
    normalizeData,
    desnormalizeData
}