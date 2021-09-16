import express from 'express'
import cors from 'cors'
import listEndpoints from "express-list-endpoints"
import blogPostRoute from './blogPosts/index.js'
import { badRequestHnadler, notFoundHandler,forbiddenErrorHandler, internalServerErrorHandler } from './errorHandlers.js'


const server = express()
//middlewares
server.use(cors())
server.use(express.json())

const PORT = 3001
//router
server.use("/blogPosts",blogPostRoute)
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