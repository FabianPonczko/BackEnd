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
    console.log("resp: ",respuesta)//devuelve el carrito creado

    // console.log("2",respuesta)//_id id del carrito
    
    // const userCart = await UserDao.getById(productId.user)
    // console.log("3",userCart)// _id id del usuario carts: carrito

    // const cart = userCart.carts

    const userCart = await UserDao.getById(respuesta.user)
    console.log("usuario encontrado ",userCart)//el usuario encontrado
    let newCarts=userCart.carts
    console.log("newcard",newCarts)
    console.log(newCarts.length)
    if(!newCarts.length>0){
        return await UserDao.updateById(respuesta.user,{carts:respuesta._id})     
    }
    
      for (const item of newCarts){
         console.log("item ",item  ,"type ", typeof item , "respuesta ", respuesta ,"type ", typeof respuesta )
         
          if(String(item.products._id) === String(respuesta.products)){
                console.log("igual")
              return await UserDao.updateById(respuesta.user,item.products.id)     
            }
        // else{
        //     //  newCarts.push(respuesta._id)
        //     console.log("no igual")
        //     const copyCarts = newCarts
        //     copyCarts.push(respuesta._id)
        //     return  await UserDao.updateById(respuesta.user,{carts:copyCarts})
        //  }
      }
            const copyCarts = newCarts
            copyCarts.push(respuesta._id)
            return  await UserDao.updateById(respuesta.user,{carts:copyCarts})
            // await UserDao.updateById(respuesta.user,{carts:respuesta._id})
    
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