import express from 'express'
import createHttpError from 'http-errors'
import multer from 'multer'
import { saveCoverPictures } from '../lib/fs-tools.js'

const filesRouter = express.Router()

filesRouter.post("/:id/uploadCover", multer({fileFilter: (req, file, cb) => {
    if(file.mimetype !== "image/jpeg") cb(createHttpError(400, { errorsList: "Format not supported!" }), false)
    else cb(null, true)
  },
}).single("cover"), async(req, res, next) => {
    try {
      
    await saveCoverPictures("98wyr4hcktlk2dng/name.jpeg", req.file.buffer)
    res.send(ok)
        
    } catch (error) {
        next(error)
    }
})

export default filesRouter