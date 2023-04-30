const ApiError = require("../error/ApiError")
const { User } = require("../models/models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateJwt = (id, mail, name, index, labGroupId, roleId, projectId) => {
  return jwt.sign(
    {
      id,
      mail,
      name,
      index,
      labGroupId,
      roleId,
      projectId,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "2920h",
    }
  )
}

class UserController {
  async registration(req, res, next) {
    try {
      const { mail, password, name, index, labGroupId, roleId, projectId } =
        req.body
      if (!mail || !password) {
        return next(ApiError.badRequest("Incorrect email or password"))
      }
      const candidate = await User.findOne({ where: { mail } })
      if (candidate) {
        return next(
          ApiError.badRequest("A user with such an email already exists")
        )
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({
        mail,
        password: hashPassword,
        name,
        index,
        labGroupId,
        roleId,
        projectId,
      })
      const token = generateJwt(
        user.id,
        user.mail,
        user.name,
        user.index,
        user.labGroupId,
        user.roleId,
        user.projectId
      )
      return res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Registration error" })
    }
  }

  async login(req, res, next) {
    try {
      const { mail, password } = req.body
      const user = await User.findOne({ where: { mail } })
      if (!user) {
        return next(ApiError.internal("User not found"))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.internal("Invalid password specified"))
      }
      const token = generateJwt(
        user.id,
        user.mail,
        user.name,
        user.index,
        user.labGroupId,
        user.roleId,
        user.projectId
      )
      return res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Login error" })
    }
  }

  async createUser(req, res, next) {
    try {
      const { mail, password, name, index, labGroupId, roleId, projectId } =
        req.body
      if (!mail || !password) {
        return next(ApiError.badRequest("Incorrect email or password"))
      }
      const candidate = await User.findOne({ where: { mail } })
      if (candidate) {
        return next(
          ApiError.badRequest("A user with such an email already exists")
        )
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({
        mail,
        password: hashPassword,
        name,
        index,
        labGroupId,
        roleId,
        projectId,
      })
      const token = generateJwt(
        user.id,
        user.mail,
        user.name,
        user.index,
        user.labGroupId,
        user.roleId,
        user.projectId
      )
      return res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Registration error" })
    }
  }

  async editUserPrivileges(req, res) {
    try {
      const { name } = req.params
      let studentName
      const { roleId, projectId } = req.body
      if (roleId && projectId) {
        studentName = await User.update(
          { roleId: req.body.roleId, projectId: req.body.projectId },
          { where: { name } }
        )
      }
      if (roleId && !projectId) {
        studentName = await User.update(
          { roleId: req.body.roleId },
          { where: { name } }
        )
      }
      if (!roleId && projectId) {
        studentName = await User.update(
          { projectId: req.body.projectId },
          { where: { name } }
        )
      }
      return res.json({ message: "Successfully updated!" })
    } catch (e) {
      return res.status(500).json({ message: "Update failed!" })
    }
  }

  async check(req, res) {
    try {
      const token = generateJwt(
        req.user.id,
        req.user.mail,
        req.user.name,
        req.user.index,
        req.user.labGroupId,
        req.user.roleId,
        req.user.projectId
      )
      return res.json({ token })
    } catch (e) {}
  }

  async getAll(req, res) {
    try {
      let { labGroupId } = req.query
      let users
      if (!labGroupId) {
        users = await User.findAll()
      }
      if (labGroupId) {
        users = await User.findAll({ where: { labGroupId } })
      }
      return res.json(users)
    } catch (e) {}
  }

  async deleteUser(req, res) {
    const { id } = req.params
    const user = await User.destroy({ where: { id } })
    return res.json({ message: "Successfully deleted!" })
  }
}

module.exports = new UserController()
