// import { Router } from "express";
const {Router} = require('express')
// import passport from "passport";
const passport = require('passport')
// import { UserDao } from "../../Dao/index.js";
const {UserDao} = require('../../Dao/index.js')

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send({ success: false });
    // verificar si existe o no (CLAVE PARA PASSPORT CON RRSS)

    const existUser = await UserDao.getOne({ email :email});

    if (existUser && existUser.password) {
      return res.send({ success: false, error: "el usuario ya existe" });
    }

    if (existUser && !existUser.password) {
      const updateUser = await UserDao.updateById(existUser._id, {
        ...existUser,
        password,
      });
      return res.send({ success: true });
    }

    // PASSWORD! podriamos usar bcrypt!
    // POR AHORA SIN CARRITO
    await UserDao.save({ email, password });

    res.send({ success: true });
  } catch (error) {
    console.log(error);

    res.send({ success: false });
  }
});

router.post("/", passport.authenticate("login"), async (req, res) => {
  res.send({ success: true, message: "Logueado!", user: req.user });
});



module.exports = router ;
