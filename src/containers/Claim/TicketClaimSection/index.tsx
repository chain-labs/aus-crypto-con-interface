import { useEffect, useState } from 'react'
import DottedCrumb from '../components/DottedCrumb'
import RoundedStep from '../components/RoundedStep'
import { STEPS } from '../constants'
import { QueryProps } from '../types'
import VerifyDetailsSection from './VerifyDetailsSection'
import TicketFinal from './TicketFinal'
import ClaimSection from './ClaimSection'
import { useAppSelector } from '@/redux/hooks'
import { walletSDKSelector } from '@/redux/wallet'
import ConnectWallet from './ConnectWallet'

const TicketClaimSection = ({ query }: { query: QueryProps }) => {
  const [step, setStep] = useState<number>(STEPS.VERIFY_URL)
  const [qrData, setQrData] = useState({})
  const [subscribe, setSubscribe] = useState<boolean>(true)

  const SDK = useAppSelector(walletSDKSelector)

  const getClaimComponent = (step) => {
    if (step === STEPS.VERIFY_URL) {
      return <VerifyDetailsSection query={query} setStep={setStep} />
    } else if (step === STEPS.CONNECT_WALLET) {
      return (
        <ConnectWallet
          setStep={setStep}
          subscribe={subscribe}
          setSubscribe={setSubscribe}
        />
      )
    } else if (step === STEPS.ENCRYPT_DATA) {
      return (
        <ClaimSection
          setStep={setStep}
          query={query}
          setQrData={setQrData}
          subscribe={subscribe}
        />
      )
    } else if (step === STEPS.FINISH) {
      return <TicketFinal qrData={qrData} />
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-center bg-white pt-2 pb-6">
        <RoundedStep stepNumber={STEPS.VERIFY_URL} current={step} />
        <DottedCrumb active={step > STEPS.VERIFY_URL} />
        <RoundedStep stepNumber={STEPS.CONNECT_WALLET} current={step} />
        <DottedCrumb active={step > STEPS.CONNECT_WALLET} />
        <RoundedStep stepNumber={STEPS.ENCRYPT_DATA} current={step} />
        <DottedCrumb active={step > STEPS.ENCRYPT_DATA} />
        <RoundedStep stepNumber={STEPS.FINISH} current={step} />
      </div>
      <div className="container w-screen px-4 text-black ">
        {getClaimComponent(step)}
      </div>
    </div>
  )
}

export default TicketClaimSection
