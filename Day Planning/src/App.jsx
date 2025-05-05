import './App.css'
import Ambitions from './pages/Ambitions'
import DoList from './pages/DoList'
import TimeTable from './pages/TimeTable'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Ambitions/>} />
        <Route path="/time-table" element={<TimeTable/>} />
        <Route path="/do-list" element={<DoList/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
