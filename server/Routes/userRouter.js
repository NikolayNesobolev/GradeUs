const Router = require("express")
const router = new Router()
const userController = require("../Controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.post("/", checkRole(1), userController.createUser)
router.put("/edit/:name", checkRole(1), userController.editUserPrivileges)
router.get("/auth", authMiddleware, userController.check)
router.get("/", userController.getAll)
router.delete("/:id", checkRole(1), userController.deleteUser)
//router.delete("/:id", userController.deleteUser)

module.exports = router
