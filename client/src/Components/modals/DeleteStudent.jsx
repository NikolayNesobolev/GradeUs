import React, { useContext } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."

const DeleteStudent = ({ show, onHide }) => {
  const { user } = useContext(Context)

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete student account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>Choose student</Dropdown.Toggle>
          <Dropdown.Menu>
            {user.users
              //.filter(() => labGroupState === user.labGroupId)
              .map((usr) => (
                <Dropdown.Item key={usr.id}>{usr.name}</Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success">Delete</Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteStudent
