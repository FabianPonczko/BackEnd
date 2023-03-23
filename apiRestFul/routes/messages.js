const express = require('express')
const router = express.Router()
const {ChatDao} = require('../Dao/factoryDao')
const dayjs = require("dayjs")

router.get('/mensajes/:id',async (req,res)=>{
    const id = req.params.id
    const chatByUser = await ChatDao.getById(id)
    res.json(chatByUser)
})

router.post('/mensajes/',async (req,res)=>{
    const message=req.body
    console.log("message de body: ",message)
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
    const chatMsg = ({...message, createAt:`${dateFormated} hs`})
    const userMessages = await ChatDao.save(chatMsg)
    res.json(userMessages)
})

module.exports = router