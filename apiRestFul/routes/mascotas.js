const express = require('express')
const {Router} = express
const router = Router()


const mascotas = []

router.get('/',(req,res)=>{
    res.send({mascotas})
})

router.put('/',(req,res)=>{
    const mascota = req.body
    mascotas.push(mascota)
    res.status(200).send('mascota agregada correctamente')
})

module.exports = router