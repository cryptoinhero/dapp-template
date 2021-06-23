import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { useAppDispatch } from 'state'
import { approve } from 'utils/callHelpers'
import { usePresale } from './useContract'

// Approve a presale
export const useApprove = (contract: Contract) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const presaleContract = usePresale()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(contract, presaleContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, contract])

  return { onApprove: handleApprove }
}
