const express = require (`express`)
const { Server: HttpServer } = require('http')
const { Server: SocketIOServer }  = require('socket.io')
const Container = require('./apis/contenedor')
const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat')
const {KnexMysql,KnexSqlite3} = require('./apis/configDB')
const knex = require('knex')
const contenedorMock =require('./apis/contenedorMock')
const {normalizeData}=require('./normalizr/normalizar')

const handlebars = require('express-handlebars')
const {engine} = require('express-handlebars')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public'))

//configuro handlebars
app.engine('hbs', engine({
  extname:'.hbs',
  defaultLayout:"main.hbs"
}));
app.set('view engine', '.hbs');
app.set('views',  './public/views');

dayjs.extend(customParseFormat)


//obtengo productos desde mysql
const products = new Container(KnexMysql,'products')
products.createDBproducts()

//obtengo productos desde Mocks
const productsMocks= new contenedorMock()
productsMocks.createProducts()


//obtengo mensajes desde sqlite3
const Messages = new Container(KnexSqlite3,'ecommerce')
Messages.createDBmenssages()


const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const PORT = 8080

httpServer.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}`)
})


//creo ruta a view handlebars con tabla de productos desde Mocks
app.get('/api/productos-test', (req,res)=>{
  res.render('tableProductsMocks', productsMocks )
})


const newProduct = async (newProduct) => {
  await products.save(newProduct)
  const allProduct = await products.getAll()
  // const allProduct = await productsMocks.getAll()
  io.sockets.emit('all products', allProduct)
}

const newUserConnected = async () => {
   const allMsg = await Messages.getAll()
   const {email,nombre,apellido,edad,alias,avatar,textMsg} = allMsg
   const authorData = 
    {
      author:{
        id:email,
        nombre,
        apellido,
        edad,
        alias,
        avatar,
      },
      text:textMsg
    }
    const allProducts = await products.getAll()
    io.sockets.emit('all products', allProducts)
    
    //envio mensajes al from normalizados
    const mensajeNormalizer = normalizeData({id:"mensajes",authorData})
    io.sockets.emit('all messages', mensajeNormalizer)
}

const newMessage = async (newMsg) => {
  const date = new Date()
  const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
  const {email,nombre,apellido,edad,alias,avatar,textMsg} = newMsg

  try {
    await Messages.save( {id:email,nombre,apellido,edad,alias,avatar,text:textMsg})
  } catch (error) {
    console.log('error en Messages.save',error)
  }
  const allMsg = await Messages.getAll()
   
  //aca normalizo el mensaje y luego enviar al front
  const authorData = 
    {
      author:{
        id:email,
        nombre,
        apellido,
        edad,
        alias,
        avatar,
      },
      text:textMsg
    }
const mensajeNormalizer = normalizeData({id:"mensajes",authorData})
  io.sockets.emit('all messages', mensajeNormalizer)
}


io.on('connection', socket => {
    console.log(`nuevo cliente conectado: ${socket.id}`)
    newUserConnected()

    socket.on('new product', newProd => {
      newProduct(newProd)

    })
    socket.on('new msg', newMsg => {
      newMessage(newMsg)
    })

})
