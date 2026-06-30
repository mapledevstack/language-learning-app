import { Router } from "express"
import { searchGrammarController } from "./grammar.controller.js"

const router = Router()

router.get("/search", searchGrammarController)

export default router
