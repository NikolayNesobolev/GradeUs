import React, { useContext, useEffect } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { fetchSubjects } from "../../http/subjectAPI"
import { fetchLabGroups } from "../../http/labGroupAPI"
import { fetchUsers } from "../../http/userAPI"
import { deleteGrade, fetchGrades } from "../../http/gradeAPI"

const DeleteGrade = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)
  const { user } = useContext(Context)
  const { gradeObj } = useContext(Context)

  useEffect(() => {
    fetchSubjects().then((data) => subject.setSubjects(data))
    fetchLabGroups().then((data) => laboratoryGroup.setLabGroups(data))
    fetchUsers().then((data) => user.setUsers(data))
    fetchGrades().then((data) => gradeObj.setGrade(data))
  }, [laboratoryGroup, user, subject, gradeObj])

  const deleteGrd = () => {
    try {
      if (
        typeof subject.selectedSubject.name === "undefined" ||
        typeof laboratoryGroup.selectedLabGroup.labGroup === "undefined" ||
        typeof user.selectedUser.id === "undefined" ||
        typeof gradeObj.selectedGrade.id == "undefined"
      ) {
        throw new SyntaxError(
          "You must to choose a subject, laboratory, student's name and grade from the list!"
        )
      } else {
        deleteGrade(gradeObj.selectedGrade.id).then((data) => {
          gradeObj.setSelectedGrade("")
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
          Delete grade
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
                (usr) => laboratoryGroup.selectedLabGroup.id === usr.labGroupId
              )
              .map((usr) => (
                <Dropdown.Item
                  onClick={() => user.setSelectedUser(usr)}
                  key={usr.id}
                >
                  {usr.name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {gradeObj.selectedGrade.gradeRes || "Choose grade"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {gradeObj.grade
              .filter(
                (grade) => grade.projectId === user.selectedUser.projectId
              )
              .map((grade) => (
                <Dropdown.Item
                  onClick={() => gradeObj.setSelectedGrade(grade)}
                  key={grade.id}
                >
                  {grade.gradeRes}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={deleteGrd}>
          Delete
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteGrade
