import React, { useContext, useEffect, useState } from "react"
import { Modal, Form, Button, Dropdown } from "react-bootstrap"
import { createLabGroup } from "../../http/labGroupAPI"
import { Context } from "../.."
import { fetchSubjects } from "../../http/subjectAPI"
import { observer } from "mobx-react-lite"

const CreateLabGroup = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)

  const [name, setName] = useState("")

  useEffect(() => {
    fetchSubjects().then((data) => subject.setSubjects(data))
  }, [subject])

  const addLabGroup = () => {
    try {
      createLabGroup({
        labGroup: name,
        subjectId: subject.selectedSubject.id,
      }).then((data) => {
        setName("")
        onHide()
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create laboratory group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {subject.selectedSubject.name || "Choose subject"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {subject.subjects
              .map((subj) => (
                <Dropdown.Item
                  onClick={() => subject.setSelectedSubject(subj)}
                  key={subj.id}
                >
                  {subj.name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form>
          <Form.Control
            className="mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Laboratory groupe name"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addLabGroup}>
          Create
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateLabGroup
