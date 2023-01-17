const HttpServer  = require('http')

const PORT = process.argv[2]

HttpServer.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT} ands PID: ${process.pid} - MODO FORK`)
  })