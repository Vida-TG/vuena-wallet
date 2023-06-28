import { AES, enc } from 'crypto-js';
import * as web3 from '@solana/web3.js';
import { comparePassword, encryptSecretKeys, decryptSecretKeys, encryptPassword } from './crypto';

const LOCK_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function encryptKeypair(keypair, proxyKeypair) {
  const privateKeyString = keypair.secretKey.toString();
  const proxyPrivateKeyString = proxyKeypair.secretKey.toString();
  const { encrypted, encryptedII, nonce, salt } = await encryptSecretKeys(privateKeyString, proxyPrivateKeyString)
  
  return ({encrypted, encryptedII, nonce, salt});
}

export function decryptKeypair(encrypted, nonce, salt) {
  const decryptedPrivateKey = decryptSecretKeys(encrypted, salt, nonce)
  const privateKeyBytes = Uint8Array.from(JSON.parse('['+decryptedPrivateKey+']'));
  return web3.Keypair.fromSecretKey(privateKeyBytes);
}

export async function encryptAccessPassword(access) {
  return await encryptPassword(access)
}

export const setLockTimer = () => {
  // Set the lock expiration
  const lockExpiration = Date.now() + LOCK_TIMEOUT;
  localStorage.setItem('lockExpiration', lockExpiration.toString());
}

  
export const saveWallet = (
  encryptedPrivateKey,
  proxyEncryptedPrivateKey,
  access,
  nonce,
  salt
  ) => {

  const data = JSON.stringify(
    {
      'access': access,
      'encrypted': encryptedPrivateKey,
      'encryptedII': proxyEncryptedPrivateKey,
      'nonce': nonce,
      'salt': salt
    }
  )

  localStorage.setItem('data', data)
  setLockTimer()
    
  return true;
};


export const unlockWallet = (enteredPassword) => {
  let data = localStorage.getItem('data');
  data = JSON.parse(data)
  isMatch = comparePassword(enteredPassword, data.access)
  
  if (isMatch) {
    setLockTimer();
    return(true);
  } else {
    return false;
  }
};