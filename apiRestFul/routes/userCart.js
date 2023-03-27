const express = require('express')
const router = express.Router()
const {userCart, getUserById, getUserCartById, getUser} = require ('./../controller/user.js')

router.get('/userCart',userCart)

router.get('/user',getUser)

router.get("/user/:id",getUserById)

router.delete("/user/carts/:id",getUserCartById)


module.exports = router