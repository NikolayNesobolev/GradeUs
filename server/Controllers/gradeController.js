const { Grade } = require("../models/models")
const ApiError = require("../error/ApiError")

class GradeController {
  async create(req, res, next) {
    try {
      const { name, gradeCat0, gradeCat1, gradeCat2, gradeCat3, projectId } =
        req.body
      const grades = await Grade.create({
        name,
        gradeCat0,
        gradeCat1,
        gradeCat2,
        gradeCat3,
        projectId,
      })
      return res.json({ grades })
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
