const express = require('express')
const router = express.Router()
const session = require('express-session')


router.get('/destroy',(req,res)=>{
    const userName=req.session.nombre
    console.log("se elimino session ", userName)
    req.session.destroy()    
    res.render('logout.hbs',{userName})
    
    setTimeout(()=>{
        res.redirect("/login")
    }, 2000);
})

module.exports = router