import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import bg from "../img/bg.jpg"

const About = () => (
  <Container>
    <Row>
      <Col md={6}>
        <img src={bg} alt="bg" height={835} width={500} />
      </Col>
      <Col md={5}>
        <h2>GradeUs</h2>
        <p>
          The application allows professors to unite students into groups and
          evaluate their projects. Allows students to upload files of their
          projects with large sizes.
        </p>
      </Col>
    </Row>
  </Container>
)

export default About
