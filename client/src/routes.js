import About from "./Pages/About"
import Admin from "./Pages/Admin"
import Auth from "./Pages/Auth"
import Home from "./Pages/Home"
import ProjectsTable from "./Pages/ProjectsTable"
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PROJECTS_TABLE_ROUTE,
} from "./utils/consts"

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Element: Admin,
  },
]

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Element: Home,
  },

  {
    path: ABOUT_ROUTE,
    Element: About,
  },
  {
    path: LOGIN_ROUTE,
    Element: Auth,
  },

  {
    path: REGISTRATION_ROUTE,
    Element: Auth,
  },
  {
    path: PROJECTS_TABLE_ROUTE + "/:id",
    Element: ProjectsTable,
  },
]
