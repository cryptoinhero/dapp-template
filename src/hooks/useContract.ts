import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getAITContract,
  getBep20Contract,
  getPresaleContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

export const useArtichainToken = () => {
  const web3 = useWeb3()
  return useMemo(() => getAITContract(web3), [web3])
}

export const usePresale = () => {
  const web3 = useWeb3()
  return useMemo(() => getPresaleContract(web3), [web3])
}
