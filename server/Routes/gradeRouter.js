const Router = require("express")
const router = new Router()
const gradeController = require("../Controllers/gradeController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole(1), gradeController.create)
router.get("/", gradeController.getAll)
router.delete("/:id", checkRole(1), gradeController.deleteGrade)

module.exports = router
