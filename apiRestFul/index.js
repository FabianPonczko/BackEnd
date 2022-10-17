const express = require (`express`)
const handlebars = require('express-handlebars')
const app = express()

const productos = require('./routes/productos.js')
const ViewsRouter = require('./routes/viewsRouter.js')

const server = app.listen(8080,()=>console.log('server iniciado en puerto 8080'))
server.on('error', err => console.log(`Error en server: ${err}`));

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main.hbs",
    })
)
app.set("view engine", "hbs")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/static/',express.static(__dirname+'/public'))

app.use('/',productos)

app.use('/',ViewsRouter)
