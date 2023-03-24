const express = require('express')
const router = express.Router()
const {CartDao} = require('../Dao/factoryDao')
const dayjs = require("dayjs")
const mongoose = require('mongoose')


router.get('/carrito', async(req,res)=>{
    const charts = await CartDao.getAll()
    res.json(charts)
})

router.post("/carrito",async (req,res)=>{
    const productId= req.body
    console.log(productId)
    await CartDao.save(productId)
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