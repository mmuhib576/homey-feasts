const blogCommentModel = require("../models/blogCommentModel");





const createBlogComment = async (req, res) => {
    try {
        // const { text, author,blogPost } = req.body;
        const comment = new blogCommentModel(
          // { text ,user:author,blogPost:blogPost }
          req.body
          );
        await comment.save();
        res.status(201).json(comment);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Could not comment' });
      }
};

const getAllComments=async(req,res)=>{
    try {
        const comments = await blogCommentModel.find({ blogPost:req.params.blogId});
        res.json(comments);
      } catch (error) {
        res.status(500).json({ error: 'Could not fetch blogs' });
      }
}



const deleteComment=async(req,res)=>{
  try {
    const deleteComment=await blogCommentModel.findByIdAndDelete({_id:req.params.commentId})
    res.status(200).send("deleted")
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {  createBlogComment,getAllComments,deleteComment };