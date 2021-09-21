import { body } from "express-validator"

export const authorsValidationMiddleware = [
  body("name").exists().withMessage("name is a mandatory field!"),
  body("surname").exists().withMessage("surname is a mandatory field!"),
  body("email").exists().withMessage("email is a mandatory field!"),
  body("date of birth").exists().withMessage("date of birthday is a mandatory field!"),
  body("avatar").exists().withMessage("avatar is a mandatory field!"),

]