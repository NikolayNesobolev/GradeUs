import React, { useContext, useEffect } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { fetchSubjects } from "../../http/subjectAPI"
import { fetchLabGroups } from "../../http/labGroupAPI"
import { deleteUser, fetchUsers } from "../../http/userAPI"

const DeleteStudent = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)
  const { user } = useContext(Context)

  useEffect(() => {
    fetchSubjects().then((data) => subject.setSubjects(data))
    fetchLabGroups().then((data) => laboratoryGroup.setLabGroups(data))
    fetchUsers().then((data) => user.setUsers(data))
  }, [laboratoryGroup, user, subject])

  const deleteUsr = () => {
    try {
      if (
        typeof subject.selectedSubject.name === "undefined" ||
        typeof laboratoryGroup.selectedLabGroup.labGroup === "undefined" ||
        typeof user.selectedUser.id === "undefined"
      ) {
        throw new SyntaxError(
          "You must to choose a subject, laboratory and student's name from the list!"
        )
      } else {
        deleteUser(user.selectedUser.id).then((data) => {
          user.setSelectedUser("")
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
          Delete student account
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={deleteUsr}>
          Delete
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteStudent
