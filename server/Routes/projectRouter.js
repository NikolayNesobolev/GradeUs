const Router = require("express")
const router = new Router()
const projectController = require("../Controllers/projectController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole(1), projectController.create)
router.get("/", projectController.getAll)
router.get("/:id", projectController.getOne)
router.delete("/:id", checkRole(1), projectController.deleteProject)

module.exports = router
