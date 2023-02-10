const express = require (`express`)
const { Server: HttpServer } = require('http')
const { Server: SocketIOServer }  = require('socket.io')
const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat')
const {normalizeData}=require('./normalizr/normalizar')
const handlebars = require('express-handlebars')
const {engine} = require('express-handlebars')
const routerLogin = require('./routes/login')
const routerDestroy = require('./routes/destroy')
const routerInfo = require('./routes/info.js')
const routerApirandons = require('./routes/apiRandom.js')
const session = require ('express-session')
const sesiones = require('./sessionConfig/session.js')

const cluster = require("cluster")
const numCluster= require('os').cpus().length
const {fork} = require('child_process')

const {PassportAuth} =require('./middlewares/passportAuth')
const passport =require('passport')

const {consola,warn,error} = require('./util/logger.js')
const {Messages} =require('./Dao/messages/messages.js')
const {productos}= require('./Dao/products/products.js')
const { productsMocks } = require('./controller/productsMocks')
const { noRuta } = require('./controller/noRutas')


const app = express();

PassportAuth.init();

app.use(sesiones.mongo) 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//configuro handlebars
app.engine('hbs', engine({
  extname:'.hbs',
  defaultLayout:"main.hbs"
}));
app.set('view engine', '.hbs');
app.set('views',  './public/views');

let userName =""

const userVerify =  (req,res,next)=>{
  userName= req.session.nombre
  next()
}

app.use("/", userVerify, express.static(__dirname+'/public'))

dayjs.extend(customParseFormat)

const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const args = process.argv.slice(3)

const PORT = args[0] || 8080

const modo = args[1] || "FORK"

if(modo == "CLUSTER"){
  if(cluster.isPrimary){
    for (let index = 0; index < numCluster; index++) {
      cluster.fork()
    }
  cluster.on('exit',(worker,code,signal)=>{
    console.log(`worker ${worker.process.pid} died`)
    // cluster.fork()
  })
}else{
  httpServer.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT} ands PID: ${process.pid}`)
  })
}
}else{
  httpServer.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT} ands PID: ${process.pid} modo FORK`)
  })
}

//creo ruta a view handlebars con tabla de productos desde Mocks
app.get('/api/productos-test', productsMocks)

//llamo a ruta de login
app.use('/',routerLogin)

//llamo a la ruta para borrar la session luego redirecciono a login
app.use('/',routerDestroy)

app.use('/', routerInfo)

app.use('/',routerApirandons)

app.get('*',noRuta)


const newProduct = async (newProduct) => {
  await productos.products.save(newProduct)
  const allProduct = await productos.products.getAll()
  io.sockets.emit('all products', allProduct)
}

const newUserConnected = async () => {
      
       const allMsg = await Messages.getAll()
  
   const authorData =[]
   for (ele of allMsg){
      authorData.push(
        {author:{
          id:ele.id,
          nombre:ele.nombre,
          apellido:ele.apellido,
          edad:ele.edad,
          alias:ele.alias,
          avatar:ele.avatar,
        },
        text:ele.text
        }
      )
   }
   
    
    const allProducts = await productos.products.getAll()
   console.log("mando",userName)

    io.sockets.emit('user', (userName))
    
    io.sockets.emit('all products', (allProducts))
    
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
  const authorData =[]
  for (ele of allMsg){
     authorData.push(
       {author:{
         id:ele.id,
         nombre:ele.nombre,
         apellido:ele.apellido,
         edad:ele.edad,
         alias:ele.alias,
         avatar:ele.avatar,
       },
       text:ele.text
       }
     )
  }
const mensajeNormalizer = normalizeData({id:"id",authorData})//id:"mensajes",authorData
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
