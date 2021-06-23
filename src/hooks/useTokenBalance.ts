import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import { useERC20 } from './useContract'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const contract = useERC20(tokenAddress)

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await contract.methods.balanceOf(account).call()
      setBalance(new BigNumber(res))
    }

    if (account) {
      fetchBalance()
    }
  }, [account, contract, fastRefresh])

  return balance
}


export default useTokenBalance
