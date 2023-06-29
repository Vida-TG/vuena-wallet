import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as web3 from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import './css/createwallet.css'

import { encryptAccessPassword, encryptKeypair, saveWallet } from '../utils/utils';

const MATCHING = "Passwords match, you can continue"
const NO_MATCH = "Passwords not matching"
const INITIAL = "Set your password to continue"
const CreateWallet = () => {
    const [keypair, setKeypair] = useState(null);
    const [proxyKeypair, setProxyKeypair] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordsSame, setPasswordsSame] = useState(false);
    const [errors, setErrors] = useState(INITIAL)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mnemonics, setMnemonics] = useState(null);
    
    const navigate = useNavigate();


    async function handleGenerateWallet(){
        const mnemonic = bip39.generateMnemonic(256);
        const x = derivePath("m/44'/501'/0'/0'", bip39.mnemonicToSeedSync(mnemonic)).key;
        const y = derivePath("m/44'/501'/0'/1'", bip39.mnemonicToSeedSync(mnemonic)).key;
        setKeypair(web3.Keypair.fromSeed(x))
        setProxyKeypair(web3.Keypair.fromSeed(y))
        
        setMnemonics(mnemonic);
    }

    const handleContinue = async () => {
        let {encrypted, encryptedII, nonce, salt} = await encryptKeypair(keypair, proxyKeypair)
        let access = await encryptAccessPassword(password)
        saveWallet(encrypted, encryptedII, access, nonce, salt)
        navigate("/portfolio");
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      if (e.target.value == ""){
        setErrors(INITIAL)
        return
      }
      if (e.target.value === confirmPassword) {
        setPasswordsSame(true)
        setErrors(MATCHING)
      } else {
        setPasswordsSame(false)
        setErrors(NO_MATCH)
      }
  };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password == ""){
          setErrors(INITIAL)
          return
        }
        if (password === e.target.value) {
          setPasswordsSame(true)
          setErrors(MATCHING)
        } else {
          setPasswordsSame(false)
          setErrors(NO_MATCH)
        }
    };

    useEffect(() => {
        if (keypair !== null) {
        console.log(keypair);
        }
    }, [keypair, navigate]);

  return (
    <div className='blobs'>
        <div className="card">
        {!keypair ? (
        <>
          <div className="bottom-section">
            <span>SOLANA'S FIRST VAULT WALLET</span>
            <h1>Vuena</h1>
            <p>
              This password would be required to unlock your wallet anytime
              anytime it autolocks when you are away
            </p>
            <div className='form'>
              <input className='password-box'
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              <input className='password-box'
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <div className='errors'>{errors}</div>
                <div className='wrapper'>
                  <button className='generate-btn' disabled={passwordsSame} onClick={handleGenerateWallet}>New Wallet</button>
                  <button className='generate-btn' disabled={passwordsSame}>I have a Vuena wallet already</button>
                </div>
                <div className="last-message">
                  <h1>2x</h1>
                  <p>Data encryption, privacy</p>
                </div>
              </div>
          </div>
        </>
      ) : (
        <div>
          <p>Mnemonic: {mnemonics}</p>
          <p>Public Key: {keypair && keypair.publicKey.toBase58()}</p>
          <p>Proxy p.key: {proxyKeypair && proxyKeypair.publicKey.toBase58()}</p>
          <button onClick={handleContinue}>Continue</button>
        </div>
      )}       
        <img className="illustration-img" src="{}" alt="Trio"/>
      </div>
      <div className="star star-1"></div>
      <div className="star star-2"></div>
  </div>
  );
};

export default CreateWallet;
