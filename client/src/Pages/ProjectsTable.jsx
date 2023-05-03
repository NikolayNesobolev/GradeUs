import React, { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { fetchOneLabGroup } from "../http/labGroupAPI"
import { fetchProjects } from "../http/projectAPI"
import { fetchProjectGradeCategories } from "../http/projectGradeCategoriesAPI"
import { fetchUsers } from "../http/userAPI"
import { Context } from ".."
import { observer } from "mobx-react-lite"
import { createGrade, fetchGrades } from "../http/gradeAPI"
import {
  createCategoryGrade,
  fetchCategoriesGrade,
} from "../http/categoriesGradeAPI"
import useDrivePicker from "react-google-drive-picker"

const ProjectTable = observer(() => {
  const { user } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)
  const { projectObj } = useContext(Context)
  const { projectGradeCatObj } = useContext(Context)
  const { gradeObj } = useContext(Context)
  const { catGradeObj } = useContext(Context)

  const [openPicker] = useDrivePicker()

  const [grade0Val, setGrade0Val] = useState(5)
  const [grade1Val, setGrade1Val] = useState(5)
  const [grade2Val, setGrade2Val] = useState(5)
  const [grade3Val, setGrade3Val] = useState(5)

  const [labGroup, setlabGroup] = useState("")
  const { id } = useParams()

  useEffect(() => {
    fetchOneLabGroup(id).then((data) => setlabGroup(data))
    fetchProjects().then((data) => projectObj.setProjects(data))
    fetchUsers().then((data) => user.setUsers(data))
    fetchProjectGradeCategories().then((data) =>
      projectGradeCatObj.setProjectGradeCats(data)
    )
    fetchGrades().then((data) => gradeObj.setGrade(data))
    fetchCategoriesGrade().then((data) => catGradeObj.setCatsGrade(data))
  }, [
    catGradeObj,
    gradeObj,
    id,
    laboratoryGroup,
    projectGradeCatObj,
    projectObj,
    user,
  ])

  const addGrade = () => {
    try {
      createCategoryGrade({
        gradeCat0: Number(grade0Val),
        gradeCat1: Number(grade1Val),
        gradeCat2: Number(grade2Val),
        gradeCat3: Number(grade3Val),
        projectId: projectObj.selectedProject.id,
        labGroupId: laboratoryGroup.selectedLabGroup.id,
      }).then((data) => {
        let res =
          (Number(grade0Val) +
            Number(grade1Val) +
            Number(grade2Val) +
            Number(grade3Val)) /
          4
        createGrade({ gradeRes: res }).then((data) => {
          res = 0
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "850154107871-s4eufgtldi9mip5568ucto6se5b9h5qb.apps.googleusercontent.com",
      developerKey: "AIzaSyBaEhtIup7qIpdLGAzY7DUhLhbAvLPl9L8",
      viewId: "DOCS",
      token:
        "ya29.a0AWY7CklaKttlpdPogR74vTyCEKKFlFczgzFHGpwBdLOO73_lOQumr1vyCsxUCvCm4qUJecf_ZWV330CBeYAd-Aer7o_g55F6ywP4vT9KujEZnJ3pini8YPya_N48Qh0fQ8lq4u2nLs1KBc9yTCYolrQMjGvJaCgYKARYSARMSFQG1tDrpniOSrtfJMDUMlDZpPixwlQ0163",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
    })
  }

  return (
    <Container className="d-flex jusify-content-center">
      <Table className="mt-5" bordered hover>
        <thead>
          <tr>
            <th colSpan={1}>Laboratory group</th>
            <th colSpan={5000}>{labGroup?.labGroup}</th>
          </tr>
        </thead>
        {projectObj.projects
          .filter((proj) => proj.labGroupId === labGroup?.id)
          .map((topic, index) => (
            <tbody key={index}>
              <tr key={index} style={{ background: "lightgray" }}>
                <th key={index}>
                  Topic {index + 1}: {topic.projectName}
                </th>
                <th>Index_nr</th>
                {projectGradeCatObj.projectGradeCats
                  .filter((cats) => cats.projectId === topic.id)
                  .map((cats, index) => (
                    <React.Fragment key={index}>
                      <th key={index}>{cats.category0}</th>
                      <th>{cats.category1}</th>
                      <th>{cats.category2}</th>
                      <th>{cats.category3}</th>
                    </React.Fragment>
                  ))}
                <th>Project</th>
                <th>Grade</th>
              </tr>

              {user.users
                .filter((student) => student.projectId === topic.id)
                .map((student) => (
                  <tr key={student.id}>
                    <th>{student.name}</th>
                    <th>{student.index}</th>
                    <th>
                      <Form.Select
                        value={grade0Val}
                        onChange={(e) => setGrade0Val(e.target.value)}
                      >
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                      </Form.Select>
                    </th>
                    <th>
                      <Form.Select
                        value={grade1Val}
                        onChange={(e) => setGrade1Val(e.target.value)}
                      >
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                      </Form.Select>
                    </th>
                    <th>
                      <Form.Select
                        value={grade2Val}
                        onChange={(e) => setGrade2Val(e.target.value)}
                      >
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                      </Form.Select>
                    </th>
                    <th>
                      <Form.Select
                        value={grade3Val}
                        onChange={(e) => setGrade3Val(e.target.value)}
                      >
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                      </Form.Select>
                    </th>
                    <th>
                      <Button
                        className="d-flex"
                        variant="outline-primary"
                        onClick={() => handleOpenPicker()}
                      >
                        Send project
                      </Button>
                    </th>
                    <th>
                      <Button variant="outline-primary" onClick={addGrade}>
                        Add grade
                      </Button>
                    </th>
                    {/*projectObj.projects.filter(
                      (proj) => proj.labGroupId === labGroup?.id
                    ).filter(grade=> grade.projectId === proj.)}*/}
                  </tr>
                ))}
            </tbody>
          ))}
      </Table>
    </Container>
  )
})

export default ProjectTable
