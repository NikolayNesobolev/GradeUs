import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Modal, Form, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { fetchLabGroups } from "../../http/labGroupAPI"
import { createProject } from "../../http/projectAPI"

const CreateProject = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)

  const [name, setName] = useState("")

  useEffect(() => {
    fetchLabGroups().then((data) => laboratoryGroup.setLabGroups(data))
  }, [laboratoryGroup])

  const addProject = async () => {
    try {
      await createProject({
        projectName: name,
        labGroupId: laboratoryGroup.selectedLabGroup.id,
      }).then((data) => {
        setName("")
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
          Create project
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
        <Form className="mt-3">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Project name"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProject}>
          Create
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateProject
