import React from 'react'
import * as web3 from '@solana/web3.js';
import * as nacl from 'tweetnacl';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

const CreateWallet = () => {


    async function createWallet(){
        const mnemonic = bip39.generateMnemonic(256);
        const x = derivePath("m/44'/501'/0'/0'", bip39.mnemonicToSeedSync(mnemonic)).key;
        const pk = nacl.sign.keyPair.fromSeed(x).secretKey;
        const acc = new web3.Account(pk);
        
        console.log (
            `address: ${acc.publicKey.toBase58()}`, 
            `${pk}: pk`,
            `${mnemonic}: mnemonic`
        )
    }
    

  return (
    <>
        <button onClick={createWallet}>CreateWallet</button>
    </>
  )
}

export default CreateWallet