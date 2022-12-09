const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'products'
    }
})
const tabla =  knex.schema.createTable('productos',(table)=>{
    table.increments("id")
    table.string("title")
    table.string("thumbnail")
    table.integer("price")
  }).then(a =>{console.log(a)})
  