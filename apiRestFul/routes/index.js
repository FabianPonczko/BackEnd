const routerLogin= require ('./login')
const routerDestroy = require ('./destroy')
const routerInfo = require('./info.js')
const routerApirandons = require('./apiRandom.js')
const routerProducts = require('./products.js')
const routerChats= require('./messages.js')
const routerCarts = require('./cart.js')
const routerUserCart = require('./userCart.js')
const routerOrder = require('./order.js')

module.exports = {
    routerLogin,
    routerDestroy,
    routerApirandons,
    routerInfo,
    routerProducts,
    routerChats,
    routerCarts,
    routerUserCart,
    routerOrder
}