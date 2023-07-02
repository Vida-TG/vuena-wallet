// Fund with walletadapter
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, Connection } from "@solana/web3.js";
import { decryptKeypair } from '../utils/utils';

export default function FundKeypairII() {
    const DEVNET_RPC_URL = 'https://api.devnet.solana.com'
    const LARGE_AMOUNT = "You don't have up to that amount in the connected wallet"
    const INVALID_AMOUNT = "Invalid input"
    const conn = new Connection(DEVNET_RPC_URL);
    const [ funded, setFunded ] = useState(false)
    const [ balance, setBalance ] = useState(false)
    const [ amount, setAmount ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ valid, setValid ] = useState(false)

    const connection = useConnection()
    const { publicKey, signTransaction, connected } = useWallet();
    
    const walletBalance = async () => {
        const bal = await conn.getBalance(publicKey);
        setBalance(bal)
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
        if (Number(e.target.value) > Number(balance)){
            setMessage(LARGE_AMOUNT)
            setValid(false)
        } else if (Number(e.target.value) < 0) {
            setMessage(INVALID_AMOUNT)
            setValid(false)
        } else {
            setMessage("")
            setValid(true)
        }
    }
    // Function to handle funding the browser's keypair
    const handleFundKeypair = async () => {
        if (!connected) {
            alert('Please connect your wallet first.');
            return;
        }
        if (!valid) {
            alert('Please correct the errors first');
            return;
        }

        let data = localStorage.getItem('data');
        data = JSON.parse(data)
        const decryptedKeypair = decryptKeypair(data.encryptedII, data.nonce, data.salt);
        console.log(decryptedKeypair)

        const lamports = amount * LAMPORTS_PER_SOL; 
        
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
        
        // Sign the transaction using the connected wallet
        const signedTransaction = await signTransaction(transaction);
        
        // Send the signed transaction
        
        const connect = new Connection('https://api.devnet.solana.com');
        const { signature } = await connect.sendRawTransaction(signedTransaction.serialize());

        alert(`Your vault has been funded successfully`);
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
            <div>
            <h5>You can also fund from external wallets</h5>
            <WalletMultiButton />
            { connected ?
                <div>
                    <h5>Wallet balance: {balance/LAMPORTS_PER_SOL} Sol</h5>
                    <div className="amount-form">    
                        <input className='amount-box'
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <button className="amount-btn btn" onClick={handleFundKeypair}>Fund public wallet</button>
                    </div>
                    <div style={{height: "40px", color: "red", fontSize: "small", fontWeight: "bolder"}}>{message}</div>
                    </div>
            :
            <></>
            }
            </div>
        </>
    );
}
