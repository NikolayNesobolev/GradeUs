const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mail: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
})

const Role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING, allowNull: false },
})

const LabGroup = sequelize.define("lab_group", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  labGroup: { type: DataTypes.STRING, allowNull: false },
})

const Project = sequelize.define("project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  projectName: { type: DataTypes.STRING, allowNull: false },
  studentsName: { type: DataTypes.STRING, allowNull: false },
  category0: { type: DataTypes.STRING, allowNull: false },
  category1: { type: DataTypes.STRING, allowNull: false },
  category2: { type: DataTypes.STRING, allowNull: false },
  category3: { type: DataTypes.STRING, allowNull: false },
})

const Grade = sequelize.define("grade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  gradeCat0: { type: DataTypes.INTEGER, allowNull: false },
  gradeCat1: { type: DataTypes.INTEGER, allowNull: false },
  gradeCat2: { type: DataTypes.INTEGER, allowNull: false },
  gradeCat3: { type: DataTypes.INTEGER, allowNull: false },
})

Role.hasMany(User)
User.belongsTo(Role)

LabGroup.hasMany(User)
User.belongsTo(LabGroup)

Project.hasMany(User)
User.belongsTo(Project)

Project.hasOne(Grade)
Grade.belongsTo(Project)

module.exports = {
  User,
  Role,
  LabGroup,
  Project,
  Grade,
}
