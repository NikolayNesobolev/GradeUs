const { Grade } = require("../models/models")
const ApiError = require("../error/ApiError")

class GradeController {
  async create(req, res, next) {
    try {
      const { gradeRes, projectId } = req.body
      const grades = await Grade.create({
        gradeRes,
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

  async editGrade(req, res) {
    try {
      const { id } = req.params
      let gradeResult
      const { gradeRes } = req.body
      if (gradeRes) {
        gradeResult = await Grade.update(
          { gradeRes: req.body.gradeRes },
          { where: { id } }
        )
      }
      return res.json({ message: "Successfully updated!" })
    } catch (e) {
      return res.status(500).json({ message: "Update failed!" })
    }
  }
}

module.exports = new GradeController()
