const express = require (`express`)
const { Server: HttpServer } = require('http')
const { Server: SocketIOServer }  = require('socket.io')
const handlebars = require('express-handlebars')
const Container = require('./apis/contenedor')

const products = new Container("products")
const Messages = new Container("messages")
const Users = new Container("users")


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

const newProduct = async (newProduct) => {
  await products.save(newProduct)
  const allProduct = await products.getAll()
  // Propago los productos en todos los sockets
  io.sockets.emit('all products', allProduct)
}

const newUserConnected = async () => {
   const allMsg = await Messages.getAll()
   const allUser = await Users.getAll()
  const allProducts = await products.getAll()
  // Envio todos los usuarios a todos los sockets
   io.sockets.emit('all users', allUser)
  // Envio todos los mensajes a todos los sockets
   io.sockets.emit('all messages', allMsg)
  // Envio todos los productos a todos los sockets
  io.sockets.emit('all products', allProducts)
}

const newMessage = async (socket, io, newMsg) => {
  const date = new Date()
  // const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
  // console.log("🚀 ~ file: message.handler.js ~ line 11 ~ newMessage ~ dateFormat", dateFormated)
  await Messages.save({ msg: newMsg, socketId: socket.id, createdAt: `${date} hs`})
  const allMsg = await Messages.getAll()
  // Propago los mensajes en todos los sockets
  io.sockets.emit('all messages', allMsg)
}

const userChangeAlias = async (socket, io, alias) => {
  const user = await Users.getBySocketId(socket.id)
  const userUpdated = {...user, name: alias}
  await Users.updateById(userUpdated, user.id)
  const allUser = await Users.getAll()
  // Envio todos los usuarios a todos los sockets
  io.sockets.emit('all users', allUser)
}

io.on('connection', socket => {
    console.log(`nuevo cliente conectado: ${socket.id}`)
    newUserConnected()


    socket.on('new product', newProd => {
      newProd['id']=  Date.now()
      newProduct(newProd)
      // io.sockets.emit('all products', products)


    })
    socket.on('new msg', newMsg => {
      newMessage(socket, io, newMsg)
    })

    socket.on('change alias', alias => {
       userChangeAlias(socket, io, alias)
    })
})
