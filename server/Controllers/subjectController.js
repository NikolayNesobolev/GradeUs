const ApiError = require("../error/ApiError")
const { Subject } = require("../models/models")

class SubjectController {
  async create(req, res, next) {
    const { name } = req.body
    if (!name) {
      return next(
        ApiError.badRequest("You must specify the name of the subject")
      )
    }
    const newSubject = await Subject.create({ name })
    return res.json({ newSubject })
  }

  async getAll(req, res) {
    try {
      let { labGroup: name } = req.body
      let subjects
      if (!name) {
        subjects = await Subject.findAll()
      }
      if (name) {
        subjects = await Subject.findAll({ where: { name } })
      }
      return res.json(subjects)
    } catch (e) {}
  }

  async deleteSubject(req, res, next) {
    const { id } = req.params
    const subject = await Subject.destroy({ where: { id } })
    return res.json({ message: "Successfully deleted!" })
  }
}

module.exports = new SubjectController()
