const express=require('express')
const { createBlog,getAllBlogs,getChefBlogs,updateBlog,deleteBlog} = require('../controllers/blogPostController')

const router=express.Router()


router.post('/createblog',createBlog)

router.get('/getblogs',getAllBlogs)

router.get('/:chefId',getChefBlogs)

router.put('/:blogId',updateBlog)

router.delete('/:blogId',deleteBlog)

module.exports=router