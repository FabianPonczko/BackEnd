import {Container} from '../Containers/index.js'

const PRODUCTS_FILENAME = 'products'

const productsDao = new Container(PRODUCTS_FILENAME)

export {productsDao}