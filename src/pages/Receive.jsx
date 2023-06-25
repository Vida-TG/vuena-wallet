import React, { useState, useEffect } from 'react';
import QrCode from 'qrcode.react';
import { decryptKeypair } from '../utils/utils';

const ReceiveDemo = () => {
  const [publicKey, setPublicKey] = useState('');

  
  useEffect(() => {
    const encryptedProxy = localStorage.getItem('encryptedII');
    const storedPassword = localStorage.getItem('password');
    const keyPair = decryptKeypair(encryptedProxy, storedPassword);
    
    setPublicKey(keyPair.publicKey.toBase58());
    },
  );

  return (
    <div>
      <h1>Receive Demo</h1>

      {publicKey && (
        <div>
          <h3>Public Key:</h3>
          <p>{publicKey}</p>

          <div>
            <h3>QR Code:</h3>
            <QrCode value={publicKey} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiveDemo;
