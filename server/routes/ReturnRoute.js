import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = new Router()
router.get("/",IndexController.ReturnController.findAll)
router.post("/",IndexController.ReturnController.pengembalian)


export default router