import  express  from "express"
import { cartRouter, ProductRouter } from "./routers/index.js";



const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products', ProductRouter)

app.use('/',cartRouter)


app.listen(PORT,()=>{console.log(`Server corriendo en puerto: ${PORT}`)})