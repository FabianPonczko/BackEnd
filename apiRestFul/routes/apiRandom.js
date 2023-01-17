const express = require('express')
const router = express.Router()

const {fork} = require('child_process')


let countNum

router.get('/apirandoms',(req,res)=>{
    countNum = req.query.cant || 100000000
    
    const child = fork('./util/calculoAleatorio.js',[countNum])
    
    child.on('message', msg => {
        res.send({resultado:msg})
    });

    
    
})

module.exports = router