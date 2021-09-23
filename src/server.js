import express from 'express'
import cors from 'cors'
import listEndpoints from "express-list-endpoints"
import blogPostRoute from './blogPosts/index.js'
import filesRoute from '../src/files/index.js'
import authorRoute from './authors/index.js'
import { badRequestHnadler, notFoundHandler,forbiddenErrorHandler, internalServerErrorHandler } from './errorHandlers.js'
import swaggerUI from "swagger-ui-express"
import yaml from "yamljs"

const server = express()
// const publicFolderPath = join(process.cwd(), "public")
// console.log("hello there:" , publicFolderPath)
// server.use(express.static(publicFolderPath))
//middlewares
const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

const corsOpts = {
    orgin: function (origin, next){

        console.log("current origin:", origin)
        if (!origin || whitelist.indexOf(origin) !== -1){
            next(null, true)
        }else{
            next(new Error(`Origin ${origin} not allowed!`))
        }
    },

}




server.use(cors(corsOpts))
server.use(express.json())  

const port = process.env.PORT

const yamlDocument = yaml.load(join(process.cwd(), "./src/apiDescription.yml"))
//router
server.use("/blogPosts",blogPostRoute)
server.use("/files",filesRoute)

server.use("/authors", authorRoute)
server.use("/docs", swaggerUI.serve, swaggerUI.setup(yamlDocument))

//error handlers
server.use(badRequestHnadler)
server.use(notFoundHandler)
server.use(forbiddenErrorHandler)
server.use(internalServerErrorHandler)
console.table(listEndpoints(server))

server.listen(port, () => {
    console.log(`server running on this port: ${port}`)   
})
server.on("error",(error)=>{
    console.log(`Server is crushed due to :  ${error.message}`)
})