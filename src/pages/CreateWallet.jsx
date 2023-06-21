import React from 'react'
import { generateWallet } from '../utils/utils'

const CreateWallet = () => {

    function createWallet() {
        generateWallet()
    }

    return (
        <>
            <button onClick={createWallet}>CreateWallet</button>
        </>
    )
}

export default CreateWallet