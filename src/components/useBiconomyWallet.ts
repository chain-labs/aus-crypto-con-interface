import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ChainId } from '@biconomy/core-types'
import SocialLogin from '@biconomy/web3-auth'
import SmartAccount from '@biconomy/smart-account'

import '@biconomy/web3-auth/dist/src/style.css'
import { useAppDispatch } from '@/redux/hooks'
import {
  setSDK,
  setProvider as setWalletProvider,
  setUser,
} from '@/redux/wallet'

interface Configs {
  chainId: string
  network: 'testnet' | 'mainnet'
}

const useBiconomyWallet = (options: Configs) => {
  const [provider, setProvider] = useState<any>()
  const [account, setAccount] = useState<string>()
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null)
  const [scwAddress, setScwAddress] = useState('')
  const [scwLoading, setScwLoading] = useState(false)
  const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(null)

  const dispatch = useAppDispatch()

  const connectWeb3 = useCallback(
    async (SDK = socialLoginSDK) => {
      if (typeof window === 'undefined') return
      console.log({ ssss: SDK })
      if (SDK?.provider) {
        const web3Provider = new ethers.providers.Web3Provider(SDK.provider)
        setProvider(web3Provider)
        dispatch(setWalletProvider(web3Provider))
        const accounts = await web3Provider.listAccounts()
        setAccount(accounts[0])
        dispatch(setUser(accounts[0]))
        return
      }
      if (SDK) {
        console.log('opening wallet')

        SDK?.showWallet()
        return SDK
      }

      setSocialLoginSDK(SDK)
      SDK?.showWallet()
      return SDK
    },
    [socialLoginSDK],
  )

  // if wallet already connected close widget
  useEffect(() => {
    console.log('hidelwallet')
    if (socialLoginSDK && socialLoginSDK.provider) {
      socialLoginSDK.hideWallet()
    }
  }, [account, socialLoginSDK])

  // after metamask login -> get provider event
  useEffect(() => {
    const interval = setInterval(async () => {
      if (account) {
        clearInterval(interval)
      }
      if (socialLoginSDK?.provider && !account) {
        connectWeb3()
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [account, connectWeb3, socialLoginSDK])

  const disconnectWeb3 = async () => {
    if (!socialLoginSDK || !socialLoginSDK.web3auth) {
      console.error('Web3Modal not initialized.')
      return
    }
    await socialLoginSDK.logout()
    socialLoginSDK.hideWallet()
    setProvider(undefined)
    setAccount(undefined)
    setScwAddress('')
  }

  useEffect(() => {
    if (socialLoginSDK) {
      disconnectWeb3()
    } else {
      const sdk = new SocialLogin()
      setSocialLoginSDK(sdk)
      dispatch(
        setSDK({
          connect: connectWeb3,
          disconnect: disconnectWeb3,
          sdk: sdk,
        }),
      )
      sdk.init(options)
    }
  }, [socialLoginSDK])

  useEffect(() => {
    async function setupSmartAccount() {
      setScwAddress('')
      setScwLoading(true)
      const smartAccount = new SmartAccount(provider, {
        activeNetworkId: ChainId.GOERLI,
        supportedNetworksIds: [ChainId.GOERLI],
      })
      await smartAccount.init()
      const context = smartAccount.getSmartAccountContext()
      setScwAddress(context.baseWallet.getAddress())
      setSmartAccount(smartAccount)
      setScwLoading(false)
    }
    if (!!provider && !!account) {
      setupSmartAccount()
      console.log('Provider...', provider)
    }
  }, [account, provider])

  return { connectWeb3, disconnectWeb3, account, provider }
}

export default useBiconomyWallet
