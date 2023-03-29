const express = require (`express`)
const { Server: HttpServer } = require('http')
const { Server: SocketIOServer }  = require('socket.io')
const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat')
const handlebars = require('express-handlebars')
const {engine} = require('express-handlebars')
const {routerOrder,routerCarts,routerDestroy,routerInfo,routerLogin, routerProducts,routerUserCart,routerChat} = require ('./routes/index.js')
const session = require ('express-session')
const sesiones = require('./sessionConfig/session.js')
const {PassportAuth} =require('./middlewares/passportAuth')
const passport =require('passport')
const {ChatDao} = require ('./Dao/factoryDao')
const { noRuta } = require('./controller/noRutas')
const cookieParser = require ('cookie-parser')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const app = express();
PassportAuth.init();
app.use(sesiones.mongo) 
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('hbs', engine({
  extname:'.hbs',
  defaultLayout:"main.hbs"
}));
app.set('view engine', '.hbs');
app.set('views','./public/views');

let userName =""

const decodeToken= (data)=>{
  try {
    const datos = jwt.verify(data,process.env.SecrectKey)
    return datos.data
  } catch (error) {
    return {error: "token no corresponde" }
  } 
}

const userVerify =  (req,res,next)=>{
  userName= req.session.nombre
  const emailToken = req.cookies.token
  const token = decodeToken(emailToken)
  if(userName?.email==token){
      next()
  }else{
    res.clearCookie("token")
    res.redirect('/loginEmail')
  }
}

app.use("/productos", userVerify, express.static(__dirname+'/public'))

dayjs.extend(customParseFormat)

const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

httpServer.listen(process.env.PORT, () =>{
  console.log(`Server running on port: ${process.env.PORT} ands PID: ${process.pid}`)
})


app.use('/',routerLogin)

app.use('/',routerDestroy)

app.use('/',userVerify, routerInfo)

app.use('/',userVerify,routerCarts)

app.use('/',userVerify,routerUserCart)

app.use('/productos',userVerify, routerProducts)

app.use('/',userVerify,routerOrder)

app.use('/',userVerify,routerChat)

app.get('*',noRuta)


const newMessage = async (newMsg,socket) => {
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
    const chatMsg = ({...newMsg, createAt:`${dateFormated} hs`})
    await ChatDao.save(chatMsg)
  const allMsg = await ChatDao.getAll()
  io.sockets.emit('all messages', allMsg)
}

const allMessages = async (socket)=>{
  const allMsg = await ChatDao.getAll()
  socket.emit('all messages', allMsg)
}


io.on('connection', socket => {
    socket.on('new msg', newMsg => {
      newMessage(newMsg,socket)
    })
    socket.on('all msg',_ => {
      allMessages(socket)
    })
})

