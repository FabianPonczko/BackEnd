

// const fSync = require('fs')
// const path = require('path')
// const fs = fSync.promises

// const fs = require('fs')

class Container{
    constructor(knexWithOptions,dbName) {
        this.knex=knexWithOptions
        this.dbName=dbName
    }

    async createDBproducts(){
      try {
        const is_Exist_Db= await this.knex.schema.hasTable(this.dbName)
        if (!is_Exist_Db){
          const tabla = await this.knex.schema.createTable(this.dbName,(table)=>{
            table.increments('id')
            table.string("title")
            table.string("thumbnail")
            table.integer("price")
          })
        }
      } catch (error) {
        console.log(error)
      }

    }async createDBmenssages(){
      try {
        const is_Exist_Db= await this.knex.schema.hasTable(this.dbName)
        if (!is_Exist_Db){
          const tabla = await this.knex.schema.createTable(this.dbName,(table)=>{
              table.string('id')//mail del usuario
              table.string('nombre')
              table.string('apellido')
              table.string('edad')
              table.string('alias')
              table.string('avatar')// foto logo del usuario
            
            // table.increments('id');
            table.string('text') //mensaje del usuario

          //   table.increments('id')
          // table.string("msg")
          // table.string("socketId")
          // table.string("createdAt")
        })
      }
      } catch (error) {
        console.log(error)
      }

    }



    async getData(){
        try {
            const data = await this.knex.from(this.dbName).select('*')
            if(data.length)
             return  {data}
            
          } catch (error) {
            console.log(`Error al leer un archivo: de ${this.dbName} ${error.message}`)
            
          }
    }

    async save(payload){
        try {
          await this.knex.from(this.dbName).insert({...payload})
          
        } catch (error) {
          console.log(`Error al guardar un objeto en ${this.dbName} ${error.message}`)
          
        }
      }
  

    async getAll() {
      try {
        const  data  = await this.knex.from(this.dbName).select('*')
        return data
      } catch (error) {
        console.log(`Error al obtener todos los objetos: ${error.message}`)
      }
    }

    async updateById(payload, idSerch) {
      try {
        await this.knex.from(this.dbName).where({id:idSerch}).update({...payload})
      } catch (error) {
        console.log(`Error al eliminar un objeto: ${error.message}`)
      }
    }
        
}

module.exports = Container