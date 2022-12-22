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
const util = require('util')

const handlebars = require('express-handlebars')
const {engine} = require('express-handlebars')
const routerLogin = require('./routes/login')
const routerDestroy = require('./routes/destroy')
const routerInfo = require('./routes/info.js')
const routerApirandons = require('./routes/apiRandom.js')
const session = require ('express-session')
// const { nextTick } = require('process')
const MongoStore = require('connect-mongo')
const FileStore = require('session-file-store')(session)
const sesiones = require('./sessionConfig/session.js')
const {config} =require('./config/index.js')


// import { PassportAuth } from "./middlewares/index.js";
// import passport from "passport";

const {PassportAuth} =require('./middlewares/passportAuth')
const passport =require('passport')

const AuthRouter = require('./routes/Auth/index')


const args = process.argv.slice(2)


const app = express();

PassportAuth.init();


// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//   })
//   );
app.use(sesiones.mongo)
  
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//contador con session


//configuro handlebars
app.engine('hbs', engine({
  extname:'.hbs',
  defaultLayout:"main.hbs"
}));
app.set('view engine', '.hbs');
app.set('views',  './public/views');



let userName = ""

const userVerify =  (req,res,next)=>{
  userName= req.session.nombre
  
  // if (!userName){
  //   return res.redirect("/login")
  // }
  
  // console.log("session name ",userName)
  
  next()
}

app.use("/",userVerify, express.static(__dirname+'/public'))


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

const PORT = args[0] || 8080

httpServer.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}`)
})


//creo ruta a view handlebars con tabla de productos desde Mocks
app.get('/api/productos-test', (req,res)=>{
  res.render('tableProductsMocks', productsMocks )
})

//llamo a ruta de login
app.use('/',routerLogin)

//llamo a la ruta para borrar la session luego redirecciono a login
app.use('/',routerDestroy)


app.use('/', routerInfo)

app.use('/',routerApirandons)

app.use("/api/auth", AuthRouter);



const newProduct = async (newProduct) => {
  await products.save(newProduct)
  const allProduct = await products.getAll()
  // const allProduct = await productsMocks.getAll()
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
   
    
    const allProducts = await products.getAll()
   console.log("mando",userName)

    io.sockets.emit('user', (userName))
    
    io.sockets.emit('all products', (allProducts))
    
    //envio mensajes al from normalizados
    const mensajeNormalizer = normalizeData({id:"mensajes",authorData})
    // console.log("data normalizada",util.inspect(mensajeNormalizer,false,12,true))
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
