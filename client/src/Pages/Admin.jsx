import React, { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"

import CreateSubject from "../Components/modals/CreateSubject"
import CreateLabGroup from "../Components/modals/CreateLabGroup"
import CreateProject from "../Components/modals/CreateProject"
import CreateProjectGradeCat from "../Components/modals/CreateProjectGradeCat"
import CreateStudent from "../Components/modals/CreateStudent"
import AssignProject from "../Components/modals/AssignProject"
import ChangeRole from "../Components/modals/ChangeRole"
import DeleteSubject from "../Components/modals/DeleteSubject"
import DeleteLabGroup from "../Components/modals/DeleteLabGroup"
import DeleteProject from "../Components/modals/DeleteProject"
import ChangeProjectGradeCat from "../Components/modals/ChangeProjectGradeCat"
import DeleteStudent from "../Components/modals/DeleteStudent"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { fetchProjects } from "../http/projectAPI"
import { fetchUsers } from "../http/userAPI"
import { fetchProjectGradeCategories } from "../http/projectGradeCategoriesAPI"
import { fetchCategoriesGrade } from "../http/categoriesGradeAPI"
import { fetchGrades } from "../http/gradeAPI"

const Admin = observer(() => {
  const { user } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)
  const { projectObj } = useContext(Context)
  const { projectGradeCatObj } = useContext(Context)
  const { gradeObj } = useContext(Context)
  const { catGradeObj } = useContext(Context)

  const [subjectModalVisible, setCreateSubjectModalVisible] = useState(false)
  const [labGroupModalVisible, setLabGroupModalVisible] = useState(false)
  const [projectModalVisible, setProjectModalVisible] = useState(false)
  const [projectGradeCatVisible, setProjectGradeCatVisible] = useState(false)
  const [studentModalVisible, setStudentModalVisible] = useState(false)
  const [assignProjectModalVisible, setAssignProjectModalVisible] =
    useState(false)
  const [changeRoleModalVisible, setChangeRoleModalVisible] = useState(false)

  const [delSubjectModalVis, setDelSubjectModalVis] = useState(false)
  const [delLabGroupModalVis, setDelLabGroupModalVis] = useState(false)
  const [delProjectModalVis, setDelProjectModalVis] = useState(false)
  const [changeProjectGradeCatVis, setChangeProjectGradeCatVis] =
    useState(false)
  const [delStudentModalVis, setDelStudentModalVis] = useState(false)

  useEffect(() => {
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
    laboratoryGroup,
    projectGradeCatObj,
    projectObj,
    user,
  ])

  return (
    <Container className="d-flex flex-column mt-5">
      <Row className="mt-3">
        <Col>
          <Button
            variant="outline-primary"
            className="mt-3 p-2"
            onClick={() => setCreateSubjectModalVisible(true)}
          >
            Create subject
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-primary"
            className="mt-3 p-2"
            onClick={() => setDelSubjectModalVis(true)}
          >
            Delete Subject
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button
            variant="outline-secondary"
            className="mt-3 p-2"
            onClick={() => setLabGroupModalVisible(true)}
          >
            Create Lab group
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-secondary"
            className="mt-3 p-2"
            onClick={() => setDelLabGroupModalVis(true)}
          >
            Delete laboratory group
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button
            variant="outline-primary"
            className="mt-3 p-2"
            onClick={() => setProjectModalVisible(true)}
          >
            Create project
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-primary"
            className="mt-3 p-2"
            onClick={() => setDelProjectModalVis(true)}
          >
            Delete project
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button
            variant="outline-secondary"
            className="mt-3 p-2"
            onClick={() => setProjectGradeCatVisible(true)}
          >
            Create grade categories
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-danger"
            className="mt-3 p-2"
            onClick={() => setChangeProjectGradeCatVis(true)}
          >
            Update grade categories
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button
            //variant="outline-primary"
            variant="outline-warning"
            className="mt-3 p-2"
            onClick={() => setStudentModalVisible(true)}
          >
            Create student account
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-primary"
            className="mt-3 p-2"
            onClick={() => setDelStudentModalVis(true)}
          >
            Delete student account
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button
            variant="outline-secondary"
            className="mt-3 p-2"
            onClick={() => setAssignProjectModalVisible(true)}
          >
            Assign project for the student
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-secondary"
            className="mt-3 p-2"
            onClick={() => setChangeRoleModalVisible(true)}
          >
            Change the role for the student
          </Button>
        </Col>
      </Row>

      <CreateSubject
        show={subjectModalVisible}
        onHide={() => setCreateSubjectModalVisible(false)}
      />
      <CreateLabGroup
        show={labGroupModalVisible}
        onHide={() => setLabGroupModalVisible(false)}
      />
      <CreateProject
        show={projectModalVisible}
        onHide={() => setProjectModalVisible(false)}
      />
      <CreateProjectGradeCat
        show={projectGradeCatVisible}
        onHide={() => setProjectGradeCatVisible(false)}
      />
      <CreateStudent
        show={studentModalVisible}
        onHide={() => setStudentModalVisible(false)}
      />
      <AssignProject
        show={assignProjectModalVisible}
        onHide={() => setAssignProjectModalVisible(false)}
      />
      <ChangeRole
        show={changeRoleModalVisible}
        onHide={() => setChangeRoleModalVisible(false)}
      />

      <DeleteSubject
        show={delSubjectModalVis}
        onHide={() => setDelSubjectModalVis(false)}
      />
      <DeleteLabGroup
        show={delLabGroupModalVis}
        onHide={() => setDelLabGroupModalVis(false)}
      />
      <DeleteProject
        show={delProjectModalVis}
        onHide={() => setDelProjectModalVis(false)}
      />
      <ChangeProjectGradeCat
        show={changeProjectGradeCatVis}
        onHide={() => setChangeProjectGradeCatVis(false)}
      />
      <DeleteStudent
        show={delStudentModalVis}
        onHide={() => setDelStudentModalVis(false)}
      />
    </Container>
  )
})

export default Admin
