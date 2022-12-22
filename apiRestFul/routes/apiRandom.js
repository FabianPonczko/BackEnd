const express = require('express')
const router = express.Router()

router.get('/apirandoms',(req,res)=>{
    const countNum = req.query.cant||100000
    let aleatorio
    let numeros={}
    for (let index = 0; index < countNum; index++) {
        aleatorio = Math.floor(Math.random()*1000)+1
        
        numeros[aleatorio]?numeros[aleatorio]++:numeros[aleatorio]=1
        
        // console.log(numeros)
    }
    
    
     res.send(numeros)
})

module.exports = router