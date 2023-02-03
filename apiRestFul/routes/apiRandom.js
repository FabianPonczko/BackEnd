const express = require('express')
const router = express.Router()
const {random} = require ('../controller/random.js')

router.get('/apirandoms',random)

module.exports = router