import React, { useContext, useEffect } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { editUserPrivileg, fetchUsers } from "../../http/userAPI"
import { fetchProjects } from "../../http/projectAPI"
import { fetchLabGroups } from "../../http/labGroupAPI"

const AssignProject = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)
  const { projectObj } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)
  const { user } = useContext(Context)

  useEffect(() => {
    fetchLabGroups().then((data) => laboratoryGroup.setLabGroups(data))
    fetchUsers(laboratoryGroup.selectedLabGroup.id).then((data) =>
      user.setUsers(data)
    )
    fetchProjects(laboratoryGroup.selectedLabGroup.id).then((data) =>
      projectObj.setProjects(data)
    )
  }, [user, projectObj, laboratoryGroup])

  const editPriv = () => {
    try {
      if (
        typeof subject.selectedSubject.name === "undefined" ||
        typeof laboratoryGroup.selectedLabGroup.labGroup === "undefined" ||
        typeof user.selectedUser.name === "undefined" ||
        typeof projectObj.selectedProject.id === "undefined"
      ) {
        throw new SyntaxError(
          "You must to choose a subject, laboratory and student's name and project from the list!"
        )
      } else {
        editUserPrivileg(user.selectedUser.name, {
          projectId: projectObj.selectedProject.id,
        }).then((data) => {
          user.setSelectedUser("")
          projectObj.setSelectedProject("")
          onHide()
        })
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Assign project for the student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            {user.selectedUser.name || "Choose student"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {user.users
              .filter(
                (student) =>
                  laboratoryGroup.selectedLabGroup.id === student.labGroupId
              )
              .map((student) => (
                <Dropdown.Item
                  onClick={() => user.setSelectedUser(student)}
                  key={student.id}
                >
                  {student.name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {projectObj.selectedProject.projectName || "Choose project"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {projectObj.projects
              .filter(
                (proj) =>
                  laboratoryGroup.selectedLabGroup.id === proj.labGroupId
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={editPriv}>
          Update
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default AssignProject
