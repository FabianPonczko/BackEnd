const express = require('express')
const router = express.Router()
const session = require('express-session')


router.get('/destroy',async (req,res)=>{
    const userName=req.session.nombre
    console.log("se elimino session ", userName)
    req.session.destroy()    
    
    
        res.render('logout.hbs',{userName})
        res.setHeader('Content-Type', 'text/html');
        
    // res.setTimeout(3000,function(){
    //     res.render('loginEmailUser.hbs')
    // })



        // call back function is called when request timed out.

})

module.exports = router