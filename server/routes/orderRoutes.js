const express=require('express')
const { createOrder,getAllOrders,getOrderById,updateOrder} = require('../controllers/orderController')

const router=express.Router()


router.post('/createorder',createOrder)

router.get('/getorders',getAllOrders)

router.get('/:userid',getOrderById)

router.put('/:orderid',updateOrder)



module.exports=router