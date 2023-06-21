import React, { useEffect } from 'react'
import { decryptKeypair } from '../utils/utils'
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
    }, []);

  return (
    <>
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
    </>
  )
}

export default Dashboard