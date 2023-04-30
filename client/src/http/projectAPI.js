import { $authHost, $host } from "./index"

export const createProject = async (projectName, labGroupId) => {
  const { data } = await $authHost.post("api/project", projectName, labGroupId)
  return data
}

export const fetchProjects = async () => {
  const { data } = await $host.get("api/project")
  return data
}

export const fetchOneProject = async (id) => {
  const { data } = await $host.get("api/project/" + id)
  return data
}

export const deleteProject = async (id) => {
  const { data } = await $authHost.delete("api/project/" + id)
  return data
}
