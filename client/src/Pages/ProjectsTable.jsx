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
import { fetchCategoriesGrade } from "../http/categoriesGradeAPI"
import useDrivePicker from "react-google-drive-picker"
import { decryptToken } from "../utils/token"

const ProjectTable = observer(() => {
  const { user } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)
  const { projectObj } = useContext(Context)
  const { projectGradeCatObj } = useContext(Context)
  const { gradeObj } = useContext(Context)
  const { catGradeObj } = useContext(Context)

  const token = decryptToken()

  const [openPicker, authResponse] = useDrivePicker()

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

  const addGrade = async (projId) => {
    try {
      console.log(projId)
      const response = await createGrade({
        projectId: projId,
        gradeCat0: Number(grade0Val),
        gradeCat1: Number(grade1Val),
        gradeCat2: Number(grade2Val),
        gradeCat3: Number(grade3Val),
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  const handleOpenPicker = () => {
    try {
      openPicker({
        clientId:
          "785324095489-dm0t8dls3db72u7ku65kmf37tokcveef.apps.googleusercontent.com",
        developerKey: "AIzaSyDVuC2qr0zkShMCPjd5gpTnPSCS-VDEKp8",
        viewId: "DOCS",
        token:
          "ya29.a0AWY7CklaKttlpdPogR74vTyCEKKFlFczgzFHGpwBdLOO73_lOQumr1vyCsxUCvCm4qUJecf_ZWV330CBeYAd-Aer7o_g55F6ywP4vT9KujEZnJ3pini8YPya_N48Qh0fQ8lq4u2nLs1KBc9yTCYolrQMjGvJaCgYKARYSARMSFQG1tDrpniOSrtfJMDUMlDZpPixwlQ0163",
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: false,
        callbackFunction: (data) => {
          if (data.action === "cancel") {
            console.log("User clicked cancel/close button")
          }
          console.log(data)
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container className="c-flex jusify-content-center">
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
                      {token.name !== student.name ? (
                        <>
                          {token.roleId === 1 ? (
                            <Button
                              className="d-flex"
                              variant="outline-primary"
                              onClick={() => handleOpenPicker()}
                            >
                              Send project
                            </Button>
                          ) : null}
                        </>
                      ) : (
                        <Button
                          className="d-flex"
                          variant="outline-primary"
                          onClick={() => handleOpenPicker()}
                        >
                          Send project
                        </Button>
                      )}
                    </th>
                    <th>
                      {token.roleId !== 1 ? null : (
                        <Button
                          variant="outline-primary"
                          onClick={() => addGrade(topic.id)}
                        >
                          Add grade
                        </Button>
                      )}
                    </th>
                  </tr>
                ))}
            </tbody>
          ))}
      </Table>

      <Table className="mt-5" bordered hover>
        <thead>
          <tr>
            <th colSpan={1}>Laboratory group</th>
            <th colSpan={5000}>{labGroup?.labGroup}</th>
          </tr>
          <tr style={{ background: "lightgray" }}>
            <th>Student</th>
            <th>Index_nr</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {user.users
            .filter((student) => student.labGroupId === labGroup?.id)
            .map((student) => (
              <tr key={student.id}>
                <th key={student.id}>{student.name}</th>
                <th>{student.index}</th>

                {gradeObj.grade
                  .filter((grade) => grade.projectId === student.projectId)
                  .map((grade) => (
                    <th key={grade.id}>{grade.gradeRes}</th>
                  ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  )
})

export default ProjectTable
