const Router = require("express")
const router = new Router()
const CategoriesGradeController = require("../Controllers/categoriesGradeController")
const checkRole = require("../middleware/checkRoleMiddleware")

const superRole = [1]

router.post("/", checkRole(superRole), CategoriesGradeController.create)
router.get("/", CategoriesGradeController.getAll)
router.put(
  "/:id",
  checkRole(superRole),
  CategoriesGradeController.editCategoryGrade
)

module.exports = router
