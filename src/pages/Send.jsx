import React, { useState, useEffect } from 'react';
import {
  LAMPORTS_PER_SOL,
  Connection,
} from '@solana/web3.js';
import { Elusiv, TokenType } from '@elusiv/sdk';
import { getParams } from './boilerplate.jsx';
import { decryptKeypair } from '../utils/utils';

function SendComponent() {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');

  
    const encryptedPrivateKey = localStorage.getItem('encryptedPrivateKey');
    const storedPassword = localStorage.getItem('password');

    const keyPair = decryptKeypair(encryptedPrivateKey, storedPassword);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSend = async () => {
    try {
      const { elusiv, conn } = await getParams(keyPair);

      // Top up the user's account
      console.log('Initiating top-up...');
      await topup(elusiv, keyPair, LAMPORTS_PER_SOL, 'LAMPORTS');
      console.log('Top-up complete.');

      // Send tokens to the specified address
      console.log('Initiating send...');
      const recipientPublicKey = new PublicKey(address);
      const sendAmount = parseFloat(amount) * LAMPORTS_PER_SOL;

      const signature = await send(elusiv, recipientPublicKey, sendAmount, 'LAMPORTS');
      console.log(`Send complete with signature ${signature.signature}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const topup = async (elusivInstance, keyPair, amount, tokenType) => {
    const topupTx = await elusivInstance.buildTopUpTx(amount, tokenType);
    topupTx.tx.partialSign(keyPair);
    return elusivInstance.sendElusivTx(topupTx);
  };

  const send = async (elusivInstance, recipient, amount, tokenType) => {
    const sendTx = await elusivInstance.buildSendTx(amount, recipient, tokenType);
    return elusivInstance.sendElusivTx(sendTx);
  };

  useEffect(() => {
    getParams(); // Fetch the connection, keyPair, and elusiv instance on component mount
  }, []);

  return (
    <div>
      <h1>Send Tokens</h1>
      <div>
        <label>Recipient Address:</label>
        <input type="text" value={address} onChange={handleAddressChange} />
      </div>
      <div>
        <label>Amount to Send:</label>
        <input type="text" value={amount} onChange={handleAmountChange} />
      </div>
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default SendComponent;
