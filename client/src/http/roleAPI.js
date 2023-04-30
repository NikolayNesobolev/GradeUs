import { $authHost, $host } from "./index"

export const createRole = async (role) => {
  const { data } = await $authHost.post("api/role", {
    role,
  })
  return data
}

export const fetchRoles = async () => {
  const { data } = await $host.get("api/role")
  return data
}

export const deleteRole = async (id) => {
  const { data } = await $authHost.delete("api/role/" + id)
  return data
}
