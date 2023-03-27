const express = require('express')
const router = express.Router()
const { orderById } = require('../controller/order')

router.get('/order/:id',orderById)


module.exports = router