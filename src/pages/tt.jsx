import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, Connection } from "@solana/web3.js";
import { decryptKeypair } from '../utils/utils';

export default function Tt() {
    const DEVNET_RPC_URL = 'https://api.devnet.solana.com'
    const conn = new Connection(DEVNET_RPC_URL);
    const [ funded, setFunded ] = useState(false)
    const [ balance, setBalance ] = useState(false)

    const connection = useConnection()
    const { publicKey, signTransaction, connected } = useWallet();
    
    const walletBalance = async () => {
        const bal = await conn.getBalance(publicKey);
        setBalance(bal)
    }


    // Function to handle funding the browser's keypair
    const handleFundKeypair = async () => {
        if (!connected) {
            alert('Please connect your wallet first.');
        return;
        }

        const encryptedPrivateKey = localStorage.getItem('encrypted');
        const storedPassword = localStorage.getItem('password');

        // Decrypt the keypair
        const decryptedKeypair = decryptKeypair(encryptedPrivateKey, storedPassword);
        const lamports = 1 * LAMPORTS_PER_SOL; // Adjust the funding amount based on your requirements
        // Create an empty transaction
        const transaction = new Transaction();

        // Add a System Program instruction to transfer lamports to the keypair's public key
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: decryptedKeypair.publicKey,
                lamports,
            })
        );

        const blockHash = await conn.getRecentBlockhash()
        transaction.feePayer = await publicKey;
        transaction.recentBlockhash = await blockHash.blockhash;
        
        console.log(`1`);
        // Sign the transaction using the connected wallet
        const signedTransaction = await signTransaction(transaction);
        
        console.log(`11`);
        // Send the signed transaction
        const { signature } = await connection.sendRawTransaction(signedTransaction.serialize());

        console.log(`Top-up transaction sent with signature: ${signature}`);
        walletBalance()
        setFunded(true);
    };

    useEffect(() => {
        if (connected) {
            walletBalance()
        }
    }, [connected, balance]);

    return (
        <>
            <WalletMultiButton /><div>{balance}sol</div>
            <button onClick={handleFundKeypair}>Receive</button>
        </>
    );
}
