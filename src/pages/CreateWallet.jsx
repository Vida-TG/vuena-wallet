import React from 'react'
import { generateWallet } from '../utils/utils'
import { encryptAndStoreKeypair } from '../utils/utils'

const CreateWallet = () => {

    function createWallet() {
        console.log(generateWallet())
    }

    return (
        <>
            <button onClick={createWallet}>CreateWallet</button>
        </>
    )
}

export default CreateWallet