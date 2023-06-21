import React from 'react'
import { encryptKeypair, generateWallet, saveWallet } from '../utils/utils';
import Dashboard from './Dashboard';

const CreateWallet = () => {
    const [keypair, setKeypair] = useState(null);
    const [password, setPassword] = useState('');
    const [mnemonics, setMnemonics] = useState(null);
    
    const handleGenerateWallet = () => {
        let kP, mnemonic = generateWallet();
        setMnemonics(mnemonic);
        setKeypair(kP);

    };

    const handleContinue = () => {
        let encryptedPrivateKey = encryptKeypair(keypair, password)
        saveWallet(encryptedPrivateKey, password)
        return <Dashboard />
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    
    useEffect(() => {
        
    }, [keypair]);

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
                    <p>Mnemonic: {mnemonics}</p>
                    <p>Public Key: {keypair.publicKey.toBase58()}</p>
                    <button onClick={handleContinue}>Continue</button>
                </div>
                )}
            </div>
        </>
    )
}

export default CreateWallet






