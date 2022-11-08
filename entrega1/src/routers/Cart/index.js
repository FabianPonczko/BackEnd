import  {Router} from 'express'
import {cartDao, productsDao} from '../../Dao/index.js'
import { verifyRole } from '../../middlewares/verifyRoles.js'
import { DATE_UTILS } from '../../utils/date-utils.js'
import { JOI_VALIDATOR } from '../../utils/joi-validator.js'


const router = Router()

router.get('/', async(req,res)=>{
    try {
        const cart = await cartDao.getAll()
        res.send(cart)
    } catch (error) {
        
    }
})

router.post('/', verifyRole, async (req,res)=>{
    try{
        const cart = ({timestamp:DATE_UTILS.getTimestamp(), products: []})
        const cartCreated = await cartDao.save(cart)
        res.send({ success: true, cartId: cartCreated.id });
    }catch(error){
        console.log(`error: ${error}`)
        res.send(error)
    }
})
router.delete("/:id",verifyRole, async (req,res)=>{
    try{
        const {id} =req.params
        const cart = await cartDao.DeleteById(Number(id))
        res.send({success:true})
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})
router.get("/:id/productos", async (req,res)=>{
    try{
        const {id} =req.params
        const products = await cartDao.getById(Number(id))
        res.send(products)
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})


router.post('/:id/productos', verifyRole, async (req,res)=>{
    try{
        const { productId } = req.body;
        const { id } = req.params;
      
        const cart = await cartDao.getById(Number(id));
      
        if (!cart)
          return res.send({ error: true, message: "carrito no encontrado" });
      
        const product = await productsDao.getById(Number(productId));
      
        if (!product)
          return res.send({ error: true, message: "producto no encontrado" });
      
        // TODO
        cart.products.push(product);
      
        const updatedCart = await cartDao.updateById( cart,Number(id));
      
        res.send({ success: true, cart: updatedCart });
    }catch(error){
        console.log(`error: ${error}`)
        res.send(error)
    }
})

router.get('*',(res)=>{

    res.send({ error : -1, descripcion: "ruta no existe" })
})

export {router as cartRouter}