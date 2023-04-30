import { $authHost, $host } from "./index"

export const createSubject = async (name) => {
  const { data } = await $authHost.post("api/subject", name)
  return data
}

export const fetchSubjects = async () => {
  const { data } = await $host.get("api/subject")
  return data
}

export const deleteSubject = async (id) => {
  const { data } = await $authHost.delete("api/subject/" + id)
  return data
}
