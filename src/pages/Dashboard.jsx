import React from 'react'
import decryptKeypair from '../utils/utils'

const Dashboard = () => {
    const [kP, setkP] = React.useState(null)
    
    useEffect(() => {
        const encryptedPrivateKey = localStorage.getItem('encryptedPrivateKey');
        const storedPassword = localStorage.getItem('password');

        // Decrypt the keypair
        const decryptedKeypair = decryptKeypair(encryptedPrivateKey, storedPassword);
        setkP(decryptedKeypair);
        
    }, []);

  return (
    <>
        <div>Dashboard</div>
        <div>{kP}</div>
    </>
  )
}

export default Dashboard