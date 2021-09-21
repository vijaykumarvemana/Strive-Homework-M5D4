import {Router} from "express"
import uniqid from "uniqid"
import { authorsValidationMiddleware } from "./validation.js"
import { validationResult } from "express-validator"
import createHttpError from "http-errors"
import {readAuthors, writeAuthors} from "../lib/fs-tools.js"



const authorRoute = Router()

authorRoute.post("/", authorsValidationMiddleware, async(req, res, next) => {
    const errorList = validationResult(req)
try {
    if(!errorList.isEmpty()){
      next(createHttpError(400))
    }else{

        const newAuthor = {_id: uniqid(), ...req.body, createdAt: new Date()}
        const authors = await readAuthors()
        authors.push(newAuthor)
        await writeAuthors(authors)
        res.status(201).send({_id: newAuthor._id, ...newAuthor})
    }
} catch (error) {

    next(error)
}    
})
authorRoute.get("/", async(req, res, next) => {
    try {
     const authors = await readAuthors()
     res.status(200).send(authors)

    } catch (error) {
        next(error)
    }

})
authorRoute.get("/:authorID", async(req, res, next) => {
    try {
        const authors = await readAuthors()
        const author = authors.find( a => a._id === req.params.authorID)
        if(author){
            res.send(author)
        }else{
            res.status(404).send("author not found!")
        }
    } catch (error) {
        next(error)
    }
})
authorRoute.put("/:authorID", async(req, res, next) => {
    try {
       const authors = await readAuthors()
       const index = authors.findIndex( a => a._id === req.params.authorID)
       const authorToModify = authors[index]
       const updatedAuthor = req.body
       const modifiedAuthor = {...authorToModify, ...updatedAuthor} 
       authors[index] = modifiedAuthor
       await writeAuthors(authors)
       res.send(modifiedAuthor)
        
    } catch (error) {
        next(error)
    }
})
authorRoute.delete("/:authorID", async(req, res, next) => {
    try {
        const authors = await readAuthors()
        const filteredAuthors = authors.filter( a => a._id !== req.params.authorID)
        await writeAuthors(filteredAuthors)
        res.status(204).send("deleted successfully")
        
    } catch (error) {
        next(error)
    }
})

export default authorRoute

