import React, { useContext, useState } from "react"
import { Button, Container, Form, Card, Row } from "react-bootstrap"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import { Context } from ".."
import { login, registration } from "../http/userAPI"
import { observer } from "mobx-react-lite"

const Auth = observer(() => {
  const { user } = useContext(Context)

  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE

  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [index, setIndex] = useState("")
  /*const [role, setRole] = useState("")
  const [laborGroup, setLaborGroup] = useState("")
*/
  const click = async () => {
    try {
      //let data

      if (isLogin) {
        await login(mail, password)
      } else {
        await registration(mail, password, name, index)
      }

      user.setUser(user)
      user.setIsAuth(true)
      navigate(HOME_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 50 }}
    >
      {isLogin ? (
        <Card style={{ width: 600 }} className="p-5">
          <h2 className="m-auto">{isLogin ? "Log In" : "Sign In"}</h2>
          <Form className="d-flex flex-column">
            <Form.Control
              className="mt-3"
              placeholder="Enter your email..."
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Row className="d-flex justify-content-between mt-3 ps-3 pe-3">
              <p>Don't you have an account? </p>
              <NavLink to={REGISTRATION_ROUTE}>Sign In!</NavLink>
              <Button variant={"outline-success"} onClick={click}>
                {isLogin ? "Log In" : "Sign In"}
              </Button>
            </Row>
          </Form>
        </Card>
      ) : (
        <Card style={{ width: 600 }} className="p-5">
          <h2 className="m-auto">{isLogin ? "Log In" : "Sign In"}</h2>
          <Form className="d-flex flex-column">
            <Form.Control
              className="mt-3"
              placeholder="Enter your email..."
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Form.Control
              className="mt-3"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Enter your index_nr..."
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            />
            <Row className="d-flex justify-content-between mt-3 ps-3 pe-3">
              <p>Do you already have an account? </p>
              <NavLink to={LOGIN_ROUTE}>Log In!</NavLink>

              <Button variant={"outline-success"} onClick={click}>
                {isLogin ? "Log In" : "Sign In"}
              </Button>
            </Row>
          </Form>
        </Card>
      )}
    </Container>
  )
})

export default Auth
