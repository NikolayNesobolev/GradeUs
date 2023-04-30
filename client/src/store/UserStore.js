import { makeAutoObservable } from "mobx"

export default class UserStore {
  constructor() {
    this._users = []

    this._selectedUser = {}

    this._activeUser = {}

    this._isAuth = false

    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  setSelectedUser(selectedUser) {
    this._selectedUser = selectedUser
  }

  setActiveUser(activeUser) {
    this._activeUser = activeUser
  }

  setUsers(users) {
    this._users = users
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get selectedUser() {
    return this._selectedUser
  }

  get activeUser() {
    return this._activeUser
  }

  get users() {
    return this._users
  }
}
