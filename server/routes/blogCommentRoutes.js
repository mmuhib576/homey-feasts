const express=require('express')
const { createBlogComment,getAllComments,deleteComment} = require('../controllers/blogCommentController')

const router=express.Router()

router.post('/createcomment',createBlogComment)

router.get('/:blogId',getAllComments)

router.delete('/:commentId',deleteComment)

module.exports=router