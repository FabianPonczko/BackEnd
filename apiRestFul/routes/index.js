const routerLogin= require ('./login')
const routerDestroy = require ('./destroy')
const routerInfo = require('./info.js')
const routerProducts = require('./products.js')
const routerCarts = require('./cart.js')
const routerUserCart = require('./userCart.js')
const routerOrder = require('./order.js')
const routerChat = require('./chat.js')


module.exports = {
    routerLogin,
    routerDestroy,
    routerInfo,
    routerProducts,
    routerCarts,
    routerUserCart,
    routerOrder,
    routerChat
}