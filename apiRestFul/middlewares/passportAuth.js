// import passport from "passport";
const passport = require('passport')
// import { Strategy as LocalStrategy } from "passport-local";
const LocalStrategy = require('passport-local')
// import { Strategy as GithubStrategy } from "passport-github2";

// import { UserDao } from "../Dao/index.js";
const {UserDao} = require('./../Dao/index.js')
const bcrypt = require('bcrypt')

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
          
          
          // console.log(password)
          // console.log(user.password)
          
          // no da el tiempo, pero bcryipt o similar
          if (!user || !bcrypt.compareSync(password, user.password)) return done(null, false);

          const userResponse = {
            id: user._id,
            email: user.email,
            cart: user.cart,
          };

          done(null, userResponse);
        } catch (error) {
          console.log(error);
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