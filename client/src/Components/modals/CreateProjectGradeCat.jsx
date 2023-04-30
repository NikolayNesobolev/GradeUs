import React, { useContext, useState } from "react"
import { Modal, Form, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { createProjectGradeCategory } from "../../http/projectGradeCategoriesAPI"

const CreateProjectGradeCat = observer(({ show, onHide }) => {
  const { laboratoryGroup } = useContext(Context)
  const { projectObj } = useContext(Context)

  const [cat0Value, setCat0Value] = useState("")
  const [cat1Value, setCat1Value] = useState("")
  const [cat2Value, setCat2Value] = useState("")
  const [cat3Value, setCat3Value] = useState("")

  const addCats = () => {
    try {
      createProjectGradeCategory({
        category0: cat0Value,
        category1: cat1Value,
        category2: cat2Value,
        category3: cat3Value,
        projectId: projectObj.selectedProject.id,
        labGroupId: laboratoryGroup.selectedLabGroup.id,
      }).then((data) => {
        setCat0Value("")
        setCat1Value("")
        setCat2Value("")
        setCat3Value("")
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
          Create grade categories
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {laboratoryGroup.selectedLabGroup.labGroup ||
              "Choose laboratory group"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {laboratoryGroup.labGroups.map((group) => (
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
        <Form className="mt-3">
          <Form.Control
            value={cat0Value}
            onChange={(e) => setCat0Value(e.target.value)}
            placeholder={"Category 1"}
          />
        </Form>
        <Form className="mt-3">
          <Form.Control
            value={cat1Value}
            onChange={(e) => setCat1Value(e.target.value)}
            placeholder={"Category 2"}
          />
        </Form>
        <Form className="mt-3">
          <Form.Control
            value={cat2Value}
            onChange={(e) => setCat2Value(e.target.value)}
            placeholder={"Category 3"}
          />
        </Form>
        <Form className="mt-3">
          <Form.Control
            value={cat3Value}
            onChange={(e) => setCat3Value(e.target.value)}
            placeholder={"Category 4"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addCats}>
          Create
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateProjectGradeCat
