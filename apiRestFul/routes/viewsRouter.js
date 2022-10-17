const express = require ('express')
const {Router} = express
const productos = require ('./productos.js')

const ViewsRouter = Router()

ViewsRouter.get("/",(req,res)=>{
    res.render("formProducts")
})

ViewsRouter.get('/productos',(req,res)=>{
    res.render("tableProducts")
})



module.exports = ViewsRouter