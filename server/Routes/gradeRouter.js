const Router = require("express")
const router = new Router()
const gradeController = require("../Controllers/gradeController")
const checkRole = require("../middleware/checkRoleMiddleware")

const superRole = [1]

router.post("/", checkRole(superRole), gradeController.create)
router.get("/", gradeController.getAll)
router.delete("/:id", checkRole(superRole), gradeController.deleteGrade)

module.exports = router
