const express = require('express')
const { PROTOCOL } = require('sqlite3')
const router = express.Router()
const {ProductDao, UserDao} = require('../Dao/factoryDao')


router.get("/productos",async (req,res)=>{
    const user= req.session.nombre
    const products = await ProductDao.getAll()
    const {carts} = await UserDao.getById(user.id)
    let sumQuantity = 0
    carts.forEach(element => {
        sumQuantity += element.quantity
        });
    res.json({products:products,user:user,userCartQuantity:sumQuantity})
})

router.post("/productos",async (req,res)=>{
    console.log("entraron nuevos productos")
    const product= req.body
    await ProductDao.save(product)
    const products = await ProductDao.getAll()
    res.json({products:products})
})

router.put("/productos/:id",async (req,res)=>{
    const id = req.params.id
    const newProduct = req.body
     await ProductDao.updateById(id,newProduct)
    const products = await ProductDao.getAll()
    res.json({products:products})
    
})

router.get("/productos/:id",async (req,res)=>{
    const id = req.params.id
    console.log("desde get productos/:id busco el id: ", id)
    const products = await ProductDao.getById(id)
    console.log("desde get los productos encontrados son: ", products)
    res.json(products)
})

router.get("/category/:category",async (req,res)=>{
    const category = req.params.category
    console.log("cattegory ", category)
    const products = category == "Sin filtro" ? await ProductDao.getAll(): await ProductDao.getAll({category:category})
    console.log("pro CAT: ",products)
    res.json(products)
})

router.delete("/eliminar/:id",async (req,res)=>{
    const id = req.params.id
    console.log("pido el id para borrar, ",id)
    await ProductDao.DeleteById(id)
    const products = await ProductDao.getAll()
    res.json({products:products})
})


module.exports = router