import express from 'express'
import cors from 'cors'
import listEndpoints from "express-list-endpoints"
import blogPostRoute from './blogPosts/index.js'
import filesRoute from '../src/files/index.js'
import {join} from 'path'
import { badRequestHnadler, notFoundHandler,forbiddenErrorHandler, internalServerErrorHandler } from './errorHandlers.js'


const server = express()
const publicFolderPath = join(process.cwd(), "public")
console.log("hello there:" , publicFolderPath)
server.use(express.static(publicFolderPath))
//middlewares
server.use(cors())
server.use(express.json())

const PORT = 3001
//router
server.use("/blogPosts",blogPostRoute)
server.use("/blogPosts",filesRoute)

//error handlers
server.use(badRequestHnadler)
server.use(notFoundHandler)
server.use(forbiddenErrorHandler)
server.use(internalServerErrorHandler)
console.table(listEndpoints(server))

server.listen(PORT, () => {
    console.log(`server running on this port: ${PORT}`)   
})
server.on("error",(error)=>{
    console.log(`Server is crushed due to :  ${error.message}`)
})