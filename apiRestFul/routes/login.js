const express = require('express')
const router = express.Router()
// const session = require('express-session')
const {UserDao} = require('../Dao/index.js')
const passport = require('passport')
const bcrypt = require('bcrypt');
const {porConsola,porArchivoWarn,porArchivoError} = require('../util/logger')




router.get('/login', (req,res)=>{
  const {url,method} = req
  porConsola(`direccion ${url} , metodo ${method}`)
    res.render('loginUser')
    
    const {name} = req.query  
    req.session.nombre= name      
    if(req.session.nombre)
        console.log("se modifica nombre a", req.session.nombre)
    

})

// router.post("/", passport.authenticate("login"), async (req, res) => {
//     res.send({ success: true, message: "Logueado!", user: req.user });
//   });
router.get('/auth',passport.authenticate("login"),(req,res)=>{
    const {email,password} =req.query 
       console.log(email)

     req.session.nombre= email      
     res.redirect('/')
})  

router.get('/loginEmail',async(req,res)=>{
  const {url,method} = req
  porConsola(`direccion ${url} , metodo ${method}`)
  porArchivoWarn(`direccion ${url} , metodo ${method}`)
    res.render('loginEmailUser')


})

router.get('/register',async(req,res)=>{
    res.render('RegisterEmailUser')

    try {
        const { email, password } = req.query;
        if (!email || !password)
          //return res.send({ success: false });
          return console.log({ success: false });
        // verificar si existe o no (CLAVE PARA PASSPORT CON RRSS)
    
        const existUser = await UserDao.getOne({ email :email});
    
        if (existUser && existUser.password) {
          return console.log({ success: false, error: "el usuario ya existe" });
        }
        const passwordHash = bcrypt.hashSync(password, 12)
        console.log(passwordHash)

        if (existUser && !existUser.password) {
          const updateUser = await UserDao.updateById(existUser._id, {
            ...existUser,
            passwordHash,
          });
          return console.log({ success: true });
        }
    
        // PASSWORD! podriamos usar bcrypt!
        // POR AHORA SIN CARRITO
        await UserDao.save({ email, password :passwordHash});
    
        console.log({ success: true });
      } catch (error) {
        console.log(error);
    
        console.log({ success: false });
      }
})

module.exports = router