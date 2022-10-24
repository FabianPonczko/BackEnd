// const fSync = require('fs')
// const path = require('path')
// const fs = fSync.promises
const fs = require('fs')

class Container{
    constructor(name) {
        this.name=`./${name}.txt`
      try {
        fs.promises.writeFile(this.name, '[]')
        } catch (error) {
          console.log(`Error en el constructor: ${error.message}`)
        }
    }

    async getData(){
        try {
            const data = await fs.promises.readFile(this.name,'utf-8')
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
          await fs.promises.writeFile(this.name, JSON.stringify(data, null, 2))
          
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
      try {
        const { data } = await this.getData()
        const indexFound = data.findIndex( element => element.id === Number(id))
        if( indexFound === -1)
          throw new Error('Elemento no encontrado')
        data.splice(indexFound, 1, {...payload, id})
        await fs.promises.writeFile(this.name, JSON.stringify(data, null, 2))
      } catch (error) {
        console.log(`Error al eliminar un objeto: ${error.message}`)
      }
    }
    async getBySocketId(socketId) {
      try {
        const { data } = await this.getData()
        const foundData = data.find( element => element.socketId === socketId )
        if(!foundData)
          throw new Error('Elemento no encontrado')
        return foundData
      } catch (error) {
        console.log(`Error al obtener un usuario por su socketId: ${error.message}`)
      }
    }
    
}

module.exports = Container