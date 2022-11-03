export const KnexMysql = required('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 8080,
      user : 'root',
      password : '',
      database : 'products'
    }
})


 export const KnexSqlite3 = required('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./DB/mydb.messages.sqlite"
    }
})

// module.export = {
//   KnexMysql,
//   KnexSqlite3
// }

