const express = require ('express')
const {Router} = express

const router = Router()

let productos= [{
    title:"Notebook hp",
    price:250000,
    thumbnail:'https://lezamapc.com.ar/33210-large_default/notebook-hp-14-245-amd-ryzen-5-5500u-1t-8gb.jpg',
    id:1
}]



router.get('/api/productos',(req,res)=>{
    res.json(productos)
})

router.get('/api/productos/:id', (req,res)=>{
    const productoId = parseInt(req.params.id)
    console.log({productoId})
    const producto = productos.find(product=>product.id==productoId)
    if(producto)
        res.json({producto})
    res.json({error :'Producto no encontrado'})
})

router.post('/api/productos',(req,res)=>{
    const productoPost = req.body
    productoPost['id']=  Date.now()
    productos.push(productoPost)
    res.json(productoPost)
})

router.put('/api/productos/:id',(req,res)=>{
    const id= parseInt(req.params.id)
    let producto = req.body
    const productoIndexId = productos.findIndex(product=>product.id == id)
    console.log({productoIndexId})
    if (productoIndexId >=0){
        producto['id']=id
        console.log(producto)
        productos.splice(productoIndexId,1,producto)
        res.status(200).json("actualización exitosa")
    }
    res.status(403).json({error: 'producto no encontrado'})
})

router.delete('/api/productos/:id',(req,res)=>{
    let enviar =""
    let cont =0
    const id= parseInt(req.params.id)
        productos = productos.filter(product=>{
            if(product.id != id){
                return product
            }else{
                cont++
            }
        })
        cont>0 ? res.status(200).json('producto borrado correctamente'):res.status(403).json({error: 'producto no encontrado'})
    
    
})

module.exports = router