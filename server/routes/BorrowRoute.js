import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = new Router()
router.get("/",IndexController.BorrowController.findAll)
router.post("/",IndexController.BorrowController.peminjaman)
router.delete("/:id",IndexController.BorrowController.deleted)
export default router