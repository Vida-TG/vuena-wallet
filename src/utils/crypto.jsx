import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

export async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function comparePassword(password, encryptedPassword) {
  const isMatch = await bcrypt.compare(password, encryptedPassword);
  return isMatch;
}


export async function encryptSecretKeys(secretKey, proxySecretKey) {
  const nonce = CryptoJS.lib.WordArray.random(16);
  let salt = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(secretKey, salt, {
    iv: nonce,
  });
  const encryptedII = CryptoJS.AES.encrypt(proxySecretKey, salt, {
    iv: nonce,
  });

  
  return {
    encrypted: encrypted.toString(),
    encryptedII: encryptedII.toString(),
    nonce: nonce.toString(),
    salt: salt
  };
}


export function decryptSecretKeys(encryptedSecretKey, salt, nonce) {
  const decrypted = CryptoJS.AES.decrypt(encryptedSecretKey, salt, {
    iv: CryptoJS.enc.Hex.parse(nonce),
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

