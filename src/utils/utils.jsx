
import * as web3 from '@solana/web3.js';
import * as nacl from 'tweetnacl';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';





export async function generateWallet(){
    const mnemonic = bip39.generateMnemonic(256);
    const x = derivePath("m/44'/501'/0'/0'", bip39.mnemonicToSeedSync(mnemonic)).key;
    const privateKey = nacl.sign.keyPair.fromSeed(x).secretKey;
    const account = new web3.Account(privateKey);
    
    console.log (
        `address: ${account.publicKey.toBase58()}`, 
        `${privateKey}: pk`,
        `${mnemonic}: mnemonic`
    )
}
