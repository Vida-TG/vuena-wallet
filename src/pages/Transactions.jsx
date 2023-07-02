import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

function TransactionHistory({ publicKey }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const connection = new Connection('https://api.devnet.solana.com');
        const transactionHistory = await connection.getConfirmedSignaturesForAddress2(
          new PublicKey(publicKey),
          { limit: 10 } // Fetch the last 10 transactions
        );
        const sortedTransactions = transactionHistory.reverse(); // Reverse the array to display recent transactions first
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    fetchTransactions();
  }, [publicKey]);

  return (
    <div>
      <h2>Recent Vault Transactions</h2>
      { transactions.length > 0 ?
        transactions.map((transaction) => (
          <div key={transaction.signature}>
            <p style={{fontFamily: "Ysa Light"}}>Signature: {transaction.signature}</p>
          </div>
        ))
          :
        <div>No transaction yet, request an airdrop</div>
      }
    </div>
  );
}

export default TransactionHistory;
