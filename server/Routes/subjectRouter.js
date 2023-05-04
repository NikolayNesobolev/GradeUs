const Router = require("express")
const router = new Router()
const subjectController = require("../Controllers/subjectController")
const checkRole = require("../middleware/checkRoleMiddleware")

const superRole = [1]

router.post("/", checkRole(superRole), subjectController.create)
router.get("/", subjectController.getAll)
router.delete("/:id", checkRole(superRole), subjectController.deleteSubject)

module.exports = router
