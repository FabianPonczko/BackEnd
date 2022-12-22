const calculo = (num)=>{
    
   
    let aleatorio
    let numeros={}
    
    for (let index = 0; index < num; index++) {
        aleatorio = Math.floor(Math.random()*1000)+1
        
        numeros[aleatorio] ? numeros[aleatorio]++ : numeros[aleatorio]=1
        
    }
    
    return numeros
   
    
}
module.exports.calculo = calculo