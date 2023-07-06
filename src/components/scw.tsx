import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ChainId } from '@biconomy/core-types'
import SocialLogin from '@biconomy/web3-auth'
import SmartAccount from '@biconomy/smart-account'

import '@biconomy/web3-auth/dist/src/style.css'
import useBiconomyWallet from './useBiconomyWallet'

const Home = () => {
  const { account, connectWeb3, disconnectWeb3 } = useBiconomyWallet({
    chainId: ethers.utils.hexValue(80001),
    network: 'testnet',
  })

  return (
    <div>
      <main>
        <h1>Biconomy SDK Next.js Web3Auth Example</h1>
        <button onClick={!account ? connectWeb3 : disconnectWeb3}>
          {!account ? 'Connect Wallet' : 'Disconnect Wallet'}
        </button>

        {account && (
          <div>
            <h2>EOA Address</h2>
            <p>{account}</p>
          </div>
        )}

        {/* {scwLoading && <h2>Loading Smart Account...</h2>}

        {scwAddress && (
          <div>
            <h2>Smart Account Address</h2>
            <p>{scwAddress}</p>
          </div>
        )} */}
      </main>
    </div>
  )
}

export default Home
