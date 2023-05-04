import { $authHost, $host } from "./index"

export const createCategoryGrade = async (
  gradeCat0,
  gradeCat1,
  gradeCat2,
  gradeCat3,
  gradeId
) => {
  const { data } = await $authHost.post("api/category_grade", {
    gradeCat0,
    gradeCat1,
    gradeCat2,
    gradeCat3,
    gradeId,
  })
  return data
}

export const fetchCategoriesGrade = async () => {
  const { data } = await $host.get("api/category_grade")
  return data
}

export const editCategoriesGrade = async (
  id,
  { gradeCat0, gradeCat1, gradeCat2, gradeCat3 }
) => {
  const { data } = await $authHost.put("api/category_grade/" + id, {
    gradeCat0,
    gradeCat1,
    gradeCat2,
    gradeCat3,
  })
  return data
}
