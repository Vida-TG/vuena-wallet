import React, { useEffect } from 'react'
import { decryptKeypair } from '../utils/utils'
import { implementAirdrop, updateBalance } from '../utils/sendToken'
import Send from './Send'

const Dashboard = () => {
  const [sendState, setSendState] = React.useState(false);
  const [balance, setBalance] = React.useState(0)

  const encryptedPrivateKey = localStorage.getItem('encryptedPrivateKey');
  const storedPassword = localStorage.getItem('password');

  // Decrypt the keypair
  const decryptedKeypair = decryptKeypair(encryptedPrivateKey, storedPassword);
      
  const [kP, setkP] = React.useState(decryptedKeypair)


  const handleSendTokens = async () => {
    setSendState(true)
  };

  

  const handleAirdrop = async () => {
    await implementAirdrop(kP)
    setBalance(await updateBalance(kP))
  };


    useEffect(() => {
      const getBL = async () => {
        setBalance(await updateBalance(kP));
      }
      getBL()
    }, []);

  return (
    <>
      {!sendState &&
        <>
          <div>Vuena</div>
          <div>{kP && kP.publicKey.toBase58()}</div>
          

          <p>Balance: {balance} SOL</p>

          <button onClick={handleSendTokens}>Send</button>
          <button onClick={handleAirdrop}>Airdrop</button>
        </>
      }
      {sendState &&
        <>
          <Send />
        </>
      }

    </>
  )
}

export default Dashboard