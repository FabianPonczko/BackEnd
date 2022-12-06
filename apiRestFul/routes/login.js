const express = require('express')
const router = express.Router()
const session = require('express-session')

router.get('/login', (req,res)=>{
    res.render('loginUser')
})

module.exports = router