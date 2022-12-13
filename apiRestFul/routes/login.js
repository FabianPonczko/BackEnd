const express = require('express')
const router = express.Router()
// const session = require('express-session')


router.get('/login', (req,res)=>{
    res.render('loginUser')
    
    const {name} = req.query  
    req.session.nombre= name      
    if(req.session.nombre)
        console.log("se modifica nombre a", req.session.nombre)
    
   
})
router.get('/loginEmail',(req,res)=>{
    res.render('loginEmailUser')

})

router.get('/register',(req,res)=>{
    res.render('RegisterEmailUser')
})

module.exports = router