import React, { useContext } from "react"
import { Navbar, Nav, Button, Container, Modal, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"

import { Context } from "../index"
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts"

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

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    navigate(HOME_ROUTE)
  }

  return (
    <>
      <Styles>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Nav.Link as={Link} to={HOME_ROUTE}>
              <Navbar.Brand style={{ color: "white" }}>GrageUs</Navbar.Brand>
            </Nav.Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {user.isAuth ? (
                <>
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/about">
                      About
                    </Nav.Link>
                  </Nav>
                  <Nav className="ms-auto" style={{ color: "white" }}>
                    <Button
                      variant={"outline-light"}
                      onClick={() => navigate(ADMIN_ROUTE)}
                    >
                      Admin Panel
                    </Button>
                    <Button
                      variant={"outline-light"}
                      className="ms-2"
                      onClick={() => logOut()}
                    >
                      Log Out
                    </Button>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/about">
                      About
                    </Nav.Link>
                  </Nav>
                  <Nav className="ms-auto" style={{ color: "white" }}>
                    <Button
                      variant={"outline-light"}
                      onClick={() => navigate(LOGIN_ROUTE)}
                    >
                      Authorization
                    </Button>
                  </Nav>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Styles>
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Adress</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckBox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Nav.Link as={Link} to="/mainContent">
              <Button variant="primary">Submit</Button>
            </Nav.Link>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Adress</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicInput">
              <Form.Label>Name & Surname</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name and surname"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicInput">
              <Form.Label>Laboratory Group</Form.Label>
              <Form.Control type="group" placeholder="Group" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckBox">
              <Form.Label>Choose your role</Form.Label>
              <Form.Select aria-label="role selector">
                <option value="Professor">Professor</option>
                <option value="GroupLeader">Group Leader</option>
                <option value="Student">Student</option>
              </Form.Select>
            </Form.Group>
            <Nav.Link as={Link} to="/mainContent">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Nav.Link>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
})

export default NavBar
