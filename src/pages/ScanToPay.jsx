import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-reader';

const ReceiveDemo = () => {
  const [publicKey, setPublicKey] = useState('');

  // Function to generate a new keypair
  const generateKeypair = () => {
    // Generate the keypair logic goes here
    // Update the publicKey state with the generated public key
  };

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

  const qrReaderRef = useRef(null);

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
        <h3>Scan to pay with QR Code:</h3>
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
