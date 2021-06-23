import BigNumber from 'bignumber.js'
import presaleABI from 'config/abi/ArtichainPresale.json'
import multicall from 'utils/multicall'
import { getPresaleAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

export const fetchPresaleInfo = async () => {
    let calls = []
    for(let i = 1; i <= 3; i++ ) {
        calls.push({
            address: getPresaleAddress(),
            name: 'presaleStages',
            params: [i]
        })
    }
    const data = await multicall(presaleABI, calls)

    const stages = [];
    for(let i = 0; i < 3; i++) {
        stages.push({
            stage: data[i].stage.toNumber(),
            bonus: data[i].bonus.toNumber() / 100,
            rate: data[i].rate.toNumber() / 100,
            cap: getBalanceNumber(new BigNumber(data[i].cap._hex))
        })
    }

    calls = [
        {
            address: getPresaleAddress(),
            name: 'currentStage'
        },
        {
            address: getPresaleAddress(),
            name: 'totalSoldAmount'
        },
        {
            address: getPresaleAddress(),
            name: 'startTime'
        },
        {
            address: getPresaleAddress(),
            name: 'endTime'
        },
        {
            address: getPresaleAddress(),
            name: 'hasClosed'
        },
    ]

    const [curStage, totalSold, startTime, endTime, closed] = await multicall(presaleABI, calls);
    const info = {
        started: startTime[0].toNumber() <= new Date().getTime() / 1000,
        closed: closed[0],
        curStage: new BigNumber(curStage).toNumber(),
        totalSold: getBalanceNumber(new BigNumber(totalSold)),
        openTime: startTime[0].toNumber(),
        endTime: endTime[0].toNumber(),
        stages: stages.map(stage => stage)
    }
  
    return info
}

export const fetchCurrentPresaleInfo = async () => {
    const calls = [
        {
            address: getPresaleAddress(),
            name: 'currentStage'
        },
        {
            address: getPresaleAddress(),
            name: 'totalSoldAmount'
        },
        {
            address: getPresaleAddress(),
            name: 'startTime'
        },
        {
            address: getPresaleAddress(),
            name: 'endTime'
        },
        {
            address: getPresaleAddress(),
            name: 'hasClosed'
        },
    ]
    
    const [curStage, totalSold, startTime, endTime, closed] = await multicall(presaleABI, calls)
    if(new BigNumber(curStage).isLessThan(1) || new BigNumber(curStage).isGreaterThan(3)) {
        const info = {
            curStage: new BigNumber(curStage).toNumber(),
            totalSold: getBalanceNumber(new BigNumber(totalSold)),
            openTime: startTime[0].toNumber(),
            endTime: endTime[0].toNumber(),
            started: startTime[0].toNumber() <= new Date().getTime() / 1000,
            closed: closed[0],
        }
        return info
    }

    const _calls = [
        {
            address: getPresaleAddress(),
            name: 'soldAmounts',
            params: [new BigNumber(curStage).toNumber()]
        },
        {
            address: getPresaleAddress(),
            name: 'presaleStages',
            params: [new BigNumber(curStage).toNumber()]
        },
    ]

    const [soldAmount, stage] = await multicall(presaleABI, _calls)

    const info = {
        curStage : new BigNumber(curStage).toNumber(),
        openTime: startTime[0].toNumber(),
        endTime: endTime[0].toNumber(),
        started: startTime[0].toNumber() <= new Date().getTime() / 1000,
        closed: closed[0],
        totalSold: getBalanceNumber(new BigNumber(totalSold)),
        soldAmount: getBalanceNumber(new BigNumber(soldAmount)),
        rate: stage.rate.toNumber() / 100,
    }

    return info
}

