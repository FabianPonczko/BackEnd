const express = require('express')
const router = express.Router()
const passport = require('passport')
const {registro,auth,loginEmail} = require ('../controller/registro.js')

router.get('/auth',passport.authenticate("login"),auth)  

router.get('/loginEmail',loginEmail)

router.get('/register',registro)


module.exports = router