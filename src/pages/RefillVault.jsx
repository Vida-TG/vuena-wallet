import React from 'react'
import { updateBalance } from '../utils/sendToken'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { decryptKeypair } from '../utils/utils';
import { sendAnonymously } from './Send';

const RefillVault = () => {
    let data = localStorage.getItem('data');
    data = JSON.parse(data)

    const refill = async () => {
        const decryptedKeypairI = decryptKeypair(data.encrypted, data.nonce, data.salt);
        const decryptedKeypairII = decryptKeypair(data.encryptedII, data.nonce, data.salt);
        const BALANCE = updateBalance(decryptedKeypairII)

        try {
            await sendAnonymously(decryptedKeypairI.publicKey.toBase58(), BALANCE * LAMPORTS_PER_SOL, decryptedKeypairII);
            alert(`You successfully refilled your vault`);
          } catch (error) {
            console.error('Error sending SOL:', error);
            alert('Failed to refill. Please try again.');
          }
    }

    return (
        <button className='refill btn' onClick={refill}>Refill vault</button>
    )
}

export default RefillVault