import { ethers } from 'ethers'
import { Contract } from 'web3-eth-contract'

export const approve = async (erc20Contract: Contract, contract: Contract, account: any) => {
  return erc20Contract.methods
    .approve(contract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const buyToken = async (presaleContract: Contract, amount: string, account: any) => {
  const gasLimit = await presaleContract.methods
    .buyTokens(ethers.utils.parseEther(amount))
    .estimateGas({ from: account})
  return presaleContract.methods
    .buyTokens(ethers.utils.parseEther(amount))
    .send({ from: account, gas: gasLimit })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    }).on('error', console.error);
}