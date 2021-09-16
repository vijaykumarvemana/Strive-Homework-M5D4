import {Router} from "express"
import { fileURLToPath } from "url"
import { join, dirname } from "path"
import fs from "fs"
import uniqid from "uniqid"
import { blogPostsValidationMiddleware } from "./validation.js"
import { validationResult } from "express-validator"
import createHttpError from "http-errors"


const blogPostJSONPath = join(dirname(fileURLToPath(import.meta.url)), "blogPosts.json")
const getBlogposts = () =>  JSON.parse(fs.readFileSync(blogPostJSONPath))
const writeBlogPosts = blogs => fs.writeFileSync(blogPostJSONPath, JSON.stringify(blogs))
const blogPostRoute = Router()

blogPostRoute.post("/", blogPostsValidationMiddleware, (req, res, next) => {
    const errorList = validationResult(req)
try {
    if(!errorList.isEmpty()){
      next(createHttpError(400, { errorsList }))
    }else{

        const newBlogPost = {_id: uniqid(), ...req.body, createdAt: new Date()}
        const blogPosts = getBlogposts()
        blogPosts.push(newBlogPost)
        writeBlogPosts(blogPosts)
        res.status(201).send({_id: newBlogPost._id})
    }
} catch (error) {

    next(error)
}    
})
blogPostRoute.get("/", (req, res, next) => {
    try {
     const blogPosts = getBlogposts()
     res.status(200).send(blogPosts)

    } catch (error) {
        next(error)
    }

})
blogPostRoute.get("/:blogPostID", (req, res, next) => {
    try {
        const blogPosts = getBlogposts()
        const blogPost = blogPosts.find( b => b._id === req.params.blogPostID)
        if(blogPost){
            res.send(blogPost)
        }else{
            res.status(404).send("blogPost not found!")
        }
    } catch (error) {
        next(error)
    }
})
blogPostRoute.put("/:blogPostID", (req, res, next) => {
    try {
       const blogPosts = getBlogposts()
       const index = blogPosts.findIndex( b => b._id === req.params.blogPostID)
       const blogToModify = blogPosts[index]
       const updatedPost = req.body
       const modifiedPost = {...blogToModify, ...updatedPost} 
       blogPosts[index] = modifiedPost
       writeBlogPosts(blogPosts)
       res.send(modifiedPost)
        
    } catch (error) {
        next(error)
    }
})
blogPostRoute.delete("/:blogPostID", (req, res, next) => {
    try {
        const blogPosts = getBlogposts()
        const filteredBlogPosts = blogPosts.filter( b => b._id !== req.params.blogPostID)
        writeBlogPosts(filteredBlogPosts)
        res.status(204).send("deleted successfully")
        
    } catch (error) {
        next(error)
    }
})

export default blogPostRoute

