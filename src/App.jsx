import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'

import InitialPage from './pages/InitialPage'
import Dashboard from "./pages/Dashboard";
import ReceiveDemo from "./pages/Receive";
import WalletAdapter from "./pages/Wallet";
import Onboarding from "./pages/Onboarding";
import CreateWallet from "./pages/CreateWallet";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Onboarding/>}/>
          <Route exact path="/portfolio" element={<Dashboard/>}/>
          <Route exact path="/create-wallet" element={<CreateWallet/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
