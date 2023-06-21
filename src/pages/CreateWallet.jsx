import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as web3 from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

import { encryptKeypair } from '../utils/utils';

const CreateWallet = () => {
    const [keypair, setKeypair] = useState(null);
    const [password, setPassword] = useState('');
    const [mnemonics, setMnemonics] = useState(null);
    const navigate = useNavigate();


    async function handleGenerateWallet(){
        const mnemonic = bip39.generateMnemonic(256);
        const x = derivePath("m/44'/501'/0'/0'", bip39.mnemonicToSeedSync(mnemonic)).key;
        const keyp = web3.Keypair.fromSeed(x)
        const publicKey = keyp.publicKey.toBase58()
        setKeypair(keyp);
        setMnemonics(mnemonic);

        console.log(mnemonic)
    }

    const handleContinue = () => {
        let encryptedPrivateKey = encryptKeypair(keypair, password)
        saveWallet(encryptedPrivateKey, password)
        navigate("/portfolio");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (keypair !== null) {
        console.log(keypair);
        }
    }, [keypair, navigate]);

  return (
    <div>
      {!keypair ? (
        <>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={handleGenerateWallet}>Generate Wallet</button>
        </>
      ) : (
        <div>
          <p>Mnemonic: {mnemonics}</p>
          <p>Public Key: {keypair && keypair.publicKey.toBase58()}</p>
          <button onClick={handleContinue}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
