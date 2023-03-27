const express = require('express')
const { info } = require('../controller/info')
const route = express.Router()

route.get('/info', info)


module.exports = route