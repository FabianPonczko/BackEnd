const {productos}= require('../Dao/products/products.js')

const productsMocks= (req,res)=>{
    res.render('tableProductsMocks', productos.productsMocks )
  }

  module.exports = {productsMocks}