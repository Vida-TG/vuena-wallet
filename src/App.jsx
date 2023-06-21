import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'

import InitialPage from './pages/InitialPage'
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<InitialPage/>}/>
          <Route exact path="/portfolio" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
