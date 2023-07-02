import React, { useState, useEffect } from 'react';
import {
  LAMPORTS_PER_SOL,
  PublicKey
} from '@solana/web3.js';
import { Elusiv, TokenType } from '@elusiv/sdk';
import { getParams } from '../utils/boilerplate'
import { decryptKeypair } from '../utils/utils';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";



export const sendAnonymously = async (address, amount, keyPair) => {
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

    return true;
  } catch (error) {
    return false;
  }
};



function SendComponent() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const { publicKey, connected } = useWallet();

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
      await sendAnonymously(address, amount, keyPair);
      alert(`You successfully sent ${amount} SOL to ${address}`);
    } catch (error) {
      console.error('Error sending SOL:', error);
      alert('Failed to send SOL. Please try again.');
    }
  };

  useEffect(() => {
    if (connected) {
        setAddress(publicKey.toBase58())
    }
  }, [connected]);

  return (
    <div>
      <p style={{fontSize: "large"}}>Send Solana</p>
      <div>
        <WalletMultiButton />
        <label>Recipient Address:</label>
        <div className="amount-form">    
                        <input className='generate-box'
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={handleAddressChange}
                        />
                        <input className='generate-box'
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={handleAmountChange}
                        />
            <button className="generate-btn btn" onClick={handleSend}>Send</button>
        </div>
        
      </div>
    </div>
  );
}

export default SendComponent;
