//Fund walletadapter
import React, { useState } from 'react';
import { Connection, PublicKey, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletAdapterNetwork, WalletConnection } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { getParams } from '../utils/boilerplate';

const SendSOL = () => {
  const [connection, setConnection] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');

  // Function to handle connecting the wallet
  const handleConnectWallet = async () => {
    const network = WalletAdapterNetwork.Devnet; // Adjust network based on your requirements
    const walletConnection = new WalletConnection(network);
    await walletConnection.connect();

    setConnectedWallet(walletConnection);
    setConnection(new Connection(network.url));
  };

  // Function to handle sending SOL
  const handleSendSOL = async () => {
    if (!connectedWallet) {
      alert('Please connect your wallet first.');
      return;
    }

    if (!destinationAddress || !amount) {
      alert('Please provide destination address and amount.');
      return;
    }

    const { elusiv, keyPair } = await getParams();
    const publicKey = new PublicKey(destinationAddress);
    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

    // Build the send transaction
    const sendTx = await elusiv.buildSendTx(lamports, publicKey, 'LAMPORTS');

    // Sign and send the transaction
    const signedTx = await connectedWallet.signTransaction(sendTx.tx);
    const { signature } = await connection.sendRawTransaction(signedTx.serialize());
    
    console.log(`Transaction sent with signature: ${signature}`);
  };

  return (
    <div>
      <h1>Send SOL</h1>
      <WalletDialogButton onClick={handleConnectWallet} />
      
      {connectedWallet && (
        <div>
          <p>Connected Wallet: {connectedWallet.publicKey.toBase58()}</p>
          <input type="text" placeholder="Destination Address" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button onClick={handleSendSOL}>Send SOL</button>
        </div>
      )}
    </div>
  );
};

export default SendSOL;
