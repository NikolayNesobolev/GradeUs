const express = require("express")
try {
  var mysql = require("mysql")
} catch (err) {
  console.log(
    "Cannot find `mysql` module. Is it installed ? Try `npm install mysql` or `npm install`."
  )
}

const config = require("config")
const cors = require("cors")

const app = express()
const PORT = config.get("serverPort")

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
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
  const labGroup = req.body.labGroup
  const role = req.body.role
  let roleTemp = 0

  console.log(role)
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
    "INSERT INTO users (mail, password, laboratory_group, role_id) VALUES (?,?,?,?)",
    [mail, password, labGroup, roleTemp],
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
    "SELECT * FROM users WHERE mail = ? AND password = ?",
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

try {
  app.listen(PORT, () => {
    console.log("Server started on port ", PORT)
  })
} catch (e) {}
