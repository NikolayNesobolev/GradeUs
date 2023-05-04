const Router = require("express")
const router = new Router()
const labGroupController = require("../Controllers/labGroupController")
const checkRole = require("../middleware/checkRoleMiddleware")

const allowSuperRoles = [1, 2]
const superRole = [1]

router.post("/", checkRole(allowSuperRoles), labGroupController.create)
router.get("/", labGroupController.getAll)
router.get("/:id", labGroupController.getOne)
router.delete("/:id", checkRole(superRole), labGroupController.deleteLabGroup)

module.exports = router
