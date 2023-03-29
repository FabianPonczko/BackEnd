const express = require('express')
const { getChat, getChatById } = require('../controller/chat')
const router = express.Router()


router.post('/chat/',getChat)

router.get('/chat/:id',getChatById)



module.exports = router