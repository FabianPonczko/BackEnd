//obtengo mensajes desde sqlite3
const Container = require('../../apis/contenedorRepo.js')
const {KnexSqlite3} = require('../../apis/configDB.js')

    const Messages = new Container(KnexSqlite3,'ecommerce')
    Messages.createDBmenssages()
    

module.exports = {Messages}