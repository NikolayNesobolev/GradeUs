import { makeAutoObservable, runInAction } from "mobx"

export default class ProjectGradeCatStore {
  constructor() {
    this._projectGradeCats = []
    this._selectedProjectGradeCat = []
    makeAutoObservable(this)
  }

  setProjectGradeCats(projectGradeCats) {
    this._projectGradeCats = projectGradeCats
  }

  setSelectedGradeCat(selectedProjectGradeCat) {
    runInAction(() => {
      this._selectedProjectGradeCat = selectedProjectGradeCat
    })
  }

  get projectGradeCats() {
    return this._projectGradeCats
  }

  get selectedProjectGradeCat() {
    return this._selectedProjectGradeCat
  }
}
