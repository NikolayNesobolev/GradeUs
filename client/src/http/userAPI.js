import { $authHost, $host } from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (
  mail,
  password,
  name,
  index
  /*labGroupId,
  roleId,
  projectId*/
) => {
  const { data } = await $host.post("api/user/registration", {
    mail,
    password,
    name,
    index,
    //labGroupId,
    //roleId,
    //projectId,
  })
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}

export const createUser = async (
  mail,
  password,
  name,
  index,
  labGroupId,
  roleId,
  projectId
) => {
  const { data } = await $authHost.post(
    "api/user/",
    mail,
    password,
    name,
    index,
    labGroupId,
    roleId,
    projectId
  )
  return jwt_decode(data.token)
}

export const login = async (mail, password) => {
  const { data } = await $host.post("api/user/login", {
    mail,
    password,
  })
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}

export const editUserPrivileg = async (name, { roleId, projectId }) => {
  const { data } = await $authHost.put("api/user/edit/" + name, {
    roleId,
    projectId,
  })
  return data
}

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth", {})
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}

export const fetchUsers = async (labGroupId) => {
  const { data } = await $host.get("api/user", { params: { labGroupId } })
  return data
}

export const deleteUser = async (id) => {
  const { data } = await $authHost.delete("api/user/" + id)
  return data
}
