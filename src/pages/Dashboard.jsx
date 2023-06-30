import React, { useEffect } from 'react'
import { decryptKeypair } from '../utils/utils'
import { implementAirdrop, updateBalance } from '../utils/sendToken'
import Send from './Send'

const Dashboard = () => {
  const [sendState, setSendState] = React.useState(false);
  const [balance, setBalance] = React.useState(0)

  let data = localStorage.getItem('data');
  data = JSON.parse(data)
  const decryptedKeypair = decryptKeypair(data.encrypted, data.nonce, data.salt);
      
  const [kP, setkP] = React.useState(decryptedKeypair)


  const handleSendTokens = async () => {
    setSendState(true)
  };


  const handleAirdrop = async () => {
    await implementAirdrop(kP)
    setBalance(await updateBalance(kP))
  };

  const getBL = async () => {
    setBalance(await updateBalance(kP))
  }

  useEffect(() => {
    getBL().then(
      console.log(balance)
    )
  }, []);

  return (
    <>
      {!sendState &&
        <div className='blobs'>
          <div>Vuena</div>
          <div>{kP && kP.publicKey.toBase58()}</div>
          

          <p>Balance: {balance} SOL</p>

          <button onClick={handleSendTokens}>Send</button>
          <button onClick={handleAirdrop}>Airdrop</button>
          <button >Refresh balance</button>
        </div>
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