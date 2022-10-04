
const fs = require (`fs`)
const express = require(`express`)
const app = express()
const PORT = 8080

const server = app.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error on server ${err}`));


class Contenedor {
    constructor(name){
        this.name=`./${name}.txt`
    }

    async getAll(){
        try {
            const archivo=  await fs.promises.readFile(this.name, 'utf-8')
            return JSON.parse(archivo)
        } catch (error) {
            console.log(`fallo lectura `,error)
        }
    }
}

const objeto1=new Contenedor('productos')

app.get('/productos', (req,res)=>{    
    objeto1.getAll().then(list=>{
        res.json(list)
    })
})

const randomFunction=(limite)=>{
    return parseInt(Math.random()*limite) + 1
}


app.get('/productoRandom',(req,res)=>{
    objeto1.getAll().then( lista=>{
        res.json(lista[randomFunction(lista.length)])
    })
})