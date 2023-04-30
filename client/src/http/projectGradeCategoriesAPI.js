import { $authHost, $host } from "./index"

export const createProjectGradeCategory = async (
  category0,
  category1,
  category2,
  category3,
  projectId,
  labGroupId
) => {
  const { data } = await $authHost.post(
    "api/project_grade",
    category0,
    category1,
    category2,
    category3,
    projectId,
    labGroupId
  )
  return data
}

export const fetchProjectGradeCategories = async () => {
  const { data } = await $host.get("api/project_grade")
  return data
}

export const editProjectGradeCat = async (
  id,
  { category0, category1, category2, category3 }
) => {
  const { data } = await $authHost.put("api/project_grade/" + id, {
    category0,
    category1,
    category2,
    category3,
  })
  return data
}
