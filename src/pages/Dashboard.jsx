import React, { useEffect } from 'react'
import logo from './images/logo.png'
import { decryptKeypair } from '../utils/utils'
import { implementAirdrop, updateBalance } from '../utils/sendToken'
import { FaEye, FaEyeSlash, FaPaperPlane, FaParachuteBox, FaStarOfLife, FaQrcode, FaAngleLeft } from 'react-icons/fa'
import './css/dashboard.css'
import Send from './Send'
import TransactionHistory from './Transactions'
import Receive from './Receive'
import FundWalletAdapter from './FundWallet'

const Dashboard = () => {
  const [sendState, setSendState] = React.useState(false);
  const [balance, setBalance] = React.useState(0)
  const [privacy, setPrivacy] = React.useState(true)
  const [receiveOn, setReceiveOn] = React.useState(false)

  let data = localStorage.getItem('data');
  data = JSON.parse(data)
  const decryptedKeypair = decryptKeypair(data.encrypted, data.nonce, data.salt);
      
  const [kP, setkP] = React.useState(decryptedKeypair)


  const handleSendTokens = async () => {
    setSendState(true)
  };


  const handleAirdrop = async () => {
    let trusyFalsy = await implementAirdrop(kP)
    if (trusyFalsy) {
      setBalance(balance+1)
    }
  };

  const handlePrivacy = async () => {
    if (privacy) { setPrivacy(false) } else {setPrivacy(true)}
  };

  const getBL = async () => {
    setBalance(await updateBalance(kP))
  }

  useEffect(() => {
    getBL().then(
      setBalance(balance)
    )
  }, []);

  return (
    <>
      {!sendState &&
        <div className='blobs'>
          <div className="container" style={{opacity: receiveOn ? ".2" : "1" }}>
            <div className="scan-to-pay btn">
              <FaQrcode style={{fontSize:"50px"}}/>
            </div>

            
            <div className="main-tab">
              <div>
                <h2>Vault Address</h2>
                <p style={{fontSize: '10px', fontFamily: 'Ysa Light'}}>(Do not share this address publicly)</p>
                <button className='refill btn'>Refill vault</button>
                { privacy ? 
                  <div>
                    <p className='publickey'><FaStarOfLife /><FaStarOfLife /><FaStarOfLife /></p>
                    <p>Vault balance: <FaStarOfLife /><FaStarOfLife /></p>
                  </div>
                  :
                  <div>
                    <p className='publickey' style={{fontFamily: "Ysa Light"}}>{kP && kP.publicKey.toBase58()}</p>
                    <p>Vault balance: {balance} SOL</p>
                  </div>
                }
                <button onClick={handlePrivacy} className="sendDrop">{ !privacy ? <FaEyeSlash /> : <FaEye /> }</button>
                <div>
                  <button onClick={handleAirdrop} className="sendDrop sendDropII"><FaParachuteBox /></button>
                  <button onClick={handleSendTokens} className="sendDrop sendDropII"><FaPaperPlane /></button>
                </div>
              </div>
            </div>
            <div className="below-main">
              <div className="side-bar">
                <TransactionHistory publicKey={kP.publicKey.toBase58()} />
              </div>
              <div>
                <h2 style={{textAlign: "center", maxWidth: "800px"}}>Receive SOL while protecting your privacy</h2>
                <h4 style={{textAlign: "center", maxWidth: "650px", fontFamily: "Ysa Light"}}>You would be receiving with your public address from which you privately refill your vault</h4>
                <div className="receive-tab">
                  <div className='receive-tab-btn'>
                    <button onClick={()=>{setReceiveOn(true)}} className=" btn">Receive SOL</button>
                  </div>
                  <div className="fund-with-wa-box">
                    <FundWalletAdapter />
                  </div>
                </div>
              </div>
            </div>
              
            <div className='header-btm'>
              <img className="logo-img" src={logo} style={{width: "50px"}}/>
              <div style={{display: "inline", color: "#000", fontFamily: "Ysa", fontWeight: "bold", fontSize: "30px"}}>
                Vuena Wallet
              </div>
            </div>

          </div>
          
              { receiveOn &&
                <div className="receive-popup">
                  <div className='back-receive generate-btn btn' onClick={()=>{setReceiveOn(false)}}>X</div>
                  <Receive />
                </div>
              }

        </div>
      }
      {sendState &&
        <>
        </>
      }

    </>
  )
}

export default Dashboard