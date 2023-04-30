const { LabGroup } = require("../models/models")
const ApiError = require("../error/ApiError")

class LabGroupController {
  async create(req, res) {
    const { name, labGroup, subjectId } = req.body
    const labGroupType = await LabGroup.create({ name, labGroup, subjectId })
    return res.json({ labGroupType })
  }

  async getAll(req, res) {
    try {
      let { subjectId } = req.query
      let labGroups
      if (!subjectId) {
        labGroups = await LabGroup.findAll()
      }
      if (subjectId) {
        labGroups = await LabGroup.findAll({ where: { subjectId } })
      }
      return res.json(labGroups)
    } catch (e) {}
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      const group = await LabGroup.findOne({ where: { id } })
      return res.json(group)
    } catch (e) {}
  }

  async deleteLabGroup(req, res) {
    const { id } = req.params
    const group = await LabGroup.destroy({ where: { id } })
    return res.json({ message: "Successfully deleted!" })
  }
}

module.exports = new LabGroupController()
