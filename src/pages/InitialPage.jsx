import React from 'react'
import Dashboard from './Dashboard';
import UnlockWallet from './UnlockWallet';
import CreateWallet from './CreateWallet';

const InitialPage = () => {
    
    useEffect(() => {
        const encryptedPrivateKey = localStorage.getItem('encryptedPrivateKey');
        const storedPassword = localStorage.getItem('password');
    
        if (encryptedPrivateKey && storedPassword) {
          // Check if the lock timer has expired
          const lockExpiration = localStorage.getItem('lockExpiration');
          if (lockExpiration && Date.now() < parseInt(lockExpiration)) {
            return <Dashboard />
          } else {
            return <UnlockWallet />
          }
        } else {
            //CREATE WALLET
            <CreateWallet />
        }
      }, []);


  return (
    
    <>
        <div>
            {!keypair && (
            <>
                <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                />
                <button onClick={handleGenerateWallet}>Generate Wallet</button>
            </>
            )}
            {keypair && (
            <div>
                <p>Mnemonic: {bip39.generateMnemonic()}</p>
                <p>Public Key: {keypair.publicKey.toBase58()}</p>
            </div>
            )}
        </div>
    </>
  )
}

export default InitialPage

