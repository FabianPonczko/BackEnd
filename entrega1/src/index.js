import  express  from "express"
import { ProductRouter } from "./routers/index.js";



const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products', ProductRouter)



app.listen(PORT,()=>{console.log(`Server corriendo en puerto: ${PORT}`)})
