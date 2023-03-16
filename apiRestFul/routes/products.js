const express = require('express')
const router = express.Router()
const {ProductDao} = require('../Dao/factoryDao')


router.get("/productos",async (req,res)=>{
    const products = await ProductDao.getAll()
    res.json(products)
})

router.get("/productos/:category",async (req,res)=>{
    const category = req.params.category
    
    const products = await ProductDao.getAll({category:category})
    console.log("products :",products)
    res.json(products)
})

module.exports = router