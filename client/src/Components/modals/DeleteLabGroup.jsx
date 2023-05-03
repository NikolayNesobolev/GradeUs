import React, { useContext, useEffect } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { fetchLabGroups } from "../../http/labGroupAPI"
import { deleteGroup } from "../../http/labGroupAPI"
import { fetchSubjects } from "../../http/subjectAPI"

const DeleteLabGroup = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)

  useEffect(() => {
    fetchSubjects().then((data) => subject.setSubjects(data))
    fetchLabGroups().then((data) => laboratoryGroup.setLabGroups(data))
  }, [laboratoryGroup, subject])

  const deleteLabGroup = () => {
    try {
      if (
        typeof subject.selectedSubject.name === "undefined" ||
        typeof laboratoryGroup.selectedLabGroup.labGroup === "undefined"
      ) {
        throw new SyntaxError(
          "You must to choose a subject and laboratory group from the list!"
        )
      } else {
        deleteGroup(laboratoryGroup.selectedLabGroup.id).then((data) => {
          laboratoryGroup.setSelectedLabGroup("")
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
          Delete laboratory group
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={deleteLabGroup}>
          Delete
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteLabGroup
