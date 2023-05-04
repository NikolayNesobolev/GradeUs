import React, { useContext, useEffect } from "react"
import Slider from "../Components/Slider"
import { Col, Container, Row } from "react-bootstrap"
import { Context } from ".."
import SubjectBar from "../Components/SubjectBar"
import LabGroupList from "../Components/LabGroupList"
import { observer } from "mobx-react-lite"
import { fetchSubjects } from "../http/subjectAPI"
import { fetchLabGroups } from "../http/labGroupAPI"

const Home = observer(() => {
  const { user } = useContext(Context)
  const { subject } = useContext(Context)
  const { laboratoryGroup } = useContext(Context)

  useEffect(() => {
    fetchSubjects().then((data) => subject.setSubjects(data))
    fetchLabGroups(subject.selectedSubject.id).then((data) =>
      laboratoryGroup.setLabGroups(data)
    )
  }, [laboratoryGroup, subject, subject.selectedSubject])

  return (
    <>
      {user.isAuth ? (
        <Container>
          <Row className="mt-3">
            <Col md={3}>
              <SubjectBar />
            </Col>
            <Col md={1}>
              <Col>
                <LabGroupList />
              </Col>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Slider />
        </>
      )}
    </>
  )
})

export default Home
