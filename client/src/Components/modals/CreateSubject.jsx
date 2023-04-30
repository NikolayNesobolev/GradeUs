import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { createSubject } from "../../http/subjectAPI"

const CreateSubject = ({ show, onHide }) => {
  const [value, setValue] = useState("")

  const addSubject = () => {
    try {
      createSubject({ name: value }).then((data) => {
        setValue("")
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
          Create subject
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Subject name"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addSubject}>
          Create
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateSubject
