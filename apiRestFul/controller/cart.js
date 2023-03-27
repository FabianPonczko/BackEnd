const { CartDao, UserDao } = require("../Dao/factoryDao")

const getCart = async(req,res)=>{
    const charts = await CartDao.getAll()
    res.json(charts)
}

const postCart = async (req,res)=>{
    const productId= req.body //id del producto y id del usuario
    const respuesta = await CartDao.save(productId)
    const userCart = await UserDao.getById(respuesta.user)
    const newCarts=userCart.carts
    if(!newCarts.length>0){
        return await UserDao.updateById(respuesta.user,{carts:respuesta._id})     
    }
      for (const item of newCarts){
          if(String(item.products._id) === String(respuesta.products)){
              return await UserDao.updateById(respuesta.user,item.products.id)     
            }
      }
            const copyCarts = newCarts
            copyCarts.push(respuesta._id)
            return  await UserDao.updateById(respuesta.user,{carts:copyCarts})
        }

const putCart= async(req,res)=>{
        const id = req.params.id
        const newCart = req.body
            await CartDao.updateById(id,newCart)
        const carts = await CartDao.getAll()
        res.json(carts)
    }

const deleteCart= async (req,res)=>{
        const id = req.params.id
        await CartDao.DeleteById(id)
        const carts = await CartDao.getAll()
        res.json(carts)
    }

const getCartById = async(req,res)=>{
    const id = req.params.id
    const chart = await CartDao.getById(id)
    res.json(chart)
}

module.exports={
    getCart,
    postCart,
    putCart,
    deleteCart,
    getCartById
}