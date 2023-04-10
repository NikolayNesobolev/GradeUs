require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require("./models/models")
const cors = require("cors")
const router = require("./Routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", router)

app.use(errorHandler) //Registrarion of the errorHandler always must be located in the end!!

/*
const db = mysql.createConnection({
  // host: "host.docker.internal",
  host: "localhost",
  user: "root",
  password: "1235",
  database: "gradeusdb",
})

db.connect((error) => {
  if (error) {
    console.log("Error connecting to the MySQL Database")
    return
  }
  console.log("Connection established sucessfully")
})

app.post("/registerUser", (req, res) => {
  const mail = req.body.mail
  const password = req.body.password
  const name = req.body.name
  const labGroup = req.body.labGroup
  const role = req.body.role
  let roleTemp = 0

  if (role === "Student") {
    roleTemp = 3
    console.log(roleTemp)
  } else if (role === "GroupLeader") {
    roleTemp = 2
    console.log(roleTemp)
  } else if (role === "Professor") {
    roleTemp = 1
    console.log(roleTemp)
  }

  db.query(
    "INSERT INTO user (mail, password, name, lab_group_id, role_id) VALUES (?,?,?,?,?)",
    [mail, password, name, labGroup, roleTemp],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("Values inserted...")
      }
    }
  )
})

app.post("/login", (req, res) => {
  const mail = req.body.mail
  const password = req.body.password

  db.query(
    "SELECT * FROM user WHERE mail = ? AND password = ?",
    [mail, password],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }

      if (result.length > 0) {
        res.send(result)
      } else {
        res.send({ message: "Wrong mail/password combination!" })
      }
    }
  )
})
*/
const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log("Server started on port ", PORT)
    })
  } catch (e) {}
}

start()
