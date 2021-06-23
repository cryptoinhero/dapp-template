import React from 'react'
import useAuth from 'hooks/useAuth'
import { useWalletModal } from './WalletModal'
import { Button } from './Button'
// import useI18n from 'hooks/useI18n'

const UnlockButton = (props: any) => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  // eslint-disable jsx-props-no-spreading
  return (
    <Button onClick={onPresentConnectModal} {...props}>
      Unlock Wallet
    </Button>
  )
}

export default UnlockButton
