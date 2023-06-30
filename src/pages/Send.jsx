import React, { useState, useEffect } from 'react';
import {
  LAMPORTS_PER_SOL,
  PublicKey
} from '@solana/web3.js';
import { Elusiv, TokenType } from '@elusiv/sdk';
import { getParams } from '../utils/boilerplate'
import { decryptKeypair } from '../utils/utils';

function SendComponent() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  let data = localStorage.getItem('data');
  data = JSON.parse(data)
  const keyPair = decryptKeypair(data.encrypted, data.nonce, data.salt);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSend = async () => {
    try {
      const { elusiv } = await getParams(keyPair);

      // Top up the user's account
      console.log('Initiating top-up...');
      const sendAmount = parseFloat(amount) * LAMPORTS_PER_SOL;
      const topupTxData = await elusiv.buildTopUpTx(sendAmount, 'LAMPORTS');
      console.log('Top-up complete.');

      // Send tokens to the specified address
      console.log('Initiating send...');
      const recipient = new PublicKey(address);

      topupTxData.tx.partialSign(keyPair);
      const storeSig = await elusiv.sendElusivTx(topupTxData);
      console.log("11.11")
      // Send SOL, privately 
      const sendTx = await elusiv.buildSendTx(0.05 * LAMPORTS_PER_SOL, recipient, 'LAMPORTS');
      console.log("11.111")
      const sendSig = await elusiv.sendElusivTx(sendTx);

      console.log('Ta-da!');
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
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
