const { Role } = require("../models/models")
const ApiError = require("../error/ApiError")

class RoleController {
  async create(req, res) {
    const { role } = req.body
    const roleType = await Role.create({ role })
    return res.json({ roleType })
  }

  async getAll(req, res) {
    try {
      const roles = await Role.findAll()
      return res.json(roles)
    } catch (e) {}
  }

  async deleteRole(req, res) {
    const { id } = req.params
    const role = await Role.destroy({ where: { id } })
    return res.json({ message: "Successfully deleted!" })
  }
}

module.exports = new RoleController()
