import React, { useState } from "react"
import { Navbar, Nav, Button, Container, Modal, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Axios from "axios"

const Styles = styled.div`
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #adb1b8;
    &:hover {
      color: white;
    }
  }
`

export default function NavBar() {
  const [showLogIn, setShowLogIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const handleCloseLogIn = () => setShowLogIn(false)
  const handleCloseSignUp = () => setShowSignUp(false)
  const handleShowLogIn = () => setShowLogIn(true)
  const handleShowSignUp = () => setShowSignUp(true)

  const [mailReg, setMailReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")
  const [labGroupReg, setLabGroupReg] = useState("")
  const [roleReg, setRoleReg] = useState("")

  const [mailLog, setMailLog] = useState("")
  const [passwordLog, setPasswordlog] = useState("")

  const login = () => {
    Axios.post("http://localhost:5000/login", {
      mail: mailLog,
      password: passwordLog,
    }).then((response) => {
      console.log(response)
    })
  }

  const register = () => {
    Axios.post("http://localhost:5000/registerUser", {
      mail: mailReg,
      password: passwordReg,
      labGroup: labGroupReg,
      role: roleReg,
    }).then((response) => {
      console.log(response)
    })
  }

  return (
    <>
      <Styles>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>GrageUs</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
              </Nav>
              <Nav>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={handleShowLogIn}
                >
                  Log In
                </Button>
                <Button variant="secondary" onClick={handleShowSignUp}>
                  Sign Up
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Styles>

      <Modal show={showLogIn} onHide={handleCloseLogIn}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Adress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setMailLog(e.target.value)
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setPasswordlog(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckBox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" onClick={login}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Adress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setMailReg(e.target.value)
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setPasswordReg(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicInput">
              <Form.Label>Laboratory Group</Form.Label>
              <Form.Control
                type="group"
                placeholder="Group"
                onChange={(e) => {
                  setLabGroupReg(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckBox">
              <Form.Label>Choose your role</Form.Label>
              <Form.Select
                aria-label="role selector"
                onChange={(e) => {
                  setRoleReg(e.target.value)
                }}
              >
                <option value="Student">Student</option>
                <option value="GroupLeader">Group Leader</option>
                <option value="Professor">Professor</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" onClick={register}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
