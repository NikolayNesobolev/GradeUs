const Router = require("express")
const router = new Router()
const subjectController = require("../Controllers/subjectController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole(1), subjectController.create)
router.get("/", subjectController.getAll)
router.delete("/:id", checkRole(1), subjectController.deleteSubject)

module.exports = router
