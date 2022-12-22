
const {calculo}= require('./calculo.js')


let num = process.argv[2] 


let resultado = calculo(num)



 process.send(resultado)
 process.exit();