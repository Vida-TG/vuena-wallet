import React, { useEffect } from 'react'
import { decryptKeypair } from '../utils/utils'
<<<<<<< HEAD
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
=======
import { sendSol, updateBalance } from '../utils/sendToken'

const Dashboard = () => {
  const [kP, setkP] = React.useState(null)
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0)

  const handleRecipientAddressChange = (event) => {
    setRecipientAddress(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSendTokens = async () => {
    await sendSol(recipientAddress, amount, kP);
  };




    useEffect(() => {
      const encryptedPrivateKey = localStorage.getItem('encryptedPrivateKey');
      const storedPassword = localStorage.getItem('password');

      // Decrypt the keypair
      const decryptedKeypair = decryptKeypair(encryptedPrivateKey, storedPassword);
      setkP(decryptedKeypair);
        
      const getBl = async (pk) => {
        setBalance(await updateBalance(pk));
      }
      const publicKey = new PublicKey(kP.publicKey.toBase58());
      getBl(publicKey);
>>>>>>> 5771b87e36a3119762c9f4e86a805b125edd9b97
    }, []);

  return (
    <>
<<<<<<< HEAD
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

=======
        <div>Vuena</div>
        <div>{kP && kP.publicKey.toBase58()}</div>
        
        


        <p>Balance: {balance} SOL</p>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={handleRecipientAddressChange}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <button onClick={handleSendTokens}>Send Tokens</button>
        <button onClick={handleAirdrop}>Airdrop</button>


        <button>Send privately</button>
>>>>>>> 5771b87e36a3119762c9f4e86a805b125edd9b97
    </>
  )
}

export default Dashboard