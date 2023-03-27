const { UserDao } = require("../Dao/factoryDao");
const { emailNuevoOrder } = require("../services/nodemailer");

const sendOrder = (carts,total,email)=>{
    emailNuevoOrder(carts,total,email)
    }
    
const orderById = async (req,res)=>{
    const id = req.params.id
    const products = await UserDao.getById(id)
        let total = 0
    products.carts.forEach(element => {
        total += element.products.price*element.quantity
    });
    const carts= products.carts
   
    sendOrder(carts,total,products.email)
}


module.exports={orderById}