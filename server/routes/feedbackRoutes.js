const express=require('express')
const { createFeedback,getFeedbacks} = require('../controllers/feedbackController')

const router=express.Router()


router.post('/createfeedback',createFeedback)

router.get('/getfeedback',getFeedbacks)


module.exports=router