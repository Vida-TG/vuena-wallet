import { Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';

const CONNECTION_URL = 'https://api.devnet.solana.com'

export async function sendSol(recipientAddress, amount, keypair) {
    try {
      const connection = new Connection(CONNECTION_URL);

      const instruction = SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: amount * 1000000000,
      });


      const transaction = new Transaction().add(instruction);

      transaction.sign(keypair);

      const signature = await connection.sendTransaction(transaction);

      console.log('Transaction sent:', signature);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  
}


export const updateBalance = async (publicKey) => {
    const connection = new Connection(CONNECTION_URL);
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / 1000000000); 
    } catch (error) {
      console.error('Error retrieving balance:', error);
    }

    return (balance / 1000000000)
  };
