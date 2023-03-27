
### la app se inicia en server.js ( "node server.js mongo" )

* Usar "node server.js mongo" ya que el factoryDao toma el primer parametro pasado por argumento para usar la BD mongo. (la unica programada para el ejemplo)

* Se usa patron singleton para crear instancia de UserMongo

* PORT=8080
* Selected_DB=mongo
* Mongo_DB_Url=mongodb+srv://FabianPonczko:Dv6911us.m@cluster0.yhlgayf.mongodb.net/?retryWrites=true&w=majority
* Mongo_DB_Name=segundaEntrega
* SecrectKey=secret password
* TiempoToken=60m
* newUserToEmail=backendponczko@gmail.com
* Duracion session de mongo 3600s
* usuario administrador: "admin@admin"  password : "admin"
(ESTE USUARIO TIENE OPCION DE REALIZAR CRUD SOBRE LOS PRODUCTOS)

## Projecto desplegado en railway: https://backend-ponczko.up.railway.app/

* localhost:8080/info  (link a este archivo)