import SocialLogin from '@biconomy/web3-auth'
import { ethers } from 'ethers'

export type iSDK = {
  connect: any
  disconnect: any
  sdk: SocialLogin
}

export type WalletState = {
  SDK: iSDK
  provider: ethers.providers.Web3Provider
  user: {
    address: string
  }
}
