import React, { useContext, useEffect } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { editUserPrivileg, fetchUsers } from "../../http/userAPI"
import { fetchRoles } from "../../http/roleAPI"

const ChangeRole = observer(({ show, onHide }) => {
  const { subject } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)
  const { user } = useContext(Context)
  const { roleObj } = useContext(Context)

  useEffect(() => {
    fetchUsers().then((data) => user.setUsers(data))
    fetchRoles().then((data) => roleObj.setRoles(data))
  }, [user, roleObj])

  const editPriv = () => {
    try {
      if (
        typeof subject.selectedSubject.name === "undefined" ||
        typeof laboratoryGroup.selectedLabGroup.labGroup === "undefined" ||
        typeof user.selectedUser.name === "undefined" ||
        typeof roleObj.selectedRole.id === "undefined"
      ) {
        throw new SyntaxError(
          "You must to choose a subject, laboratory, student's name and new role from the list!"
        )
      } else {
        editUserPrivileg(user.selectedUser.name, {
          roleId: roleObj.selectedRole.id,
        }).then((data) => {
          user.setSelectedUser("")
          roleObj.setSelectedRole("")
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
          Change student role
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
            {roleObj.selectedRole.role || "Choose role"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {roleObj.roles
              //.filter(() => labGroupState === user.labGroupId)
              .map((role) => (
                <Dropdown.Item
                  onClick={() => roleObj.setSelectedRole(role)}
                  key={role.id}
                >
                  {role.role}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={editPriv}>
          Update
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default ChangeRole
