import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import UserStore from "./store/UserStore"
import LabGroupStore from "./store/LabGroupStore"
import SubjectStore from "./store/SubjectStore"
import RoleStore from "./store/RoleStore"
import ProjectStore from "./store/ProjectStore"
import ProjectGradeCatStore from "./store/ProjectGradeCatStore"
import GradeStore from "./store/GradeStore"
import CatGradeStore from "./store/CatGradeStore"

export const Context = React.createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      subject: new SubjectStore(),
      laboratoryGroup: new LabGroupStore(),
      roleObj: new RoleStore(),
      projectObj: new ProjectStore(),
      projectGradeCatObj: new ProjectGradeCatStore(),
      gradeObj: new GradeStore(),
      catGradeObj: new CatGradeStore(),
    }}
  >
    <App />
  </Context.Provider>
)
