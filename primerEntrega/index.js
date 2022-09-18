const fs = require (`fs`)

let maxidEncontrada = 0
let readDataObj=[]

/* Funcion crea objeto, si existe un objeto lee el ID e incrementa en 1 el valor del Id al nuevo objeto y lo agrega al archivo
    si no existe un archivo crea uno nuevo y agrega obj.*/
async function write(archivo,obj){
    try{
        const readData = await fs.promises.readFile(archivo)
        readDataObj= JSON.parse(readData)
        maxidEncontrada =  readDataObj.reduce((acc,ele)=>(acc.Id>ele.Id?acc.Id:ele.Id),"0")
        obj.Id = parseInt(maxidEncontrada) + 1 
        readDataObj.push(obj)
        try{
            await fs.promises.writeFile(archivo, JSON.stringify(readDataObj,null,2))
            console.log("ID asignado: ",obj.Id )
          }
          catch(error){
              console.log("Error: ". error)
          }
    }
    catch(err){
        try{
            obj.Id=1
            readDataObj.push(obj)
            await fs.promises.writeFile(archivo, JSON.stringify(readDataObj,null,2))
            console.log("ID asignado: ",obj.Id )
          }
          catch(error){
              console.log("Error: ". error)
          }
    }
}
//Lee objetos del archivo (si idBuscada == undefined muestra todos sino solo el Obj con ID buscado)
async function read(archivo,idBuscada){
    let objEncontrado=[]
    try{
        const text = await fs.promises.readFile(archivo)
        const textObj = JSON.parse(text)
        if(!idBuscada){
            console.log(textObj)
        }else{
            textObj.forEach(element => {
                if(element.Id==idBuscada){
                    objEncontrado.push(element)
                }
            });
            if (objEncontrado[0]){
                console.log(objEncontrado)
            }else{
                console.log("null")
            }
        }
    }
    catch(error){
        console.log("Error de la funcion read: ", error)
    }
}
//Borra Obj con el Id buscado, si idBorrar == undefined borra todos
async function deleteTo(archivo,idABorrar){
    let readObj=[]
    try{
        const read = await fs.promises.readFile(archivo,"utf-8")
        readObj = JSON.parse(read)
        if(!idABorrar){
            readObj.splice(0)
        }else{
              readObj.forEach((e,index)=>{
                if (e.Id==idABorrar){
                    readObj.splice(index,1)
                    }
                })
            }
    }
    catch(err){
        console.log({err})
    }
    try{
        await fs.promises.writeFile(archivo,JSON.stringify(readObj,null,2))
    }catch(err){
        console.log(err)
    }
}

class Contenedor {
    constructor(title,price,thumbnail){
        this.title=title
        this.price=price
        this.thumbnail=thumbnail
    }

    save(archivo,objeto){
        write(archivo,objeto)
    }
    getById(archivo,idBuscada){
        read(archivo,idBuscada)
    }
    getAll(archivo){
        read(archivo)
    }
    deleteById(archivo,idABorrar){
        deleteTo(archivo,idABorrar)
    }
    deleteAll(archivo){
        deleteTo(archivo)
    }
   
}

const objeto1=new Contenedor("calculadora",125.32, "https://aQualquierLugar")



//Para testear un método descomentar el que corresponda


//Para crear nuevos objetos:
   objeto1.save("./productos.txt",objeto1)

//Para busca objetos por ID:
    //objeto1.getById("./productos.txt",2)

//Para mostrar todos los objetos:
    //objeto1.getAll("./productos.txt")

//Para borra objetos segun ID:
    //objeto1.deleteById("./productos.txt",1)

//Para borra todos los productos del archivo:
    //objeto1.deleteAll("./productos.txt")
    