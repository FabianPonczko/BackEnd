 const {generarProductsMock} = require ('./productsMock')

class ContenedorMock{
    products=[]
    constructor(){

    }
    createProducts(){
        for (let index = 1; index < 6; index++) {
            const newProduct = generarProductsMock(index)
            this.products.push(newProduct)
        }
        return this.products
    }
    getAll(){
        return this.products
    }
}

module.exports = ContenedorMock