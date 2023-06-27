import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'

import InitialPage from './pages/InitialPage'
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Encrypt from "./pages/Encrypt";
import ReceiveDemo from "./pages/Receive";
import Shake from "./pages/Shake";
import FundKeypair from "./pages/zzz";
import WalletAdapter from "./pages/Wallet";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<WalletAdapter/>}/>
          <Route exact path="/portfolio" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
