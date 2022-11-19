// import {Container} from '../Containers/index.js'

import {CartsMongo} from './Carts/index.js'
import {ProductsMongo} from './Products/index.js'


// const PRODUCTS_FILENAME = 'products'
// const CART_FILENAME = 'cart'

// const productsDao = new Container(PRODUCTS_FILENAME)
// const cartDao = new Container(CART_FILENAME)

const SELECTED_DATABASE = "mongo"
const getSelectedDaos = ()=>{
    switch(SELECTED_DATABASE){
        case "mongo":{
            return{
                ProductDao: new ProductsMongo(),
                CartDao: new CartsMongo()
            }
        }
    }

}
const {ProductDao,CartDao} = getSelectedDaos()

export {ProductDao,CartDao}