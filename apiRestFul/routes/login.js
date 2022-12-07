const express = require('express')
const router = express.Router()
const session = require('express-session')


router.get('/login', (req,res)=>{
    res.render('loginUser')
    
    const {name} = req.query  
    req.session.nombre= name      
    console.log("se modifica nombre a", req.session.nombre)
    
   
})

module.exports = router