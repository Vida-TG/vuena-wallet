import React from 'react'
import logo from './images/logo.png'
import illustration from './images/illustration.png'
import './css/onboard.css'

const Onboarding = () => {


    return (
        <div className='blobs'>
        <div className="card">
                <div className="top-section">
                    <div className="top-left-section">
                        <img className="logo-img" src={logo}/>
                        <a href="#">What Is A Vault Wallet?</a>
                        <a href="#">Features</a>
                    </div>
                    <div className="top-right-section">
                        <a href="/create-wallet">Hop In</a>
                    </div>
                </div>
                <div className="bottom-section">
                    <span>SOLANA'S FIRST VAULT WALLET</span>
                    <h1>Vuena</h1>
                    <p>2x secured non-custodial wallet with Elusiv privacy and Solana's lightening speed.</p>
                    <a href="/create-wallet">Hop In</a>
                    <div className="last-message">
                        <h1>2x</h1>
                        <p>Data encryption, privacy</p>
                    </div>
                </div>
                
                <img className="illustration-img" src={illustration} alt="Trio"/>
            </div>
            <div className="star star-1"></div>
            <div className="star star-2"></div>
        </div>
    )
}

export default Onboarding