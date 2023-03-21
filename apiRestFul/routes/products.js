const express = require('express')
const router = express.Router()
const {ProductDao} = require('../Dao/factoryDao')


router.get("/productos",async (req,res)=>{
    const user= req.session.nombre
    const products = await ProductDao.getAll()
    res.json({products:products,user:user})
})

router.get("/productos/:category",async (req,res)=>{
    const category = req.params.category
    console.log("cattegory ", category)
    const products = category=="Sin filtro"? await ProductDao.getAll(): await ProductDao.getAll({category:category})
    console.log("products :",products)
    res.json(products)
})

router.get("/eliminar/:id",async (req,res)=>{
    const id = req.params.id
    console.log("pido el id para borrar, ",id)
    const products = await ProductDao.DeleteById(id)
    // console.log("products :",products)
    // res.json(products)
})


module.exports = router