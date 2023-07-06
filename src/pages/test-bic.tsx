import { useAppSelector } from '@/redux/hooks'
import { wrapper } from '@/redux/store'
import { walletSelector } from '@/redux/wallet'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'

const SocialLoginDynamic = dynamic(
  () => import('@/components/scw').then((res) => res.default),
  {
    ssr: false,
  },
)

const Home = () => {
  return (
    <>
      <SocialLoginDynamic />
      <UserInfo />
    </>
  )
}

const UserInfo = () => {
  const wallet = useAppSelector(walletSelector)

  useEffect(() => {
    const signer = wallet?.provider?.getSigner()
    signer?.getAddress().then((user) => console.log({ user }))
  }, [wallet.provider])

  if (wallet.provider) {
    return (
      <div>
        <div>User:</div>
        <div>{wallet.user.address}</div>
      </div>
    )
  }

  return null
}

export default wrapper.withRedux(Home)
