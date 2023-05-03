const { ProjectGradeCategories } = require("../models/models")
const ApiError = require("../error/ApiError")

class ProjectGradeCategoriesController {
  async create(req, res, next) {
    const {
      category0,
      category1,
      category2,
      category3,
      projectId,
      labGroupId,
    } = req.body
    if (
      !labGroupId ||
      !projectId ||
      !category0 ||
      !category1 ||
      !category2 ||
      !category3
    ) {
      return next(
        ApiError.badRequest(
          "You must choose laboratory group, project and specify grade categories!"
        )
      )
    }
    const projectCategoriesObj = await ProjectGradeCategories.create({
      category0,
      category1,
      category2,
      category3,
      projectId,
      labGroupId,
    })
    return res.json({ projectCategoriesObj })
  }

  async getAll(req, res) {
    try {
      const projectCategories = await ProjectGradeCategories.findAll()
      return res.json(projectCategories)
    } catch (e) {}
  }

  async editProjectGradeCategory(req, res) {
    try {
      const { id } = req.params
      let projGradeCat
      const { category0, category1, category2, category3 } = req.body
      if (category0) {
        projGradeCat = await ProjectGradeCategories.update(
          { category0: req.body.category0 },
          { where: { id } }
        )
      }
      if (category1) {
        projGradeCat = await ProjectGradeCategories.update(
          { category1: req.body.category1 },
          { where: { id } }
        )
      }
      if (category2) {
        projGradeCat = await ProjectGradeCategories.update(
          { category2: req.body.category2 },
          { where: { id } }
        )
      }
      if (category3) {
        projGradeCat = await ProjectGradeCategories.update(
          { category3: req.body.category3 },
          { where: { id } }
        )
      }
      return res.json({ message: "Successfully updated!" })
    } catch (e) {
      return res.status(500).json({ message: "Update failed!" })
    }
  }
}

module.exports = new ProjectGradeCategoriesController()
