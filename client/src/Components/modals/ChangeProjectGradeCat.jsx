import React, { useContext, useEffect, useState } from "react"
import { Modal, Button, Dropdown, Form } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import {
  editProjectGradeCat,
  fetchProjectGradeCategories,
} from "../../http/projectGradeCategoriesAPI"

const ChangeProjectGradeCat = observer(({ show, onHide }) => {
  const { laboratoryGroup } = useContext(Context)
  const { projectObj } = useContext(Context)
  const { projectGradeCatObj } = useContext(Context)

  const [cat0Val, setCat0Val] = useState("")
  const [cat1Val, setCat1Val] = useState("")
  const [cat2Val, setCat2Val] = useState("")
  const [cat3Val, setCat3Val] = useState("")

  useEffect(() => {
    fetchProjectGradeCategories().then((data) =>
      projectGradeCatObj.setProjectGradeCats(data)
    )
  }, [projectGradeCatObj])

  const editProjCat = () => {
    try {
      editProjectGradeCat(projectGradeCatObj.selectedProjectGradeCat.id, {
        category0: cat0Val,
        category1: cat1Val,
        category2: cat2Val,
        category3: cat3Val,
      }).then((data) => {
        setCat0Val("")
        setCat1Val("")
        setCat2Val("")
        setCat3Val("")
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
          Update grade category
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
                active={group.id === laboratoryGroup.selectedLabGroup.id}
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
            {projectGradeCatObj.selectedProjectGradeCat.category0 ||
              "Choose category 1"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {projectGradeCatObj.projectGradeCats
              .filter((cat) => cat.projectId === projectObj.selectedProject.id)
              .map((cat) => (
                <Dropdown.Item
                  onClick={() => projectGradeCatObj.setSelectedGradeCat(cat)}
                  key={cat.id}
                >
                  {cat.category0}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form className="mt-3">
          <Form.Control
            value={cat0Val}
            onChange={(e) => setCat0Val(e.target.value)}
            placeholder={"Project category 1"}
          />
        </Form>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {projectGradeCatObj.selectedProjectGradeCat.category1 ||
              "Choose category 2"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {projectGradeCatObj.projectGradeCats
              .filter((cat) => cat.projectId === projectObj.selectedProject.id)
              .map((cat) => (
                <Dropdown.Item
                  onClick={projectGradeCatObj.setSelectedGradeCat(cat)}
                  key={cat.id}
                >
                  {cat.category1}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form className="mt-3">
          <Form.Control
            value={cat1Val}
            onChange={(e) => setCat1Val(e.target.value)}
            placeholder={"Project category 2"}
          />
        </Form>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {projectGradeCatObj.selectedProjectGradeCat.category2 ||
              "Choose category 3"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {projectGradeCatObj.projectGradeCats
              .filter((cat) => cat.projectId === projectObj.selectedProject.id)
              .map((cat) => (
                <Dropdown.Item
                  onClick={projectGradeCatObj.setSelectedGradeCat(cat)}
                  key={cat.id}
                >
                  {cat.category2}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form className="mt-3">
          <Form.Control
            value={cat2Val}
            onChange={(e) => setCat2Val(e.target.value)}
            placeholder={"Project category 3"}
          />
        </Form>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {projectGradeCatObj.selectedProjectGradeCat.category3 ||
              "Choose category 4"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {projectGradeCatObj.projectGradeCats
              .filter((cat) => cat.projectId === projectObj.selectedProject.id)
              .map((cat) => (
                <Dropdown.Item
                  onClick={projectGradeCatObj.setSelectedGradeCat(cat)}
                  key={cat.id}
                >
                  {cat.category3}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form className="mt-3">
          <Form.Control
            value={cat3Val}
            onChange={(e) => setCat3Val(e.target.value)}
            placeholder={"Project category 4"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={editProjCat}>
          Update
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default ChangeProjectGradeCat
