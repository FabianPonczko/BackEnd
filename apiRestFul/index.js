const express = require (`express`)
const app = express()

const productos = require('./routes/productos.js')

const server = app.listen(8080,()=>console.log('server iniciado en puerto 8080'))
server.on('error', err => console.log(`Error en server: ${err}`));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/static/',express.static(__dirname+'/public'))

app.use('/',productos)
