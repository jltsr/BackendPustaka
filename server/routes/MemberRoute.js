import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = new Router()
router.get("/",IndexController.MemberController.findAll)
router.post("/",IndexController.MemberController.create)
router.get("/:id",IndexController.MemberController.findOne)
router.put("/:id",IndexController.MemberController.update)
router.delete("/:id",IndexController.MemberController.deleted)

export default router