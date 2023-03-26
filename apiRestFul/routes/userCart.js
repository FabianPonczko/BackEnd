const express = require('express')
const router = express.Router()
const {userCart} = require ('./../controller/userCart.js')
const {ProductDao, UserDao} = require('../Dao/factoryDao')

router.get('/userCart',userCart)


router.get('/user', async(req,res)=>{
    const charts = await UserDao.getAll()
    res.json(charts)
})

router.get("/user/:id",async (req,res)=>{
    const id = req.params.id
    const products = await UserDao.getById(id)
    res.json(products)
})

module.exports = router