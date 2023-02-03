const session = require('express-session')

const destroy = async (req,res)=>{
    const userName=req.session.nombre
    console.log("se elimino session ", userName)
    req.session.destroy()    
    
    
        res.render('logout.hbs',{userName})
        res.setHeader('Content-Type', 'text/html');

}
module.exports = {destroy}