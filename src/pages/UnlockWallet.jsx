import React, { useEffect } from 'react'
import { unlockWallet } from '../utils/utils';
import Dashboard from './Dashboard';

const UnlockWallet = () => {
    const [password, setPassword] = useState('');
    const [unlocked, setUnlocked] = useState(false);
    
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handlePasswordSubmit = (e) => {
        setUnlocked(unlockWallet(password));
    };

    useEffect(() => {
        // Check if the lock timer has expired
        const lockExpiration = localStorage.getItem('lockExpiration');
        if (lockExpiration && Date.now() < parseInt(lockExpiration)) {
            setUnlocked(true)
        } else {
            setUnlocked(false)
        }
        
    }, []);

    return (
        <>
            { unlocked && <Dashboard />}
            { !unlocked &&
            <div className='unlock-page'>
                <h1>Unlock Wallet</h1>
                <div className='container'>
                    <label>Password</label>
                    <input type='password' value={password} onChange={handleChangePassword} />
                    <button onClick={handlePasswordSubmit} style={{ marginTop: 10 }} className='main-button'>Unlock</button>
                </div>
            </div>
            }
        </>
    )
}

export default UnlockWallet