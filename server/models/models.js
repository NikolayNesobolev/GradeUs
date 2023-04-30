const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mail: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  index: { type: DataTypes.INTEGER },
})

const Role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING, allowNull: false },
})

const Subject = sequelize.define("subject", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
})

const LabGroup = sequelize.define("lab_group", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  labGroup: { type: DataTypes.STRING, allowNull: false },
})

const Project = sequelize.define("project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  projectName: { type: DataTypes.STRING, allowNull: false },
  project: { type: DataTypes.STRING, unique: true },
})

const ProjectGradeCategories = sequelize.define("project_grade_categories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category0: { type: DataTypes.STRING, allowNull: false },
  category1: { type: DataTypes.STRING, allowNull: false },
  category2: { type: DataTypes.STRING, allowNull: false },
  category3: { type: DataTypes.STRING, allowNull: false },
})

const Grade = sequelize.define("grade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gradeRes: { type: DataTypes.INTEGER },
})

const CategoriesGrade = sequelize.define("categories_grade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gradeCat0: { type: DataTypes.INTEGER },
  gradeCat1: { type: DataTypes.INTEGER },
  gradeCat2: { type: DataTypes.INTEGER },
  gradeCat3: { type: DataTypes.INTEGER },
})

Subject.hasMany(LabGroup)
LabGroup.belongsTo(Subject)

LabGroup.hasMany(User)
User.belongsTo(LabGroup)

LabGroup.hasMany(Project)
Project.belongsTo(LabGroup)

LabGroup.hasMany(ProjectGradeCategories)
ProjectGradeCategories.belongsTo(LabGroup)

Role.hasMany(User)
User.belongsTo(Role)

Project.hasMany(User)
User.belongsTo(Project)

Project.hasMany(ProjectGradeCategories)
ProjectGradeCategories.belongsTo(Project)

Project.hasOne(Grade)
Grade.belongsTo(Project)

Grade.hasMany(CategoriesGrade)
CategoriesGrade.belongsTo(Grade)

module.exports = {
  User,
  Role,
  Subject,
  LabGroup,
  Project,
  ProjectGradeCategories,
  Grade,
  CategoriesGrade,
}
