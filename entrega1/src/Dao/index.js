import {Container} from '../Containers/index.js'

const PRODUCTS_FILENAME = 'products'
const CART_FILENAME = 'cart'

const productsDao = new Container(PRODUCTS_FILENAME)
const cartDao = new Container(CART_FILENAME)

export {productsDao,cartDao}