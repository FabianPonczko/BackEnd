const express = require('express')
const router = express.Router()
const {ChatDao,UserDao} = require('../Dao/factoryDao')
const dayjs = require("dayjs")
const {emailNuevoOrder} = require('./../services/nodemailer.js')

const sendOrder = (carts,total,email)=>{
emailNuevoOrder(carts,total,email)
}

router.get('/order/:id',async (req,res)=>{
    const id = req.params.id
    const products = await UserDao.getById(id)
        let total = 0
    products.carts.forEach(element => {
        total += element.products.price*element.quantity
    });
    const carts= products.carts
   
    sendOrder(carts,total,products.email)
    // res.json({products,total})



})

module.exports = router