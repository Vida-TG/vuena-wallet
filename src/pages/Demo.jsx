import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Elusiv } from '@elusiv/sdk';
import { decryptKeypair } from '../utils/utils';
import { getParams } from './boilerplate';
import { updateBalance } from '../utils/sendToken';


import React from 'react'

const Demo = () => {

    const demo1 = async () => {
        const encryptedPrivateKey = localStorage.getItem('encryptedPrivateKey');
        const storedPassword = localStorage.getItem('password');
        // Decrypt the keypair
        const decryptedKeypair = decryptKeypair(encryptedPrivateKey, storedPassword);



        // Create the elusiv instance
        const cluster = 'devnet';
        console.log("11")
        //const elusiv = await Elusiv.getElusivInstance(getParams.see, decryptedKeypair, connection, cluster);
        const { elusiv, conn } = await getParams(decryptedKeypair);
        // Top up our private balance with 1 SOL
        const topupTxData = await elusiv.buildTopUpTx(0.1 * LAMPORTS_PER_SOL, 'LAMPORTS');

        // Since this the topup, the funds still come from our original wallet. This is just
        // a regular Solana transaction in this case.

        //topupTxData.tx = signTx(topupTxData.tx);

        topupTxData.tx.partialSign(decryptedKeypair);
        console.log(await updateBalance(decryptedKeypair))
        const storeSig = await elusiv.sendElusivTx(topupTxData);
        console.log("11.11")
        // Send half a SOL, privately 
        let recipient = new PublicKey("GVPH3boqfMDEzi8wwqbJYmjVwKqgTk8KpCAK6sHD7f2R")
        const sendTx = await elusiv.buildSendTx(0.05 * LAMPORTS_PER_SOL, recipient, 'LAMPORTS');
        console.log("11.111")
        const sendSig = await elusiv.sendElusivTx(sendTx);

        console.log('Ta-da!');
    } 

  return (
    <button onClick={demo1}>Demo</button>
  )
}

export default Demo