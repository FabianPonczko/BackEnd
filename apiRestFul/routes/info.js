const express = require('express')
const route = express.Router()


const datos ={
    argumentos: process.argv,
    Nombre_Plataforma: process.platform,
    version_Nodejs:process.version,
    memoria_Total_Rss:process.memoryUsage().rss,
    path_Ejecucion:process.argv[1],
    process_Id:process.pid,
    carpeta_Projecto:process.cwd()
}

route.get('/info', (req,res)=>{
    res.send(datos)
})

module.exports = route