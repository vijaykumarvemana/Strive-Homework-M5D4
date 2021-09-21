import express from 'express'
import createHttpError from 'http-errors'
import multer from 'multer'
import { saveCoverPictures } from '../lib/fs-tools.js'

const filesRouter = express.Router()

filesRouter.post("/uploadCover/:id", multer().single("cover"), async (req, res, next) => {
    try {
      console.log("hello",req.file)
    await saveCoverPictures("originalName", req.file.buffer)
    res.send(ok)
        
    } catch (error) {
        next(error)
    }
})

export default filesRouter