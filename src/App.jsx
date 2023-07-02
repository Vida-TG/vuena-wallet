import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'

import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import CreateWallet from "./pages/CreateWallet";

import './font/YsabeauOffice-Black.ttf'
import './font/YsabeauOffice-Light.ttf'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<CreateWallet/>}/>
          <Route exact path="/portfolio" element={<Dashboard/>}/>
          <Route exact path="/create-wallet" element={<CreateWallet/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
