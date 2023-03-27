const express = require('express')
const router = express.Router()

const { getCart, postCart, putCart, deleteCart, getCartById } = require('../controller/cart')

router.get('/carrito', getCart)

router.post("/carrito",postCart)

router.put('/carrito/:id', putCart)

router.delete("/carrito/:id",deleteCart)

router.get('/carrito/:id', getCartById)


module.exports = router