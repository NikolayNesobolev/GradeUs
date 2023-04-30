import { makeAutoObservable, runInAction } from "mobx"

export default class CatGradeStore {
  constructor() {
    this._grade = []
    this._selectedGrade = []
    makeAutoObservable(this)
  }

  setGrade(grade) {
    this._grade = grade
  }

  setSelectedGrade(selectedGrade) {
    runInAction(() => {
      this._selectedGrade = selectedGrade
    })
  }

  get grade() {
    return this._grade
  }

  get selectedGrade() {
    return this._selectedGrade
  }
}
