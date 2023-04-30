import { makeAutoObservable, runInAction } from "mobx"

export default class CatGradeStore {
  constructor() {
    this._catsGrade = []
    this._selectedCatGrade = []
    makeAutoObservable(this)
  }

  setCatsGrade(catsGrade) {
    this._catsGrade = catsGrade
  }

  setSelectedCatGrade(selectedCatGrade) {
    runInAction(() => {
      this._selectedCatGrade = selectedCatGrade
    })
  }

  get catsGrade() {
    return this._catsGrade
  }

  get selectedCatGrade() {
    return this._selectedCatGrade
  }
}
