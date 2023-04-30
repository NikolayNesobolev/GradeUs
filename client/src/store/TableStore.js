import { makeAutoObservable } from "mobx"

export default class TableStore {
  constructor() {
    this._subjects = []

    this._labGroups = [
      {
        id: 1,
        labGroup: "L1",
        subjectId: 1,
      },
      {
        id: 2,
        labGroup: "L2",
        subjectId: 2,
      },
      {
        id: 3,
        labGroup: "L3",
        subjectId: 3,
      },
      {
        id: 4,
        labGroup: "L4",
        subjectId: 4,
      },
      {
        id: 5,
        labGroup: "L5",
        subjectId: 5,
      },
      {
        id: 6,
        labGroup: "L6",
        subjectId: 6,
      },
    ]
    this._projects = [
      { id: 1, projectName: "Minecraft", labGroupId: 2 },
      { id: 2, projectName: "Tetris", labGroupId: 1 },
      { id: 3, projectName: "Doom", labGroupId: 1 },
    ]

    this._roles = [
      { id: 1, role: "Professor" },
      { id: 2, role: "Group Leader" },
      { id: 3, role: "Student" },
    ]

    this._grades = [{}]

    this._projectCategories = [{}]

    this._categoriesGrades = [{}]

    this._selectedSubject = {}
    this._selectedLabGroup = {}
    makeAutoObservable(this)
  }

  setSubjects(subjects) {
    this._subjects = subjects
  }

  setSelectedSubject(subject) {
    this._selectedSubject = subject
  }

  setLabGroups(labGroups) {
    this._labGroups = labGroups
  }

  setSelectedLabGroup(labGroup) {
    this._selectedLabGroup = labGroup
  }

  setRoles(roles) {
    this._roles = roles
  }

  setProjects(projects) {
    this._projects = projects
  }

  get subjects() {
    return this._subjects
  }

  get selectedSubject() {
    return this._selectedSubject
  }

  get labGroups() {
    return this._labGroups
  }

  get selectedLabGroup() {
    return this._selectedLabGroup
  }

  get roles() {
    return this._roles
  }

  get projects() {
    return this._projects
  }
}
