const express = require('express')
const router = express.Router()
const { getMessageById, getMessages } = require('../controller/message')

router.get('/mensajes/:id',getMessageById)

router.post('/mensajes/',getMessages)


module.exports = router