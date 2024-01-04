const express=require('express')
const { createMeal,getAllMeals,getMeal,updateMeal,deleteMeal} = require('../controllers/mealController')

const router=express.Router()


router.post('/createmeal',createMeal)

router.get('/getmeals',getAllMeals)

router.get('/:mealid',getMeal)

router.put('/:mealid',updateMeal)

router.delete('/:mealid',deleteMeal)

module.exports=router