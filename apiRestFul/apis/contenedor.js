

// const fSync = require('fs')
// const path = require('path')
// const fs = fSync.promises

// const fs = require('fs')

class Container{
    constructor(knexWithOptions,dbName) {
        this.knex=knexWithOptions
        this.dbName=dbName
    }

    // async createDB(){
    //   try {
    //     const tabla = await this.knex.schema.createTable(this.dbName,(table)=>{
    //       table.increment("id")
    //       table.string("title")
    //       table.string("thumbnail")
    //       table.number("price")
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }

    // }

    async getData(){
        try {
            const data = await this.knex.from(this.dbName).select('*')
            // const arrayData = JSON.parse(data)
            // Devuelvo el ultimo id utilizado incrementado en 1
            // if(arrayData.length)
            //   return { newId: arrayData.at(-1).id + 1, data: arrayData }
            // return { newId: 1, data: arrayData}
            return {data}
          } catch (error) {
            console.log(`Error al leer un archivo: ${error.message}`)
            
          }
    }

    async save(payload){
        try {
          // const { newId } = await this.getData()
          await this.knex.from(this.dbName).indert({...payload})
          
        } catch (error) {
          console.log(`Error al guardar un objeto: ${error.message}`)
          
        }
      }
   

    async getAll() {
      try {
        const { data } = await this.getData()
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