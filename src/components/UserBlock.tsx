import React from 'react'
import { Button } from './Button';
import { Login, useWalletModal } from './WalletModal';

interface Props {
  account?: string
  login: Login
  logout: () => void
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  // eslint-disable-next-line
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account)
  // eslint-disable-next-line
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <div>
      {account ? (
        <Button
          scale="sm"
          variant="tertiary"
          onClick={() => {
            onPresentAccountModal()
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
          scale="sm"
          onClick={() => {
            onPresentConnectModal()
          }}
        >
          Connect
        </Button>
      )}
    </div>
  )
}
// eslint-disable-next-line
export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account)
