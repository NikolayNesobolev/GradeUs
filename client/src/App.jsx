import { BrowserRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import NavBar from "./Components/NavBar"
import { Home } from "./Home"
import { About } from "./About"
import { MainContent } from "./Content/MainContent"
import AppRouter from "./Components/AppRouter"

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      {/*
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mainContent" element={<MainContent />} />
      </Routes>
  </Router>
  */}
    </BrowserRouter>
  )
}

export default App
