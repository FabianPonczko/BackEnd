import  {Router} from 'express'
import {productsDao} from '../../Dao/index.js'
import { verifyRole } from '../../middlewares/verifyRoles.js'
import { DATE_UTILS } from '../../utils/date-utils.js'
import { JOI_VALIDATOR } from '../../utils/joi-validator.js'


const router = Router()


router.get("/", async (req,res)=>{
    try{
        const product = await productsDao.getAll()
        res.send(product)
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})

router.get("/:id", async (req,res)=>{
    try{
        const {id} =req.params
        const product = await productsDao.getById(Number(id))
        res.send(product)
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})

router.post('/', verifyRole, async (req,res)=>{
    try{
        const {title,description,code,thumbnail,price,stock} = req.body
        const products = await JOI_VALIDATOR.product.validateAsync({title,description,code,thumbnail,price,stock,timestamp:DATE_UTILS.getTimestamp()})
        const productCreated = await productsDao.save(products)
        res.send(productCreated)
    }catch(error){
        console.log(`error: ${error}`)
        res.send(error)
    }
})
router.put("/:id",verifyRole, async (req,res)=>{
    try{
        const {id} =req.params
        const {title,description,code,thumbnail,price,stock} = req.body
        const product = await productsDao.updateById({title,description,code,thumbnail,price,stock,timestamp:DATE_UTILS.getTimestamp()},Number(id))
        res.send(product)
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})
router.delete("/:id",verifyRole, async (req,res)=>{
    try{
        const {id} =req.params
        const product = await productsDao.DeleteById(Number(id))
        res.send(product)
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})


export {router as ProductRouter}