const Router = require("express")
const router = new Router()
const projectController = require("../Controllers/projectController")
const checkRole = require("../middleware/checkRoleMiddleware")

const allowSuperRoles = [1, 2]
const superRole = [1]

router.post("/", checkRole(allowSuperRoles), projectController.create)
router.get("/", projectController.getAll)
router.get("/:id", projectController.getOne)
router.delete("/:id", checkRole(superRole), projectController.deleteProject)

module.exports = router
