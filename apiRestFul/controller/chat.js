const { ChatDao } = require("../Dao/factoryDao")

const getChat = async (req,res)=>{
    const respuesta = await ChatDao.getAll()
    res.json(respuesta)
}

const getChatById = async (req, res)=>{
const userEmail =  req.session.nombre
const email = req.params.id
const respuesta = await ChatDao.getAll({userEmail:email})

if(userEmail.email==email){
    res.json(respuesta)
}else{
    res.json({error:"ingrese su email!"})
}
}


module.exports={
    getChat,
    getChatById
}