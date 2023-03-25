const express = require('express')
const router = express.Router()
const {userCart} = require ('./../controller/userCart.js')

router.get('/userCart',userCart)

module.exports = router