import { Route, Routes } from "react-router-dom"
import AddEmployee from "./components/AddEmployee"
import NavBar from "./components/NavBar"
import Dashboard from "./components/Dashboard"
import NotFound from "./components/NotFound"


const App = () => {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/employee" element={<AddEmployee/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    
    </>
  )
}

export default App