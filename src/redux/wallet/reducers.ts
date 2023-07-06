import { createReducer } from '@reduxjs/toolkit'
import { WalletState } from './types'
import { setProvider, setSDK, setUser } from './actions'

const initialState: WalletState = {
  provider: null,
  SDK: null,
  user: {
    address: '',
  },
}

export const walletReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProvider, (state, action) => {
      state.provider = action.payload
    })
    .addCase(setUser, (state, action) => {
      state.user.address = action.payload
    })
    .addCase(setSDK, (state, action) => {
      state.SDK = action.payload
    })
})
