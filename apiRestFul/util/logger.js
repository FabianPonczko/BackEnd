const logger = require('pino')



const porConsola=()=>{
    const archivoConsola=logger()
    archivoConsola.level="info"
    return archivoConsola
}

const porArchivoWarn=()=>{
    const archivoWarn=logger("warn.log")
    archivoWarn.level="warn"
    return archivoWarn
}


const porArchivoError=()=>{
    const archivoError=logger("error.log")
    archivoError.level="error"
    return archivoError
}
const consola = porConsola()
const warn = porArchivoWarn()
const error = porArchivoError()

module.exports = {
    consola,
    warn,
    error
}

