import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import * as web3 from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { FaFileExport } from 'react-icons/fa';
import { encryptAccessPassword, encryptKeypair, saveWallet } from '../utils/utils';

import { comparePassword } from '../utils/crypto';

function ImportWalletPage({inputPassword, unlockPassword}) {
    const [importedMnemonic, setImportedMnemonic] = useState('');
    const [importedPassword, setImportedPassword] = useState('');
    const [keypair, setKeypair] = useState('');
    const [proxyKeypair, setProxyKeypair] = useState('');

    console.log("1", inputPassword, unlockPassword)
    const navigate = useNavigate();

    async function handleImportedWallet(){
      if(comparePassword(importedPassword, inputPassword)) {
        console.log("uuu", importedMnemonic, importedPassword)
        const bytes = CryptoJS.AES.decrypt(importedMnemonic, inputPassword);
        const decryptedMnemonic = CryptoJS.enc.Utf8.stringify(bytes);
        console.log("pppp", decryptedMnemonic)
        await handleImportWallet(decryptedMnemonic)
      }
    }

    async function handleImportWallet(mnemonic){
        const x = derivePath("m/44'/501'/0'/0'", bip39.mnemonicToSeedSync(mnemonic)).key;
        const y = derivePath("m/44'/501'/0'/1'", bip39.mnemonicToSeedSync(mnemonic)).key;
        setKeypair(web3.Keypair.fromSeed(x))
        setProxyKeypair(web3.Keypair.fromSeed(y))
        console.log(x, y, keypair, proxyKeypair)
        let {encrypted, encryptedII, nonce, salt} = await encryptKeypair(keypair, proxyKeypair)
        let access = await encryptAccessPassword(unlockPassword)
        saveWallet(encrypted, encryptedII, access, nonce, salt)
        navigate("/portfolio");
    }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    console.log("11", inputPassword, unlockPassword)

    reader.onload = async (e) => {
    console.log("111", inputPassword, unlockPassword)
      const fileContent = e.target.result;
      const { cleanMnemonic, cleanPassword } = parseContentFromFile(fileContent);
      console.log(cleanMnemonic)
      setImportedMnemonic(cleanMnemonic)
      setImportedPassword(cleanPassword)
    };

    reader.readAsText(file);
  };

  const parseContentFromFile = (fileContent) => {
    const lines = fileContent.split('\n');
    const mnemonicLine = lines.find((line) => line.startsWith('DataHashedI:'));
    const passwordLine = lines.find((line) => line.startsWith('DataHashedII:'));
    const cleanMnemonic = mnemonicLine ? mnemonicLine.replace('DataHashedI:', '').trim() : '';
    const cleanPassword = passwordLine ? passwordLine.replace('DataHashedII:', '').trim() : '';
    return { cleanMnemonic, cleanPassword };
  };

  return (
    <div>
        <input className='generate-btn btn' type="file" accept=".vuena" onChange={handleFileChange} />
        <button className='generate-btn btn' onClick={handleImportedWallet}>Import<FaFileExport /></button>
    </div>
  );
}

export default ImportWalletPage;
