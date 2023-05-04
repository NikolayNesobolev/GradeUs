import React, { useContext, useEffect, useState } from "react"
import { Modal, Form, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { fetchLabGroups } from "../../http/labGroupAPI"
import { fetchRoles } from "../../http/roleAPI"
import { createUser } from "../../http/userAPI"

const CreateStudent = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)
  const { projectObj } = useContext(Context)
  const { roleObj } = useContext(Context)

  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [index, setIndex] = useState("")

  useEffect(() => {
    fetchLabGroups().then((data) => laboratoryGroup.setLabGroups(data))
    fetchRoles().then((data) => roleObj.setRoles(data))
  }, [laboratoryGroup, roleObj, projectObj])

  const addUser = async () => {
    try {
      await createUser({
        mail,
        password,
        name,
        index,
        labGroupId: laboratoryGroup.selectedLabGroup.id,
        roleId: roleObj.selectedRole.id,
        projectId: projectObj.selectedProject.id,
      }).then((data) => {
        setMail("")
        setPassword("")
        setName("")
        setIndex("")
        onHide()
      })
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create student account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="mt-3"
            placeholder={"Student's mail"}
          />
        </Form>
        <Form>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3"
            placeholder={"Student's password"}
            type="password"
          />
        </Form>
        <Form>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder={"Student's name"}
          />
        </Form>
        <Form>
          <Form.Control
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            className="mt-3"
            placeholder={"Student's index"}
          />
        </Form>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {subject.selectedSubject.name || "Choose subject"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {subject.subjects.map((subj) => (
              <Dropdown.Item
                onClick={() => subject.setSelectedSubject(subj)}
                key={subj.id}
              >
                {subj.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {laboratoryGroup.selectedLabGroup.labGroup ||
              "Choose laboratiry group"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {laboratoryGroup.labGroups
              .filter((group) => group.subjectId === subject.selectedSubject.id)
              .map((group) => (
                <Dropdown.Item
                  onClick={() => laboratoryGroup.setSelectedLabGroup(group)}
                  key={group.id}
                >
                  {group.labGroup}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {projectObj.selectedProject.projectName || "Student's project"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {projectObj.projects
              .filter(
                (proj) =>
                  proj.labGroupId === laboratoryGroup.selectedLabGroup.id
              )
              .map((proj) => (
                <Dropdown.Item
                  onClick={() => projectObj.setSelectedProject(proj)}
                  key={proj.id}
                >
                  {proj.projectName}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {roleObj.selectedRole.role || "Student's role"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {roleObj.roles.map((role) => (
              <Dropdown.Item
                onClick={() => roleObj.setSelectedRole(role)}
                key={role.id}
              >
                {role.role}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addUser}>
          Create
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateStudent
