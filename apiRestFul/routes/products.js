const express = require('express')
const { getProduct, postProduct, putProduct, getProductById, getProductByCategory, deleteProductById } = require('../controller/product')
const router = express.Router()

router.get("/productos",getProduct)

router.post("/productos",postProduct)

router.put("/productos/:id",putProduct)

router.get("/productos/:id",getProductById)

router.get("/category/:category",getProductByCategory)

router.delete("/eliminar/:id",deleteProductById)


module.exports = router