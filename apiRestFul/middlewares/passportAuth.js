const passport = require('passport')
const LocalStrategy = require('passport-local')
const {UserDao} = require('../Dao/factoryDao.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generarToken= (email)=>{
  const token = jwt.sign({data:email},process.env.SecrectKey,{expiresIn:process.env.TiempoToken})
  return token
}

const init = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserDao.getById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          if (!email || !password) return done(null, false);
          const user = await UserDao.getOne({ email })
          if (!user || !bcrypt.compareSync(password, user.password)) return done(null, false);

          const userResponse = {
            id: user._id,
            email: user.email,
            admin: user.admin,
            cart: user.cart,
          };
          userResponse.token = generarToken(user.email)
          done(null, userResponse);
          
        } catch (error) {
          console.log("este: ",error);
          done(error);
        }
      }
    )
  );

};
const PassportAuth ={
    init
}
module.exports = {PassportAuth} 