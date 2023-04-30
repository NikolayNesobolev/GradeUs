import React from "react"
import { Button, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { PROJECTS_TABLE_ROUTE } from "../../utils/consts"

const LabGroupItem = ({ laboratoryGroup }) => {
  const navigate = useNavigate()

  return (
    <Row className="mt-1">
      <Button
        style={{ cursor: "pointer" }}
        variant="outline-primary"
        onClick={() =>
          navigate(PROJECTS_TABLE_ROUTE + "/" + laboratoryGroup.id)
        }
      >
        {laboratoryGroup.labGroup}
      </Button>
    </Row>
  )
}

export default LabGroupItem
