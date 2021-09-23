import {Router} from "express"
import uniqid from "uniqid"
import { blogPostsValidationMiddleware } from "./validation.js"
import { validationResult } from "express-validator"
import createHttpError from "http-errors"
import {readBlogPosts, writeBlogPosts} from "../lib/fs-tools.js"
import { getbBlogPDFReadableStream } from "../lib/fs-tools.js"
import { generateBlogPDF } from "../lib/pdf.js"



const blogPostRoute = Router()

blogPostRoute.post("/", blogPostsValidationMiddleware, async(req, res, next) => {
    const errorList = validationResult(req)
try {
    if(!errorList.isEmpty()){
      next(createHttpError(400))
    }else{

        const newBlogPost = {_id: uniqid(), ...req.body, createdAt: new Date()}
        const blogPosts = await readBlogPosts()
        blogPosts.push(newBlogPost)
        await writeBlogPosts(blogPosts)
        res.status(201).send({_id: newBlogPost._id})
    }
} catch (error) {

    next(error)
}    
})
blogPostRoute.get("/", async(req, res, next) => {
    try {
     const blogPosts = await readBlogPosts()
     res.status(200).send(blogPosts)

    } catch (error) {
        next(error)
    }

})
blogPostRoute.get("/:blogPostID/PDF", async(req, res, next) => {
    try {
        const blogPosts = await readBlogPosts()
        const blogPost = blogPosts.find( b => b._id === req.params.blogPostID)
        if(blogPost){
            res.send(blogPost)
        }else{
            res.status(404).send("blogPost not found!")
        }
        const pdfStream = await generateBlogPDF(blog);
        console.log("hello........",pdfStream)
         res.setHeader("Content-Type", "application/pdf");
         pdfStream.pipe(res);
         pdfStream.end();
    } catch (error) {
        next(error)
    }
})
blogPostRoute.put("/:blogPostID", async(req, res, next) => {
    try {
       const blogPosts = await readBlogPosts()
       const index = blogPosts.findIndex( b => b._id === req.params.blogPostID)
       const blogToModify = blogPosts[index]
       const updatedPost = req.body
       const modifiedPost = {...blogToModify, ...updatedPost} 
       blogPosts[index] = modifiedPost
       await writeBlogPosts(blogPosts)
       res.send(modifiedPost)
        
    } catch (error) {
        next(error)
    }
})
blogPostRoute.delete("/:blogPostID", async(req, res, next) => {
    try {
        const blogPosts = await readBlogPosts()
        const filteredBlogPosts = blogPosts.filter( b => b._id !== req.params.blogPostID)
        await writeBlogPosts(filteredBlogPosts)
        res.status(204).send("deleted successfully")
        
    } catch (error) {
        next(error)
    }
})


// blogPostRoute.get("/blogPostPdf", async(req, res, next) => {

//     try {
//         res.setHeader("Content-Dispositon", `attachment; filename=blogPosts.json.gz`)
//     const source = getAuthorsReadableStream()
//     const transform = createGzip()
//     const  destination = res

//     pipeline(source, transform, destination, err => {

//       if(err) next(err)})
        
//     } catch (error) {
        
//     }
// })

export default blogPostRoute

