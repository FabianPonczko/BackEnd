

// const fSync = require('fs')
// const path = require('path')
// const fs = fSync.promises

// const fs = require('fs')

const {consola,error} = require('./../util/logger.js')


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
      } catch (err) {
        consola.info(err)
        error.error("error" , err)
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
      } catch (err) {
        consola.info(err)
        error.error("error", err)
      }

    }



    async getData(){
        try {
            const data = await this.knex.from(this.dbName).select('*')
            if(data.length)
             return  {data}
            
          } catch (err) {
            consola.info(`Error al leer un archivo: de ${this.dbName} ${err.message}`)
            error.error(`Error al leer un archivo: de ${this.dbName} ${err.message}`)
            
          }
    }

    async save(payload){
        try {
          await this.knex.from(this.dbName).insert({...payload})
          
        } catch (err) {
          consola.info(`Error al guardar un objeto en ${this.dbName} ${err.message}`)
          error.error(`Error al guardar un objeto en ${this.dbName} ${err.message}`)

          
        }
      }
  

    async getAll() {
      try {
        const  data  = await this.knex.from(this.dbName).select('*')
        return data
      } catch (err) {
        consola.info(`Error al obtener todos los objetos: ${err.message}`)
        error.error(`Error al obtener todos los objetos: ${err.message}`)

      }
    }

    async updateById(payload, idSerch) {
      try {
        await this.knex.from(this.dbName).where({id:idSerch}).update({...payload})
      } catch (err) {
        consola.info(`Error al eliminar un objeto: ${err.message}`)
        error.error(`Error al eliminar un objeto: ${err.message}`)

      }
    }
        
}

module.exports = Container