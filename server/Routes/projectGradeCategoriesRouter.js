const Router = require("express")
const router = new Router()
const ProjectGradeCategoriesController = require("../Controllers/projectGradeCategoriesController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole(1), ProjectGradeCategoriesController.create)
router.get("/", ProjectGradeCategoriesController.getAll)
router.put(
  "/:id",
  checkRole(1),
  ProjectGradeCategoriesController.editProjectGradeCategory
)

module.exports = router
