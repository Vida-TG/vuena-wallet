import React, { useState, useEffect } from 'react';
import QrCode from 'qrcode.react';
import { decryptKeypair } from '../utils/utils';

const Receive = () => {
  const [publicKeyII, setPublicKeyII] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKeyII)
  }

  useEffect(() => {
    let data = localStorage.getItem('data');
    data = JSON.parse(data)
    const decryptedKeypair = decryptKeypair(data.encryptedII, data.nonce, data.salt);
    
    setPublicKeyII(decryptedKeypair.publicKey.toBase58());
    },
  );

  return (
    <div className='receive-popup-main'>
      {publicKeyII && (
      <div>
        <p style={{fontSize: "large"}}>Public wallet address:</p>
        <p onClick={handleCopy} style={{cursor:"pointer"}}>{publicKeyII.substr(0, 5) + "..." + publicKeyII.substr(-3)} (Click to copy)</p>
          <div style={{display: "flex", justifyContents: "center", alignItems: "center", width: '100%'}}>
            <div style={{width: "100%"}}>
              <h5>QR Code:</h5>
              <div style={{margin: "auto"}}><QrCode value={publicKeyII} /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receive;
