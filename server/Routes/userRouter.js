const Router = require("express")
const router = new Router()
const userController = require("../Controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const checkRole = require("../middleware/checkRoleMiddleware")

const allowSuperRoles = [1, 2]
const superRole = [1]

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.post("/", checkRole(allowSuperRoles), userController.createUser)
router.put(
  "/edit/:name",
  checkRole(superRole),
  userController.editUserPrivileges
)
router.get("/auth", authMiddleware, userController.check)
router.get("/", userController.getAll)
router.delete("/:id", checkRole(allowSuperRoles), userController.deleteUser)
//router.delete("/:id", userController.deleteUser)

module.exports = router
