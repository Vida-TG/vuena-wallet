import { AES, enc } from 'crypto-js';
import * as web3 from '@solana/web3.js';

const LOCK_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export function encryptKeypair(keypair, proxyKeypair, password) {
  const privateKeyString = keypair.secretKey.toString();
  const encryptedPrivateKey = AES.encrypt(privateKeyString, password).toString();

  const proxyPrivateKeyString = proxyKeypair.secretKey.toString();
  const proxyEncryptedPrivateKey = AES.encrypt(proxyPrivateKeyString, password).toString();
  console.log({encryptedPrivateKey, proxyEncryptedPrivateKey})
  return ({encryptedPrivateKey, proxyEncryptedPrivateKey});
}

export function decryptKeypair(encryptedPrivateKey, password) {
  const decryptedPrivateKey = AES.decrypt(encryptedPrivateKey, password).toString(enc.Utf8);
  const privateKeyBytes = Uint8Array.from(JSON.parse('['+decryptedPrivateKey+']'));
  return web3.Keypair.fromSecretKey(privateKeyBytes);
}






export const setLockTimer = () => {
    // Set the lock expiration
    const lockExpiration = Date.now() + LOCK_TIMEOUT;
    localStorage.setItem('lockExpiration', lockExpiration.toString());
}

  
export const saveWallet = (encryptedPrivateKey, proxyEncryptedPrivateKey, password) => {

    // Save the encrypted keypair and password in localStorage
    localStorage.setItem('encrypted', encryptedPrivateKey);
    localStorage.setItem('encryptedII', proxyEncryptedPrivateKey);
    localStorage.setItem('password', password);

    setLockTimer()
    
    return true;
  };



  export const unlockWallet = (enteredPassword) => {
    const storedPassword = localStorage.getItem('password');
  
    if (enteredPassword === storedPassword) {
        setLockTimer();
        return(true);
    } else {
        return false;
    }
  };