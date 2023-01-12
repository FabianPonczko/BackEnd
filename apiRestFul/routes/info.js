const express = require('express')
const compression = require('compression')
const route = express.Router()
const numCluster= require('os').cpus().length

const datos ={
    argumentos: process.argv,
    Nombre_Plataforma: process.platform,
    version_Nodejs:process.version,
    memoria_Total_Rss:process.memoryUsage().rss,
    path_Ejecucion:process.argv[1],
    process_Id:process.pid,
    carpeta_Projecto:process.cwd(),
    numero_Cpus:numCluster
}



route.get('/info', compression(),(req,res)=>{
    res.send(datos)
})


module.exports = route