
import fs  from "fs-extra"
import {join, dirname} from "path"
import { fileURLToPath } from "url"
const {readJSON, writeJSON, writeFile} = fs

const dataFoldePath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const blogPostsJSONPath = join(dataFoldePath, "blogPosts.json")
const publicFloderPath = join(process.cwd(), "./public/img/covers")
console.log("hi there:" , publicFloderPath)
export const readBlogPosts = () => readJSON(blogPostsJSONPath)
export const writeBlogPosts = (content) => writeJSON(blogPostsJSONPath, content)
export const saveCoverPictures = (name, contentBuffer) => writeFile(join(publicFloderPath, name), contentBuffer)