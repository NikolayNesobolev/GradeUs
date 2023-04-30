import { makeAutoObservable } from "mobx"

export default class RoleStore {
  constructor() {
    this._roles = []
    this._selectedRole = []
    makeAutoObservable(this)
  }

  setRoles(roles) {
    this._roles = roles
  }

  setSelectedRole(selectedRole) {
    this._selectedRole = selectedRole
  }

  get roles() {
    return this._roles
  }
  get selectedRole() {
    return this._selectedRole
  }
}
