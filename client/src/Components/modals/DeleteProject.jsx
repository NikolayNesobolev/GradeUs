import React, { useContext, useEffect } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { deleteProject, fetchProjects } from "../../http/projectAPI"
import { observer } from "mobx-react-lite"
import { fetchLabGroups } from "../../http/labGroupAPI"
import { fetchSubjects } from "../../http/subjectAPI"

const DeleteProject = observer(({ show, onHide }) => {
  const { projectObj } = useContext(Context)
  const { subject } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)

  useEffect(() => {
    fetchSubjects().then((data) => subject.setSubjects(data))
    fetchLabGroups().then((data) => laboratoryGroup.setLabGroups(data))
    fetchProjects().then((data) => projectObj.setProjects(data))
  }, [laboratoryGroup, projectObj, subject])

  const deleteProj = () => {
    try {
      if (
        typeof subject.selectedSubject.name === "undefined" ||
        typeof laboratoryGroup.selectedLabGroup.labGroup === "undefined" ||
        typeof projectObj.selectedProject.id === "undefined"
      ) {
        throw new SyntaxError(
          "You must to choose a subject, laboratory and project group from the list!"
        )
      } else {
        deleteProject(projectObj.selectedProject.id).then((data) => {
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
          Delete project
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
        <Button variant="outline-success" onClick={deleteProj}>
          Delete
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteProject
