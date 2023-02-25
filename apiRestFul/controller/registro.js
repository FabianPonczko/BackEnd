const {consola,warn,error} = require('../util/logger.js')
const {UserDao} = require('../Dao/factoryDao.js')
const bcrypt = require('bcrypt');
const session = require ('express-session')


const registro = async(req,res)=>{
    const {url,method} = req
    consola.info(`direccion ${url} , metodo ${method}`)
      res.render('RegisterEmailUser')
  
      try {
          const { name, adress, age, phone, email, password } = req.query;
          if (!email || !password){
            //return res.send({ success: false });
            warn.warn(`falta usuario o password`)
            return consola.info(`falta usuario o password`)
          }
      
          const existUser = await UserDao.getOne({ email :email});
      
          if (existUser && existUser.password) {
            error.error("el usuario ya existe" )
            return consola.info("el usuario ya existe" )
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
      
          await UserDao.save({ name, adress, age, phone, email, password :passwordHash});
      
          console.log({ success: true });
        } catch (error) {
          console.log(error);
      
          console.log({ success: false });
        }
  }

const auth = async(req,res)=>{
    const {email} =req.query 
     req.session.nombre= email
    res.redirect('/')
}
const loginEmail = async(req,res)=>{
    const {url,method} = req
      res.render('loginEmailUser')
}


module.exports ={
  registro,
  loginEmail,
  auth,
}