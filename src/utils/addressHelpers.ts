import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId = (process.env.REACT_APP_CHAIN_ID === "97") ? 97 : mainNetChainId
  return address[chainId]
}

export const getArtichainAddress = () => {
  return getAddress(addresses.ait)
}
export const getPresaleAddress = () => {
  return getAddress(addresses.presale)
}
export const getBusdAddress = () => {
  return getAddress(addresses.busd)
}

export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}