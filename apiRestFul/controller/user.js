const { UserDao, CartDao } = require("../Dao/factoryDao")

const userCart = async(req,res)=>{
    userName= req.session.nombre
    const {carts} = await UserDao.getById(userName.id)

    console.log(carts)
    
    res.render('tableCart',{products:carts})
}

const getUser = async(req,res)=>{
    const charts = await UserDao.getAll()
    res.json(charts)
}

const getUserById = async (req,res)=>{
    const id = req.params.id
    const products = await UserDao.getById(id)
        let total = 0
    products.carts.forEach(element => {
        total += element.products.price*element.quantity
    });
            
    res.json({products,total})
}

const getUserCartById = async (req,res)=>{
    const id = req.params.id
    const respuesta = await CartDao.getAll({user:id})
    respuesta.forEach(async element=>{
        await CartDao.DeleteById(element._id)
    })
}


module.exports = {
    userCart,
    getUser,
    getUserById,
    getUserCartById
}