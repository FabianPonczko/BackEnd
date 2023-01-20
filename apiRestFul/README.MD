
#### Se publica el projecto en el servidor: https://backend-production-0a5b.up.railway.app/
### PORT se pasa por parametro Ej: "node server.js 8081 sino 8080 por default
### la app se inicia en server.js 

* se genera archivo con captura de pantalla de reporte de autocannon "captura-autocannon"

* se usa libreria pino para generar los loggers info, warn y error estos ultimos en sus archivos
correspondientes

* se codea en package.json el uso de 0x server.js para general reporte ox

* se usa artillery para generar las consultas.

* se realiza el analisis de los resultados entre la ruta info sin console.log y 
ruta info-console con console.log detectando que en esta ultima las respuestas del servidor
tarda mas.


