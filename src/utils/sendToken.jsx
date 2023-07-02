import { Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
const CONNECTION_URL = 'https://api.devnet.solana.com'



export async function sendSol(recipientAddress, amount, keypair) {
    
    try {
      const connection = new Connection(CONNECTION_URL, "confirmed");
      console.log(recipientAddress)
      console.log(amount)
      console.log(keypair)
      // Fetch the recent blockhash
      const { blockhash } = await connection.getRecentBlockhash();
  
      const instruction = SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: parseInt(amount) * 1000000000,
      });
      console.log("1")
      const transaction = new Transaction().add(instruction);
      console.log("2")
      // Set the recent blockhash in the transaction
      transaction.recentBlockhash = blockhash;
      console.log("3")
      // Sign the transaction using the keypair
    try {
        transaction.sign(keypair);
    } catch (error) {
        console.error('Error signing keypair:', error);
    }
    console.log("4")
    // Send the transaction to the Solana network
    const signature = await connection.sendTransaction(transaction);
    console.log('Transaction sent:', signature);
      

      console.log('Transaction sent:', signature);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  }
  
  
  export const implementAirdrop = async (keypair) => {
    try {
      const connection = new Connection(CONNECTION_URL);
  
      const publicKey = new PublicKey(keypair.publicKey.toBase58());
  
      await connection.requestAirdrop(publicKey, 1 * 1000000000);
  
      console.log('Airdrop successful!');
      return true;
    } catch (error) {
      console.error('Error requesting airdrop:', error);
      return false;
    }
  };
  

  

  export const updateBalance = async (keypair) => {
    const connection = new Connection(CONNECTION_URL);
    try {
        const publicKey = new PublicKey(keypair?.publicKey.toBase58());
        const balance = await connection.getBalance(publicKey);

        return(balance / 1000000000)
    }   catch (error) {
        console.error('Error retrieving balance:', error);
    }
  };