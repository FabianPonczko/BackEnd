const express = require('express')
const router = express.Router()
const {ProductDao} = require('../Dao/factoryDao')


router.get("/productos",async (req,res)=>{
    console.log("pidiendo productos por get")
    const user= req.session.nombre
    const products = await ProductDao.getAll()
    res.json({products:products,user:user})
})

router.post("/productos",async (req,res)=>{
    console.log("entraron nuevos productos")
    const product= req.body
    await ProductDao.save(product)
    
})

router.get("/productos/:id",async (req,res)=>{
    const id = req.params.id
    console.log("busco el id: ", id)
    const products = await ProductDao.getById(id)
    console.log("los productos encontrados son: ", products)
    res.json(products)
})

router.get("/category/:category",async (req,res)=>{
    const category = req.params.category
    console.log("cattegory ", category)
    const products = category=="Sin filtro"? await ProductDao.getAll(): await ProductDao.getAll({category:category})
    console.log("products :",products)
    res.json(products)
})

router.delete("/eliminar/:id",async (req,res)=>{
    const id = req.params.id
    console.log("pido el id para borrar, ",id)
    const products = await ProductDao.DeleteById(id)
    // console.log("products :",products)
    // res.json(products)
})


module.exports = router