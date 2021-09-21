import express from 'express'
import createHttpError from 'http-errors'
import multer from 'multer'
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { saveCoverPictures } from '../lib/fs-tools.js'

const filesRouter = express.Router()

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary, 
  params: {
    folder: "blogPosts",
  },
})

// filesRouter.post("/uploadCover/:id", multer().single("cover"), async (req, res, next) => {
//     try {
//       console.log("hello",req.file)
//     await saveCoverPictures("originalName", req.file.buffer)
//     res.send(ok)
        
//     } catch (error) {
//         next(error)
//     }
// })
filesRouter.post("/cloudinaryUpload", multer({ storage: cloudinaryStorage }).single("profilePic"), async (req, res, next) => {
  try {
    console.log(req.file)
    res.send("Uploaded on Cloudinary!")
  } catch (error) {
    next(error)
  }
})

export default filesRouter