import SocialLogin from '@biconomy/web3-auth'
import { createAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { iSDK } from './types'

export const setSDK = createAction<iSDK>('wallet/SET_SDK')

export const setProvider = createAction<ethers.providers.Web3Provider>(
  'wallet/SET_PROVIDER',
)

export const setUser = createAction<string>('wallet/SET_USER')
