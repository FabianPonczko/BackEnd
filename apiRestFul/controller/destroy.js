const session = require('express-session')

const destroy = async (req,res)=>{
    const userName=req.session.nombre
    if(req.session)
        await req.session.destroy() 

    res.render('logout.hbs',{userName:userName?.nombreUsuario})
    res.clearCookie("token")

}
module.exports = {destroy}