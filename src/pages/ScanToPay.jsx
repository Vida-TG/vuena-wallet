//Pay with vuena
import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-reader';
import { generatePrivateKey } from './boilerplate';

const ReceiveDemo = () => {
  const [publicKey, setPublicKey] = useState('');
  const qrReaderRef = useRef(null);

  // Function to handle scanning the QR code
  const handleScan = (data) => {
    if (data) {
      // Process the scanned QR code data (e.g., update state, make API requests, etc.)
      console.log('Scanned QR code:', data);
    }
  };

  // Function to handle errors when scanning QR code
  const handleError = (error) => {
    console.error('QR code scan error:', error);
  };

  // Function to start the QR code scanner
  const startScan = () => {
    qrReaderRef.current.openImageDialog();
  };

  return (
    <div>
      <h1>Receive Demo</h1>

      <button onClick={generateKeypair}>Generate Keypair</button>

      {publicKey && (
        <div>
          <h3>Public Key:</h3>
          <p>{publicKey}</p>
        </div>
      )}

      <div>
        <h3>Scan to Receive QR Code:</h3>
        <button onClick={startScan}>Start Scan</button>
        <QrReader
          ref={qrReaderRef}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '300px' }}
        />
      </div>
    </div>
  );
};

export default ReceiveDemo;
