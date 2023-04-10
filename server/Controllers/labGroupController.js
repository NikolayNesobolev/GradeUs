const { LabGroup } = require("../models/models")
const ApiError = require("../error/ApiError")

class LabGroupController {
  async create(req, res) {
    const { name, labGroup } = req.body
    const labGroupType = await LabGroup.create({ name, labGroup })
    return res.json({ labGroupType })
  }

  async getAll(req, res) {
    try {
      let { labGroup } = req.body
      let labGroups
      if (!labGroup) {
        labGroups = await LabGroup.findAll()
      }
      if (labGroup) {
        labGroups = await LabGroup.findAll({ where: { labGroup } })
      }
      return res.json(labGroups)
    } catch (e) {}
  }

  async deleteLabGroup(req, res) {
    const { id } = req.params
    const group = await LabGroup.destroy({ where: { id } })
    return res.json({ message: "Successfully deleted!" })
  }
}

module.exports = new LabGroupController()
