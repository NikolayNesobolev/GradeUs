const Router = require("express")
const router = new Router()
const labGroupController = require("../Controllers/labGroupController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole(1), labGroupController.create)
router.get("/", labGroupController.getAll)
router.get("/:id", labGroupController.getOne)
router.delete("/:id", checkRole(1), labGroupController.deleteLabGroup)

module.exports = router
