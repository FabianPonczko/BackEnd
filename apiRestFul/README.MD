
### la app se inicia en server.js ( "node server.js mongo" )

* Usar "node server.js mongo" ya que el factoryDao toma el primer parametro pasado por argumento para usar la BD mongo. (la unica programada para el ejemplo)

* Se usa patron singleton para crear instancia de UserMongo

* Patron repository para productos y mensajes en api/contenedorRepo.js