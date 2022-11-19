// const fSync = require('fs')
// const path = require('path')


// const fs = fSync.promises
import  fs  from 'fs'


class Container{
    constructor(name) {
        this.filepath=`./src/db/${name}.json`
      try {
        fs.promises.writeFile(this.filepath, '[]')
        } catch (error) {
          console.log(`Error en el constructor: ${error.message}`)
        }
    }

    async getData(){
        try {
            const data = await fs.promises.readFile(this.filepath,'utf-8')
            const arrayData = JSON.parse(data)
            // Devuelvo el ultimo id utilizado incrementado en 1
            if(arrayData.length)
              return { newId: arrayData.at(-1).id + 1, data: arrayData }
            return { newId: 1, data: arrayData}
          } catch (error) {
            console.log(`Error al leer un archivo: ${error.message}`)
            
          }
    }
   

    async save(payload){

        try {
          const { newId, data } = await this.getData()
          data.push( {...payload, id: newId} )
          await fs.promises.writeFile(this.filepath, JSON.stringify(data, null, 2))
          return data
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
    async updateById(payload, id) {
      console.log(payload)
      try {
        const { data } = await this.getData()
        const indexFound = data.findIndex( element => element.id === Number(id))
        if( indexFound === -1)
          throw new Error('Elemento no encontrado')
        data.splice(indexFound, 1, {...payload, id})
        await fs.promises.writeFile(this.filepath, JSON.stringify(data, null, 2))
      } catch (error) {
        console.log(`Error al actualizar un objeto: ${error.message}`)
      }
    }
    async getById(id) {
      try {
        const { data } = await this.getData()
        const foundData = data.find( element => element.id === id )
        if(!foundData)
          throw new Error('Elemento no encontrado')
        return foundData
      } catch (error) {
        console.log(`Error al obtener un usuario por su Id: ${error.message}`)
      }
    }
    async DeleteById(id) {
      try {
        const { data } = await this.getData()
        const indexFound = data.findIndex( element => element.id === Number(id))
        if( indexFound === -1)
          throw new Error('Elemento no encontrado')
        data.splice(indexFound, 1)
        await fs.promises.writeFile(this.filepath, JSON.stringify(data, null, 2))
      } catch (error) {
        console.log(`Error al eliminar un objeto: ${error.message}`)
      }
    }
    
}

export {Container}