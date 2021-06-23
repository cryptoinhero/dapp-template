import { useEffect, useMemo } from "react"
import { useAppDispatch } from "state"
import { setBlock } from "state/block"
import { fetchCurrentPresaleInfoAsync, fetchPresaleInfoAsync } from "state/presale"
import { getWeb3NoAccount } from "utils/web3"
import useRefresh from "./useRefresh"

export const useFetchPublicData = () => {
    const dispatch = useAppDispatch()
    const { fastRefresh } = useRefresh()
    useMemo(() => {
      fetchPresaleInfoAsync()
    }, [dispatch])
  
    useEffect(() => {
      const web3 = getWeb3NoAccount()
      const interval = setInterval(async () => {
        const blockNumber = await web3.eth.getBlockNumber()
        dispatch(setBlock(blockNumber))
      }, 6000)
  
      return () => clearInterval(interval)
    }, [dispatch])

    useEffect(() => {
        fetchCurrentPresaleInfoAsync()
    }, [dispatch, fastRefresh])
  }
  