const express = require('express')
const route = express.Router()


route.get('/info', (req,res)=>{
    res.send(`
        <div style="color:white;background-color:black; margin:55px; padding:20px">    
        <h3> ===============  La app se inicia en server.js con parametro mongo 
            para elegir la persistencia ( "node server.js mongo" )   ==================</h3>
        <h3> * Usar "node server.js mongo" ya que el factoryDao toma el primer parametro pasado por argumento para usar la BD mongo. (la unica programada para el ejemplo) </h3>
        <h3> * Se usa patron singleton para crear instancia de UserMongo </h3>
        <h3> * PORT=8080 </h3>
        <h3> * Selected_DB=mongo </h3>
        <h3> * Mongo_DB_Url=mongodb+srv://FabianPonczko:Dv6911us.m@cluster0.yhlgayf.mongodb.net/?retryWrites=true&w=majority </h3>
        <h3> * Mongo_DB_Name=segundaEntrega </h3>
        <h3> * SecrectKey=secret password  (JWT) </h3> 
        <h3> * TiempoToken=60m (JWT)</h3>
        <h3> * newUserToEmail=backendponczko@gmail.com (Email de correo para nuevos usuarios)</h3>
        <h3> * usuario administrador: "admin@admin"  password : "admin" </h3>
        <h3> (EL USUARIO "admin@admin" TIENE OPCION DE REALIZAR CRUD SOBRE LOS PRODUCTOS) </h3>
        <h3> Projecto desplegado en railway: <b style="color:yellow"> https://backend-ponczko.up.railway.app/</b> </h3>
        <h4 style="color:tomato"> * localhost:8080/info  (link a este archivo) </h4>
        </div>  `
        )
})


module.exports = route