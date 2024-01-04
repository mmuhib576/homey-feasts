const express=require('express')
const { loginController, registerController,getAllChefs,getChef,updateChef,deleteChef} = require('../controllers/chefController')

const router=express.Router()


router.get('/login',loginController)



router.post('/register',registerController)

router.get('/getchefs',getAllChefs)

router.get('/:userid',getChef)

router.put('/:userid',updateChef)

router.delete('/:userid',deleteChef)

module.exports=router