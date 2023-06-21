
import * as web3 from '@solana/web3.js';
import * as nacl from 'tweetnacl';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';





export async function generateWallet(){
    const mnemonic = bip39.generateMnemonic(256);
    const x = derivePath("m/44'/501'/0'/0'", bip39.mnemonicToSeedSync(mnemonic)).key;
    const privateKey = nacl.sign.keyPair.fromSeed(x).secretKey;
    const account = new web3.Account(privateKey);

    let privateKeySerialized = privateKey.toString()
    let publicKeySerialized = account.publicKey.toBase58()
    

    const encryptionKey = new Uint8Array(32);
    window.crypto.getRandomValues(encryptionKey);
    

    // Encrypt the private key using the encryption key
    const encryptedPrivateKey = nacl.secretbox(
        nacl.util.decodeUTF8(privateKeySerialized),
        encryptionKey
    );
    console.log(encryptedPrivateKey)
    return (
        privateKeySerialized, publicKeySerialized
    )
}






// Encrypt and store the user's keypair
export function encryptAndStoreKeypair(privateKeySerialized, publicKeySerialized) {
  // Generate a random encryption key
  const encryptionKey = new Uint8Array(32);
  window.crypto.getRandomValues(encryptionKey);
  

  // Encrypt the private key using the encryption key
  const encryptedPrivateKey = nacl.secretbox(
    nacl.util.decodeUTF8(privateKeySerialized),
    encryptionKey
  );

  // Store the encrypted private key, public key, and encryption key in memory
  sessionStorage.setItem('encryptedPrivateKey', nacl.util.encodeBase64(encryptedPrivateKey));
  sessionStorage.setItem('publicKey', publicKeySerialized);
  sessionStorage.setItem('encryptionKey', nacl.util.encodeBase64(encryptionKey));

  console.log(`Keypair encrypted and stored in memory: ${encryptedPrivateKey}`);
}

// Decrypt the private key for transaction
function decryptPrivateKey() {
  // Retrieve the encrypted private key, public key, and encryption key from memory
  const encryptedPrivateKey = nacl.util.decodeBase64(sessionStorage.getItem('encryptedPrivateKey'));
  const publicKey = sessionStorage.getItem('publicKey');
  const encryptionKey = nacl.util.decodeBase64(sessionStorage.getItem('encryptionKey'));

  // Decrypt the private key using the encryption key
  const decryptedPrivateKey = nacl.secretbox.open(encryptedPrivateKey, encryptionKey);

  // Perform the transaction using the private key and public key
  performTransaction(decryptedPrivateKey, publicKey);
}
