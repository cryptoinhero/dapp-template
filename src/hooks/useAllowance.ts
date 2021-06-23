import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBusdAddress, getPresaleAddress } from 'utils/addressHelpers'
import { getBep20Contract } from 'utils/contractHelpers'
import useRefresh from './useRefresh'
import useWeb3 from './useWeb3'

// Retrieve presale allowance
export const usePresaleAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const busdContract = getBep20Contract(getBusdAddress(), web3)
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await busdContract.methods.allowance(account, getPresaleAddress()).call()
      setAllowance(new BigNumber(res))
    }

    if (account) {
      fetchAllowance()
    }
  }, [account, fastRefresh])

  return allowance
}
