import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

import React from 'react'

const Encrypt = () => {

// Function to encrypt a password by salting it using bcrypt
async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    console.log("Salt", salt)
  // Hash the password with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

// Function to compare a password with its encrypted version
async function comparePassword(password, encryptedPassword) {
  const isMatch = await bcrypt.compare(password, encryptedPassword);
  return isMatch;
}

// Function to encrypt a seed phrase with a nonce (IV)
function encryptSeedPhrase(seedPhrase, password) {
  const nonce = CryptoJS.lib.WordArray.random(16); // Generate a random nonce (IV)

  // Encrypt the seed phrase using AES with the password and nonce
  const encrypted = CryptoJS.AES.encrypt(seedPhrase, password, {
    iv: nonce,
  });

  return {
    encryptedSeedPhrase: encrypted.toString(),
    nonce: nonce.toString(),
  };
}

// Function to decrypt a seed phrase that was encrypted with a nonce
function decryptSeedPhrase(encryptedSeedPhrase, password, nonce) {
  // Decrypt the seed phrase using AES with the password and nonce
  const decrypted = CryptoJS.AES.decrypt(encryptedSeedPhrase, password, {
    iv: CryptoJS.enc.Hex.parse(nonce),
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}






function example () {
// Usage examples
const password = 'myPassword';

// Encrypt the password
encryptPassword(password).then((encryptedPassword) => {
  console.log('Encrypted Password:', encryptedPassword);

  // Compare the password with its encrypted version
  comparePassword(password, encryptedPassword).then((isMatch) => {
    console.log('Password Match:', isMatch);
  });
});

async function gg () {
    let encryptedPassword = await encryptPassword(password)
    console.log(await comparePassword(password, encryptedPassword))
}
gg()
const seedPhrase = 'example seed phrase';

// Encrypt the seed phrase
const encryptedSeedPhrase = encryptSeedPhrase(seedPhrase, password);
console.log('Encrypted Seed Phrase:', encryptedSeedPhrase.encryptedSeedPhrase);
console.log('Nonce:', encryptedSeedPhrase.nonce);

// Decrypt the seed phrase
const decryptedSeedPhrase = decryptSeedPhrase(
  encryptedSeedPhrase.encryptedSeedPhrase,
  password,
  encryptedSeedPhrase.nonce
);
console.log('Decrypted Seed Phrase:', decryptedSeedPhrase);

}

return (
    <button onClick={example}>Encccc</button>
  )
}

export default Encrypt