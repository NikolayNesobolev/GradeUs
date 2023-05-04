const { Grade, CategoriesGrade } = require("../models/models")
const ApiError = require("../error/ApiError")

class GradeController {
  async create(req, res, next) {
    try {
      const { projectId, gradeCat0, gradeCat1, gradeCat2, gradeCat3 } = req.body
      let gradeCatRes =
        (Number(gradeCat0) +
          Number(gradeCat1) +
          Number(gradeCat2) +
          Number(gradeCat3)) /
        4
      const grade = await Grade.create({
        gradeRes: Math.round(Number(gradeCatRes)),
        projectId,
      })

      await CategoriesGrade.create({
        gradeCat0,
        gradeCat1,
        gradeCat2,
        gradeCat3,
        gradeId: grade.id,
      })

      return res.json({ grade })
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    try {
      const grades = await Grade.findAll()
      return res.json(grades)
    } catch (e) {}
  }

  async deleteGrade(req, res) {
    const { id } = req.params
    const grade = await Grade.destroy({ where: { id } })
    return res.json({ message: "Successfully deleted!" })
  }
}

module.exports = new GradeController()
