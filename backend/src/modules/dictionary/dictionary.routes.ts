import { Router } from "express";
import { getAllWordsController } from "./dictionary.controller.js";

const router = Router()

router.get('/', getAllWordsController)

export default router
