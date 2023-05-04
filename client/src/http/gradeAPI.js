import { $authHost, $host } from "./index"

export const createGrade = async (payload) => {
  const { data } = await $authHost.post("api/grade", payload)
  return data
}

export const fetchGrades = async () => {
  const { data } = await $host.get("api/grade")
  return data
}

export const deleteGrade = async (id) => {
  const { data } = await $authHost.delete("api/grade/" + id)
  return data
}
