const Router = require("express")
const router = new Router()
const userController = require("../Controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.put("/edit/:name", checkRole(1), userController.editUserPrivileges)
router.get("/auth", authMiddleware, userController.check)

module.exports = router
