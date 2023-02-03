const express = require('express')
const compression = require('compression')
const route = express.Router()
const {datos} = require('../controller/datos.js')

route.get('/info', compression(),(req,res)=>{
    res.send(datos)
})

route.get('/info-console', compression(),(req,res)=>{
    console.log("insertando un texto console.log")
    res.send(datos)
})

module.exports = route