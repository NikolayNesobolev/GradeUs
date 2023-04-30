import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { ListGroup } from "react-bootstrap"
import { Context } from "../index"

const SubjectBar = observer(() => {
  const { subject } = useContext(Context)

  return (
    <ListGroup>
      {subject.subjects.map((sub) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={sub.id === subject.selectedSubject.id}
          onClick={() => subject.setSelectedSubject(sub)}
          key={sub.id}
        >
          {sub.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
})

export default SubjectBar
