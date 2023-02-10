//obtengo productos desde mysql
const Container = require('../../apis/contenedorRepo.js')
const contenedorMock =require('../../apis/contenedorMock.js')
const {KnexMysql,KnexSqlite3} = require('../../apis/configDB.js')



    const products = new Container(KnexMysql,'products')
    products.createDBproducts()

    const productsMocks= new contenedorMock()
    productsMocks.createProducts()

const productos = {
    products,
    productsMocks
}
    module.exports ={productos}