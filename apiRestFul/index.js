const express = require (`express`)
const app = express()

const personas = require('./Routes/personas.js')
const mascotas = require('./Routes/mascotas.js')


const server = app.listen(8080,()=>console.log('server iniciado en puerto 8080'))
server.on('error', err => console.log(`Error on server ${err}`));

//para poder leer los body
app.use(express.json())

app.use('/mascotas', mascotas)
app.use('/personas', personas)
