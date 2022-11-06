 const KnexMysql = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'products'
    }
})


 const KnexSqlite3 = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './DB/mydb.messages.sqlite'
    },
    useNullAsDefault:true
})

module.exports = {
  KnexMysql,
  KnexSqlite3,
} 


