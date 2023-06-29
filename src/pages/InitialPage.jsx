import React, { useEffect } from 'react';
import UnlockWallet from './UnlockWallet';
import CreateWallet from './CreateWallet';
import Onboarding from './Onboarding';

const InitialPage = () => {
    const [ ePK, setEPK ] = React.useState(null)
    const [ pW, setPW ] = React.useState(null)

    useEffect(() => {
      let data = localStorage.getItem('data');
      data = JSON.parse(data)
      if (data && data.encrypted && data.access) {
          setEPK(data.encrypted);
          setPW(data.access);
      }
            
    }, []);


  return (
    <>
        { ePK && pW ? <UnlockWallet /> : <Onboarding /> }
    </>
  )
}

export default InitialPage

