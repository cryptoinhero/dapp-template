import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'

// Addresses
import {
  getArtichainAddress,
  getPresaleAddress,
} from 'utils/addressHelpers'

// ABI
import presaleAbi from 'config/abi/ArtichainPresale.json'
import bep20Abi from 'config/abi/erc20.json'
import artichainAbi from 'config/abi/ArtichainToken.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}
export const getAITContract = (web3?: Web3) => {
  return getContract(artichainAbi, getArtichainAddress(), web3)
}
export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getPresaleContract = (web3?: Web3) => {
  return getContract(presaleAbi, getPresaleAddress(), web3)
}
