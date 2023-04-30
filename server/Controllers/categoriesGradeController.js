const { CategoriesGrade } = require("../models/models")
const ApiError = require("../error/ApiError")

class CategoriesGradeController {
  async create(req, res, next) {
    try {
      const { gradeCat0, gradeCat1, gradeCat2, gradeCat3, gradeId } = req.body
      const gradeCategory = await CategoriesGrade.create({
        gradeCat0,
        gradeCat1,
        gradeCat2,
        gradeCat3,
        gradeId,
      })
      return res.json({ gradeCategory })
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    try {
      const gradeCategoryes = await CategoriesGrade.findAll()
      return res.json(gradeCategoryes)
    } catch (e) {}
  }

  async editCategoryGrade(req, res) {
    try {
      const { id } = req.params
      let projCatGrade
      const { gradeCat0, gradeCat1, gradeCat2, gradeCat3 } = req.body
      if (gradeCat0) {
        projCatGrade = await CategoriesGrade.update(
          { gradeCat0: req.body.gradeCat0 },
          { where: { id } }
        )
      }
      if (gradeCat1) {
        projCatGrade = await CategoriesGrade.update(
          { gradeCat1: req.body.gradeCat1 },
          { where: { id } }
        )
      }
      if (gradeCat2) {
        projCatGrade = await CategoriesGrade.update(
          { gradeCat2: req.body.gradeCat2 },
          { where: { id } }
        )
      }
      if (gradeCat3) {
        projCatGrade = await CategoriesGrade.update(
          { gradeCat3: req.body.gradeCat3 },
          { where: { id } }
        )
      }
      return res.json({ message: "Successfully updated!" })
    } catch (e) {
      return res.status(500).json({ message: "Update failed!" })
    }
  }
}

module.exports = new CategoriesGradeController()
