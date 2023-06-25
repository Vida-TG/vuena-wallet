//Fund with walletadapter
import React, { useState } from 'react';
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletAdapterNetwork, WalletConnection } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { getParams } from './boilerplate';

const FundKeypair = () => {
  const [connection, setConnection] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [funded, setFunded] = useState(false);

  // Function to handle connecting the wallet
  const handleConnectWallet = async () => {
    const network = WalletAdapterNetwork.Devnet; // Adjust network based on your requirements
    const walletConnection = new WalletConnection(network);
    await walletConnection.connect();

    setConnectedWallet(walletConnection);
    setConnection(new Connection(network.url));
  };

  // Function to handle funding the browser's keypair
  const handleFundKeypair = async () => {
    if (!connectedWallet) {
      alert('Please connect your wallet first.');
      return;
    }

    const { elusiv, keyPair } = await getParams();
    const lamports = 1 * LAMPORTS_PER_SOL; // Adjust the funding amount based on your requirements

    // Build the top-up transaction
    const topupTx = await elusiv.buildTopUpTx(lamports, 'LAMPORTS');

    // Sign and send the transaction
    const signedTx = await connectedWallet.signTransaction(topupTx.tx);
    const { signature } = await connection.sendRawTransaction(signedTx.serialize());

    console.log(`Top-up transaction sent with signature: ${signature}`);
    setFunded(true);
  };

  return (
    <div>
      <h1>Fund Keypair</h1>
      <WalletDialogButton onClick={handleConnectWallet} />

      {connectedWallet && (
        <div>
          <p>Connected Wallet: {connectedWallet.publicKey.toBase58()}</p>
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
