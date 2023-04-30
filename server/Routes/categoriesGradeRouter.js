const Router = require("express")
const router = new Router()
const CategoriesGradeController = require("../Controllers/categoriesGradeController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole(1), CategoriesGradeController.create)
router.get("/", CategoriesGradeController.getAll)
router.put("/:id", checkRole(1), CategoriesGradeController.editCategoryGrade)

module.exports = router
