import React, { useContext, useEffect } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { deleteSubject, fetchSubjects } from "../../http/subjectAPI"

const DeleteSubject = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)

  useEffect(() => {
    fetchSubjects().then((data) => subject.setSubjects(data))
  }, [subject])

  const deleteSubj = () => {
    try {
      if (typeof subject.selectedSubject.id === "undefined") {
        throw new SyntaxError("You must to choose a subject from the list!")
      } else {
        deleteSubject(subject.selectedSubject.id).then((data) => {
          subject.setSelectedSubject("")
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
          Delete Subject
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={deleteSubj}>
          Delete
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteSubject
