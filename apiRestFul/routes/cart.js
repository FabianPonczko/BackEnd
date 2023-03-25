const express = require('express')
const router = express.Router()
const {CartDao,UserDao} = require('../Dao/factoryDao')
const dayjs = require("dayjs")
const mongoose = require('mongoose')



router.get('/user', async(req,res)=>{
    const charts = await UserDao.getAll()
    res.json(charts)
})


router.get('/carrito', async(req,res)=>{
    const charts = await CartDao.getAll()
    res.json(charts)
})

router.post("/carrito",async (req,res)=>{
    const productId= req.body //id del producto y id del usuario
    const respuesta = await CartDao.save(productId)
    // console.log("2",respuesta)//_id id del carrito
    
    // const userCart = await UserDao.getById(productId.user)
    // console.log("3",userCart)// _id id del usuario carts: carrito

    // const cart = userCart.carts


    // await UserDao.updateById(respuesta.user,{cart:respuesta._id})
    
    const carts = await CartDao.getAll()
    res.json(carts)
})


router.put('/carrito/:id', async(req,res)=>{
    const id = req.params.id
    const newCart = req.body
     await CartDao.updateById(id,newCart)
    const carts = await CartDao.getAll()
    res.json(carts)
})

router.delete("/carrito/:id",async (req,res)=>{
    const id = req.params.id
    await CartDao.DeleteById(id)
    const carts = await CartDao.getAll()
    res.json(carts)
})

router.get('/carrito/:id', async(req,res)=>{
    const id = req.params.id
    const chart = await CartDao.getById(id)
    res.json(chart)
})



module.exports = router