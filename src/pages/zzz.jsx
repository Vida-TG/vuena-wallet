//Fund with walletadapter
import React, { useState } from 'react';
import { Connection, LAMPORTS_PER_SOL, SystemProgram, Transaction  } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { getParams } from './boilerplate';
import { decryptKeypair } from '../utils/utils';

const FundKeypair = () => {
  const [connection, setConnection] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [funded, setFunded] = useState(false);

  // Function to handle connecting the wallet
  const handleConnectWallet = async () => {
    const { wallet, publicKey, connection } = await getConnectedWallet();
    setConnectedWallet(wallet);
    setConnection(connection);
  };

  // Function to retrieve the connected wallet
  const getConnectedWallet = async () => {
    const wallet = await window.solana.connect();
    const publicKey = wallet.publicKey;
    const connection = new Connection('https://api.devnet.solana.com'); // Adjust the network URL based on your requirements

    return { wallet, publicKey, connection };
  };

  // Function to handle funding the browser's keypair
  const handleFundKeypair = async () => {
    if (!connectedWallet) {
      alert('Please connect your wallet first.');
      return;
    }

    const encryptedPrivateKey = localStorage.getItem('encrypted');
    const storedPassword = localStorage.getItem('password');

    // Decrypt the keypair
    const decryptedKeypair = decryptKeypair(encryptedPrivateKey, storedPassword);
    const { elusiv } = await getParams(decryptedKeypair);
    const lamports = 1 * LAMPORTS_PER_SOL; // Adjust the funding amount based on your requirements
// Create an empty transaction
const transaction = new Transaction();

// Add a System Program instruction to transfer lamports to the keypair's public key
transaction.add(
  SystemProgram.transfer({
    fromPubkey: connectedWallet.publicKey,
    toPubkey: decryptedKeypair.publicKey,
    lamports,
  })
);

// Sign the transaction using the connected wallet
const signedTransaction = await connection.signTransaction(transaction);

// Send the signed transaction
const { signature } = await connection.sendRawTransaction(signedTransaction.serialize());

    console.log(`Top-up transaction sent with signature: ${signature}`);
    setFunded(true);
  };

  return (
    <div>
      <h1>Fund Keypair</h1>
      <WalletMultiButton onClick={handleConnectWallet} />

      {connectedWallet && (
        <div>
          <p>Connected Wallet: {connectedWallet.publicKey.toString()}</p>
          {!funded && (
            <button onClick={handleFundKeypair}>Fund Keypair</button>
          )}
          {funded && (
            <p>Keypair has been funded.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FundKeypair;
