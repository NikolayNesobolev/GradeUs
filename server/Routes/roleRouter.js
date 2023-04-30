const Router = require("express")
const router = new Router()
const roleController = require("../Controllers/roleController")
const checkRole = require("../middleware/checkRoleMiddleware")

//router.post("/", checkRole(1), roleController.create)
router.post("/", roleController.create)
router.get("/", roleController.getAll)
router.delete("/:id", checkRole(1), roleController.deleteRole)

module.exports = router
