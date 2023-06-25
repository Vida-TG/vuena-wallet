import React, { useEffect } from 'react';
import UnlockWallet from './UnlockWallet';
import CreateWallet from './CreateWallet';

const InitialPage = () => {
    const [ ePK, setEPK ] = React.useState(null)
    const [ pW, setPW ] = React.useState(null)

    useEffect(() => {
        const encryptedPrivateKey = localStorage.getItem('encrypted');
        const storedPassword = localStorage.getItem('password');
        
        if (encryptedPrivateKey && storedPassword) {
            setEPK(encryptedPrivateKey);
            setPW(storedPassword);
        }
            
      }, []);


  return (
    <>
        { ePK && pW ? <UnlockWallet /> : <CreateWallet /> }
    </>
  )
}

export default InitialPage

