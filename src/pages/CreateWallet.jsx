import React, { useEffect, useState } from 'react';
import logo from './images/logo.png'
import { useNavigate } from 'react-router-dom';
import * as web3 from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { FaAngleLeft, FaFileDownload, FaLock, FaCopy } from 'react-icons/fa';
import helpSVG from './images/helpus.svg'
import importSVG from './images/import-w.svg'

import './css/createwallet.css'

import { encryptAccessPassword, encryptKeypair, saveWallet } from '../utils/utils';
import ImportWalletPage from './ImportMnemonics';
import { handleEncryptMnemonic } from './DownloadMnemonics';

const MATCHING = "Passwords match, you can continue"
const NO_MATCH = "Passwords not matching"
const INITIAL = "Set your password to continue"

const INITIAL_WARNING = "Set a secure password you would always remember"
const RECHECK_WARNING = "Check your password again; Are you sure?"
const DOWNLOADED_WARNING = "Do not forget your passphrase password"
const NEED_TO_DOWNLOAD_WARNING = "You need to download your passphrase first"
const CreateWallet = () => {
    const [keypair, setKeypair] = useState(null);
    const [proxyKeypair, setProxyKeypair] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordsSame, setPasswordsSame] = useState(false);
    const [popup, setPopup] = useState(false)
    const [importPopup, setImportPopup] = useState(false)
    const [copied, setCopied] = useState(false)
    const [errors, setErrors] = useState(INITIAL)
    const [warning, setWarning] = useState(INITIAL_WARNING)
    const [preDownload, setPreDownload] = useState(false)
    const [confirmedDownload, setConfirmedDownload] = useState(false)
    const [mnemonicsPassword, setMnemonicsPassword] = useState("")
    const [importPassword, setImportPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mnemonics, setMnemonics] = useState("");
    
    const navigate = useNavigate();


    async function handleGenerateWallet(){
        const mnemonic = bip39.generateMnemonic(256);
        const x = derivePath("m/44'/501'/0'/0'", bip39.mnemonicToSeedSync(mnemonic)).key;
        const y = derivePath("m/44'/501'/0'/1'", bip39.mnemonicToSeedSync(mnemonic)).key;
        setKeypair(web3.Keypair.fromSeed(x))
        setProxyKeypair(web3.Keypair.fromSeed(y))
        
        setMnemonics(mnemonic);
    }

      

    const handleDownloadPhrase = (e) => {
      if(preDownload) {
        handleEncryptMnemonic(mnemonics, mnemonicsPassword)
        setConfirmedDownload(true)
        setWarning(DOWNLOADED_WARNING)
      } else {
        if (mnemonicsPassword != "") {
          console.log(mnemonicsPassword)
          setPreDownload(true)
          setWarning(RECHECK_WARNING)
        } else {setWarning(INITIAL_WARNING)}
      }
    }

    const handleContinue = async () => {
      if (confirmedDownload) {
        let {encrypted, encryptedII, nonce, salt} = await encryptKeypair(keypair, proxyKeypair)
        let access = await encryptAccessPassword(password)
        saveWallet(encrypted, encryptedII, access, nonce, salt)
        navigate("/portfolio");
      } else {setWarning(NEED_TO_DOWNLOAD_WARNING)}
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

    const handleCopy = () => {
      navigator.clipboard.writeText(mnemonics)
      setCopied(true)
    }
    const back = () => {
      setKeypair(null)
      setCopied(false)
    }
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
          
            { !importPopup &&
          
            <>
              <div className="top-section">
                <div className="top-left-section">
                  <img className="logo-img" src={logo}/>
                </div>
              </div>
              <div className="bottom-section">
                <span>SOLANA'S FIRST VAULT WALLET</span>
                <h1>Vuena</h1>
              </div>
              <p>
                This password would be required to unlock your wallet anytime
                it autolocks when you are away
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
                    <button className='generate-btn btn' disabled={!passwordsSame} onClick={handleGenerateWallet}>New Wallet</button>
                    <button className='generate-btn btn' disabled={!passwordsSame} onClick={()=>{setImportPopup(true)}}>I have a Vuena wallet already</button>
                  </div>
              </div>
              
              <div className="last-message">
                  <h1>2x</h1>
                  <p>Data encryption, privacy</p>
                </div>
              </>
              }

              { importPopup &&
                <div className="mnemonics">
                  <div className='back-btn btn' onClick={()=>{setImportPopup(false)}}><FaAngleLeft style={{fontSize: "25px"}}/></div>
                  <div>Wanna import? Only Vuena wallets are allowed</div>
                  <input className='password-box-2'
                    type="text"
                    placeholder="Input your passphrase passcode"
                    value={importPassword}
                    onChange={(e) => {setImportPassword(e.target.value)}}
                  />
                  <ImportWalletPage inputPassword={importPassword} unlockPassword={password}/>
                  <img className="illustration-img" src={importSVG} style={{opacity: ".1"}} alt="Import securely"/>
                </div>
              }
        </>
      ) : (
          <div>
            { !popup &&
            <div className='mnemonics'>
              <div className='back-btn btn' onClick={back}><FaAngleLeft style={{fontSize: "25px"}}/></div>
              <h1>{mnemonics}</h1>
              <button className='generate-btn btn' onClick={handleCopy}>{ copied ? "Copied" : "Copy to clipboard"} <FaCopy/></button>
              <button className='generate-btn btn' onClick={()=>{setPopup(true)}}>Help us keep you safe <FaLock /></button>
            </div>
            }

            { popup &&
            <div className="mnemonics">
              <div className='back-btn btn' onClick={()=>{setPopup(false)}}><FaAngleLeft style={{fontSize: "25px"}}/></div>
              <h1>Passphrase passcode</h1>
              <input className='password-box-2'
                type="text"
                placeholder="Make sure you don't forget this passcode"
                value={mnemonicsPassword}
                onChange={(e) => {setMnemonicsPassword(e.target.value); setPreDownload(false); setWarning(INITIAL_WARNING)}}
              />
              <div className='download-warnings'>{warning}</div>
              <button className='generate-btn btn' onClick={handleDownloadPhrase}>Download encrypted passphrase <FaFileDownload /></button>
              <button className='generate-btn btn' onClick={handleContinue}>Continue</button>
            </div>
            }
          </div>
      )}       
        {!keypair && !importPopup ? (<img className="illustration-img" src={helpSVG} style={{opacity: ".6"}} alt="Help us"/>) : <div></div>}
      </div>

      
      
    </div>
  );
};

export default CreateWallet;
