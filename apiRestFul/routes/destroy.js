const express = require('express')
const router = express.Router()
const {destroy} = require ('./../controller/destroy.js')

router.get('/destroy',destroy)


module.exports = router