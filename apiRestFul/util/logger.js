const pino = require('pino')

function porConsola(){
     const consola= pino()
     consola.level = 'info'
     return consola
}

function porArchivoWarn(){
    const archivoWarn=pino("warn.log")
    archivoWarn.level="warn"
    return archivoWarn
}


function porArchivoError(){
    const archivoError=pino("error.log")
    archivoError.level="error"
    return archivoError
}

module.exports = {
    porConsola,
    porArchivoWarn,
    porArchivoError
}

