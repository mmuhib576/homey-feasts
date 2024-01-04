const express=require('express')
const { createReview,getAllReviews} = require('../controllers/reviewController')

const router=express.Router()


router.post('/createreview',createReview)

router.get('/getreviews',getAllReviews)


module.exports=router