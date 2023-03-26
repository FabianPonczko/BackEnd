const {consola,warn,error} = require('../util/logger.js')

const noRuta = (req,res)=>{
    const {url,method}=req
    warn.warn(`Metodo: ${method} de la Ruta: ${url} no corresponde a una ruta valida`)
    
    setTimeout(() => {
        res.redirect("/productos")
    }, 1000);
  }

module.exports = {noRuta}