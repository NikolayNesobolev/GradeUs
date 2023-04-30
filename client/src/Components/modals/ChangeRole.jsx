import React, { useContext, useEffect } from "react"
import { Modal, Button, Dropdown } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { editUserPrivileg, fetchUsers } from "../../http/userAPI"
import { fetchRoles } from "../../http/roleAPI"

const ChangeRole = observer(({ show, onHide }) => {
  const { laboratoryGroup } = useContext(Context)
  const { user } = useContext(Context)
  const { roleObj } = useContext(Context)

  useEffect(() => {
    fetchUsers().then((data) => user.setUsers(data))
    fetchRoles().then((data) => roleObj.setRoles(data))
  }, [user, roleObj])

  const editPriv = () => {
    try {
      editUserPrivileg(user.selectedUser.name, {
        roleId: roleObj.selectedRole.id,
      }).then((data) => {
        user.setSelectedUser("")
        roleObj.setSelectedRole("")
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
          Change student role
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {laboratoryGroup.selectedLabGroup.labGroup ||
              "Choose laboratory group"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {laboratoryGroup.labGroups
              //.filter(() => labGroupState === user.labGroupId)
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
              //.filter(() => labGroupState === user.labGroupId)
              .map((student) => (
                <Dropdown.Item
                  onClick={() => user.setSelectedUser(student)}
                  key={student.id}
                >
                  {student.name}
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
