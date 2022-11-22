import  express  from "express"
import { cartRouter, ProductRouter } from "./routers/index.js";

const app = express()

const PORT =  process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products', ProductRouter)

app.use('/api/carts',cartRouter)

app.use('*', (req,res)=>{
    res.send({ error : -1, descripcion: "ruta no existe" })
})

app.listen(PORT,()=>{console.log(`Server corriendo en puerto: ${PORT}`)})
