const { UserDao } = require("../Dao/factoryDao")

const userCart = async(req,res)=>{
    userName= req.session.nombre
    const {carts} = await UserDao.getById(userName.id)

    console.log(carts)


    
    res.render('tableCart',{products:carts})
}
module.exports = {userCart}