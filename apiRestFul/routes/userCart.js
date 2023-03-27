const express = require('express')
const router = express.Router()
const {userCart} = require ('./../controller/userCart.js')
const {ProductDao, UserDao, CartDao} = require('../Dao/factoryDao')

router.get('/userCart',userCart)

router.get('/user', async(req,res)=>{
    const charts = await UserDao.getAll()
    res.json(charts)
})

router.get("/user/:id",async (req,res)=>{
    const id = req.params.id
    const products = await UserDao.getById(id)
        let total = 0
    products.carts.forEach(element => {
        total += element.products.price*element.quantity
    });
            
    res.json({products,total})
    // res.json(products)
})

router.delete("/user/carts/:id",async (req,res)=>{
    const id = req.params.id
    const respuesta = await CartDao.getAll({user:id})
    respuesta.forEach(async element=>{
        await CartDao.DeleteById(element._id)
    })
})

module.exports = router