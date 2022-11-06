

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
        const tabla = await this.knex.schema.createTable(this.dbName,(table)=>{
          table.increments('id')
          table.string("title")
          table.string("thumbnail")
          table.integer("price")
        })
      } catch (error) {
        console.log(error)
      }

    }async createDBmenssages(){
      try {
          const tabla = await this.knex.schema.createTable(this.dbName,(table)=>{
            table.increments('id')
          table.string("msg")
          table.string("socketId")
          table.string("createdAt")

        })
      } catch (error) {
        console.log(error)
      }

    }



    async getData(){
        try {
            const data = await this.knex.from(this.dbName).select('*')
            // const arrayData = JSON.parse(data)
            // Devuelvo el ultimo id utilizado incrementado en 1
            if(data.length)
               return { newId: data.at(-1).id + 1, data:{data} }
            return { newId: 1, data: {data}}
            
          } catch (error) {
            console.log(`Error al leer un archivo: de ${this.dbName} ${error.message}`)
            
          }
    }

    async save(payload){
        try {
          const { newId } = await this.getData()
          payload["id"]=newId
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