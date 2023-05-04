const Router = require("express")
const router = new Router()
const ProjectGradeCategoriesController = require("../Controllers/projectGradeCategoriesController")
const checkRole = require("../middleware/checkRoleMiddleware")

const allowSuperRoles = [1, 2]
const superRole = [1]

router.post(
  "/",
  checkRole(allowSuperRoles),
  ProjectGradeCategoriesController.create
)
router.get("/", ProjectGradeCategoriesController.getAll)
router.put(
  "/:id",
  checkRole(superRole),
  ProjectGradeCategoriesController.editProjectGradeCategory
)

module.exports = router
