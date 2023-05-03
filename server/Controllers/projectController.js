const { Project } = require("../models/models")
const ApiError = require("../error/ApiError")

class ProjectController {
  async create(req, res, next) {
    const { projectName, labGroupId } = req.body
    if (!labGroupId || !projectName) {
      return next(
        ApiError.badRequest(
          "You must choose subject, laboratory group and specify the name of the project"
        )
      )
    }
    const projectObj = await Project.create({
      projectName,
      labGroupId,
    })
    return res.json({ projectObj })
  }

  async getAll(req, res) {
    try {
      const projects = await Project.findAll()
      return res.json(projects)
    } catch (e) {}
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      const projectt = await Project.findOne({ where: { id } })
      return res.json(projectt)
    } catch (e) {}
  }

  async deleteProject(req, res) {
    const { id } = req.params
    const proj = await Project.destroy({ where: { id } })
    return res.json({ message: "Successfully deleted!" })
  }
}

module.exports = new ProjectController()
