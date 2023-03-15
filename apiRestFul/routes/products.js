const express = require('express')
const router = express.Router()
const {ProductDao} = require('../Dao/factoryDao')


router.get("/productos",async (req,res)=>{
    const products = await ProductDao.getAll()
    res.json(products)
})

module.exports = router