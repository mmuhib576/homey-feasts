const express=require('express')
const { createPayment,getAllPayments} = require('../controllers/paymentControllers')

const router=express.Router()



router.post('/createpayment',createPayment)

router.get('/getpayment',getAllPayments)


module.exports=router