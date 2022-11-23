import  {Router} from 'express'
import {CartDao,ProductDao} from '../../Dao/index.js'
import { verifyRole } from '../../middlewares/verifyRoles.js'
import { DATE_UTILS } from '../../utils/date-utils.js'
import { JOI_VALIDATOR } from '../../utils/joi-validator.js'


const router = Router()

router.get('/', async(req,res)=>{
    try {
        const cart = await CartDao.getAll()
        res.send(cart)
    } catch (error) {
        
    }
})

router.post('/', verifyRole, async (req,res)=>{
    try{
        const cart = ({timeStamp:DATE_UTILS.getTimestamp(), products: []})
        const cartCreated = await CartDao.save(cart)
        res.send({ success: true, cartId: cartCreated.id });
    }catch(error){
        console.log(`error: ${error}`)
        res.send(error)
    }
})
router.delete("/:id",verifyRole, async (req,res)=>{
    try{
        const {id} =req.params
        // const {idProd} =req.params
        const cart = await CartDao.DeleteById(id)
        res.send({success:true})
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})
router.delete("/:id_car/productos/:id_prod",verifyRole, async (req,res)=>{
    try{
        const {id_car} =req.params
        const {id_prod} =req.params
        const {products} = await CartDao.getById(id_car)
        const indice = products.findIndex(prod => prod.id === id_prod)
        if(indice !== -1){
            products.splice(indice,1)
            await CartDao.updateById(id_car,{timeStamp:DATE_UTILS.getTimestamp(),products:products})
            res.send({success:true})
        }else{
            res.send({success:false})
        }
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})
router.get("/:id", async (req,res)=>{
    try{
        const {id} =req.params
        const products = await CartDao.getById(id)
        res.send(products)
    }catch (error) {
        console.log(`Error: ${error}`)
      }
})


router.post('/:id/productos', verifyRole, async (req,res)=>{
    try{
        const { productId } = req.body;
        const { id } = req.params;

        const cart = await CartDao.getById(id);
      
        if (!cart)
          return res.send({ error: true, message: "carrito no encontrado" });
      
        const product = await ProductDao.getById(productId);
        console.log("products",product)
      
        if (!product)
          return res.send({ error: true, message: "producto no encontrado" });
      
        // TODO
        cart.products.push(product);
      
        const updatedCart = await CartDao.updateById(id, cart);
      
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