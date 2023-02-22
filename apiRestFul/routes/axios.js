const express = require('express')
const router = express.Router()
const { Axios } = require("axios");
const UsersMongo = require('../Dao/Users/UsersMongo');
const {UserDao} = require('../Dao/factoryDao.js')



router.get('/axios/users',async (req,res)=>{
    const users = await UserDao.getAll()
    res.json(users)
})

router.get('/users/:email',async (req,res)=>{
    const email = req.params.email
    const emailUser = await UserDao.getOne({ email : email})
    res.send(emailUser)
})

module.exports = router