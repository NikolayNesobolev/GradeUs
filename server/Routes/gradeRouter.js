const Router = require("express")
const router = new Router()
const GradeController = require("../Controllers/gradeController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole(1), GradeController.create)
router.get("/", GradeController.getAll)
router.put("/:id", checkRole(1), GradeController.editGrade)

module.exports = router
