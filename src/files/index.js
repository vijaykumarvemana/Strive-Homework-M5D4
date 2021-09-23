import express from 'express'
import createHttpError from 'http-errors'
import multer from 'multer'
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { getAuthorsReadableStream } from '../lib/fs-tools.js'
import { pipeline } from "stream" 
import { createGzip } from "zlib"
import json2csv from "json2csv"

const filesRouter = express.Router()

// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary, 
//   params: {
//     folder: "blogPosts",
//   },
// })

// filesRouter.post("/uploadCover/:id", multer().single("cover"), async (req, res, next) => {
//     try {
//       console.log("hello",req.file)
//     await saveCoverPictures("originalName", req.file.buffer)
//     res.send(ok)
        
//     } catch (error) {
//         next(error)
//     }
// })
// filesRouter.post("/cloudinaryUpload", multer({ storage: cloudinaryStorage }).single("profilePic"), async (req, res, next) => {
//   try {
//     console.log(req.file)
//     res.send("Uploaded on Cloudinary!")
//   } catch (error) {
//     next(error)
//   }
// })

filesRouter.get("/JSONDataDownload", async(req, res, next) => {
  try {

    res.setHeader("Content-Dispositon", `attachment; filename=authors.json.gz`)
    const source = getAuthorsReadableStream()
    const transform = createGzip()
    const  destination = res

    pipeline(source, transform, destination, err => {

      if(err) next(err)})
    
  } catch (error) {
    
    next(error)
  }
})



filesRouter.get("/PDFDownload", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", `attachment; filename=hello.pdf`) 

    const source = getPDFReadableStream()
    const destination = res

    pipeline(source, destination, err => {
      if (err) next(err)
    })
  } catch (error) {
    next(error)
  }
})

filesRouter.get("/CSVDownload", async (req, res, next) =>{
  try {
    res.setHeader("Content-Disposition", `attachment; filename=csvfile.csv`)

    const source = getAuthorsReadableStream()
    const transform = new json2csv.Transform({fields: ["name", "surname", "email", "date of birth", "avatar"]})
    const destination = res

    pipeline(source, transform, destination, err =>{
      if(err) next(err)
    })
  } catch (error) {
    next(error)
  }

})

export default filesRouter