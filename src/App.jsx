import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'

import InitialPage from './pages/InitialPage'
import Dashboard from "./pages/Dashboard";
import ReceiveDemo from "./pages/Receive";
import WalletAdapter from "./pages/Wallet";
import Onboarding from "./pages/Onboarding";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Onboarding/>}/>
          <Route exact path="/portfolio" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
