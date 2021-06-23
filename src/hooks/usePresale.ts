import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { buyToken } from 'utils/callHelpers'
import { useToast } from 'state/hooks'
import { usePresale } from './useContract'

// buy token
export const useBuyToken = () => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const presaleContract = usePresale()
  const { toastError } = useToast()

  const handleBuyToken = useCallback(async (amount: string) => {
    try {
      const tx = await buyToken(presaleContract, amount, account)
      return tx
    } catch (e) {
      toastError('Error', e?.message)
      return false
    }
  }, [account, dispatch, buyToken, presaleContract])

  return { buytokens: handleBuyToken }
}
