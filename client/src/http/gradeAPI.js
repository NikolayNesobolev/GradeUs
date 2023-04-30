import { $authHost, $host } from "./index"

export const createGrade = async (gradeRes, projectId) => {
  const { data } = await $authHost.post("api/grade", gradeRes, projectId)
  return data
}

export const fetchGrades = async () => {
  const { data } = await $host.get("api/grade")
  return data
}

export const editProjectGradeCat = async (id, { gradeRes }) => {
  const { data } = await $authHost.put("api/grade/" + id, {
    gradeRes,
  })
  return data
}
