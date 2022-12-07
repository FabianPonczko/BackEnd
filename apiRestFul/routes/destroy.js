const express = require('express')
const router = express.Router()
const session = require('express-session')


router.get('/destroy', (req,res)=>{

    console.log("se elimino session ", req.session.nombre)
    req.session.destroy()    
   res.redirect("/login")
})

module.exports = router