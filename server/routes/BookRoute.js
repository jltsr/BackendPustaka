import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = new Router()
router.get("/",IndexController.BookController.findAll)
router.post("/",IndexController.BookController.create)
router.get("/:id",IndexController.BookController.findOne)
router.put("/:id",IndexController.BookController.update)
router.delete("/:id",IndexController.BookController.deleted)

export default router