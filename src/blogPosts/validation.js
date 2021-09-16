import { body } from "express-validator"

export const blogPostsValidationMiddleware = [
  body("category").exists().withMessage("category is a mandatory field!"),
  body("title").exists().withMessage("title is a mandatory field!"),
  body("cover").exists().withMessage("cover is a mandatory field!"),
  body("readTime").exists().withMessage("readTime is a mandatory field!"),
  body("author").exists().withMessage("author is a mandatory field!"),
  body("content").exists().withMessage("content is a mandatory field!"),

]