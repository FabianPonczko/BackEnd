const express = require (`express`)
const { Server: HttpServer } = require('http')
const { Server: SocketIOServer }  = require('socket.io')
const handlebars = require('express-handlebars')

const productos= [{
    title:"Notebook hp",
    price:250000,
    thumbnail: 'https://lezamapc.com.ar/33210-large_default/notebook-hp-14-245-amd-ryzen-5-5500u-1t-8gb.jpg',
    id:1
}]

const app = express ()
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const PORT = 8080



app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api', routers)

httpServer.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}`)
})


// app.engine(
//     "hbs",
//     handlebars.engine({
//         extname: ".hbs",
//         defaultLayout: "main.hbs",
//     })
// )
// app.set("view engine", "hbs")
// app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public'))

// app.use('/',productos)

io.on('connection', socket => {
    console.log(`nuevo cliente conectado: ${socket.id}`)
    io.sockets.emit('all products', productos)
})
