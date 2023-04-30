import { makeAutoObservable } from "mobx"

export default class LabGroupStore {
  constructor() {
    this._labGroups = [
    ]

    this._selectedLabGroup = {}

    makeAutoObservable(this)
  }

  setLabGroups(labGroups) {
    this._labGroups = labGroups
  }

  setSelectedLabGroup(labGroup) {
    this._selectedLabGroup = labGroup
  }

  get labGroups() {
    return this._labGroups
  }

  get selectedLabGroup() {
    return this._selectedLabGroup
  }
}
