import { $authHost, $host } from "./index"

export const createLabGroup = async (labGroup, subjectId) => {
  const { data } = await $authHost.post("api/lab_group", labGroup, subjectId)
  return data
}

export const fetchLabGroups = async (subjectId) => {
  const { data } = await $host.get("api/lab_group", { params: { subjectId } })
  return data
}

export const fetchOneLabGroup = async (id) => {
  const { data } = await $host.get("api/lab_group/" + id)
  return data
}

export const deleteGroup = async (id) => {
  const { data } = await $authHost.delete("api/lab_group/" + id)
  return data
}
