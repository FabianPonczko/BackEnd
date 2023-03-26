const  {faker}  = require('@faker-js/faker');

faker.locale="es"

const generarProductsMock = (id)=>{
    return{
        // id:faker.datatype.uuid(),
        id,
        title: faker.commerce.product(),
        price:faker.commerce.price(),
        thumbnail:faker.image.imageUrl(45, 45, 'products', true)
    }
}

module.exports = { generarProductsMock}

