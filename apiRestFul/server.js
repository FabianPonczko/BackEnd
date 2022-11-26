const express = require (`express`)
const { Server: HttpServer } = require('http')
const { Server: SocketIOServer }  = require('socket.io')
const Container = require('./apis/contenedor')
const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat')
const {KnexMysql,KnexSqlite3} = require('./apis/configDB')
const knex = require('knex')
const ContenedorMock = require ('./apis/contenedorMock')

dayjs.extend(customParseFormat)


// const products = new Container(KnexMysql,'products')
const products = new ContenedorMock()
products.createProducts()
const Messages = new Container(KnexSqlite3,'ecommerce')

console.log({products})


// products.createDBproducts()
Messages.createDBmenssages()


// const productos= [{
//     title:"Notebook hp",
//     price:250000,
//     thumbnail: 'https://lezamapc.com.ar/33210-large_default/notebook-hp-14-245-amd-ryzen-5-5500u-1t-8gb.jpg',
//     id:1
// }]



const app = express ()
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const PORT = 8080


app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



httpServer.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}`)
})



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public'))



const newProduct = async (newProduct) => {
  await products.save(newProduct)
  const allProduct = await products.getAll()
  io.sockets.emit('all products', allProduct)
}

const newUserConnected = async () => {
   const allMsg = await Messages.getAll()
  //  const allUser = await Users.getAll()
  const allProducts = await products.getAll()
  //  io.sockets.emit('all users', allUser)
   io.sockets.emit('all messages', allMsg)
  io.sockets.emit('all products', allProducts)
}

const newMessage = async (socket, io, newMsg) => {
  const date = new Date()
  const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
  try {
    await Messages.save({ msg: newMsg, socketId: newMsg.email, createdAt: `${dateFormated} hs`})

  } catch (error) {
    console.log('error en Messages.save',error)
  }
  const allMsg = await Messages.getAll()
  io.sockets.emit('all messages', allMsg)
}

// const userChangeAlias = async (socket, io, alias) => {
//   const user = await Users.getBySocketId(socket.id)
//   const userUpdated = {...user, name: alias}
//   await Users.updateById(userUpdated, user.id)
//   const allUser = await Users.getAll()
//   io.sockets.emit('all users', allUser)
// }

io.on('connection', socket => {
    console.log(`nuevo cliente conectado: ${socket.id}`)
    newUserConnected()

    socket.on('new product', newProd => {
      // newProd['id']=  Date.now()
      newProduct(newProd)

    })
    socket.on('new msg', newMsg => {
      newMessage(socket, io, newMsg)
    })

    // socket.on('change alias', alias => {
    //    userChangeAlias(socket, io, alias)
    // })
})
