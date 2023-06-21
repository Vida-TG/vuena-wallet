import { useState } from 'react'
import './App.css'

import CreateWallet from './pages/CreateWallet'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CreateWallet />
    </>
  )
}

export default App
