import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import { useWeb3React } from '@web3-react/core'
import CardContent from 'components/CardContent'
import CardTitle from 'components/CardTitle'
import UnlockButton from 'components/UnlockButton'
import CurrencyInputPanel, { RowBetween } from 'components/CurrencyInputPanel'
import { useApprove} from 'hooks/useApprove'
import { getBusdAddress } from 'utils/addressHelpers'
import { usePresaleAllowance } from 'hooks/useAllowance'
import { getBalanceNumber } from 'utils/formatBalance'
import { useBuyToken } from 'hooks/usePresale'
import useTokenBalance from 'hooks/useTokenBalance'
import { useERC20 } from 'hooks/useContract'
import { usePresales, usePresaleStatus, useToast } from 'state/hooks'
import CountDown from 'components/CountDown'
import AnnounceMessage from 'components/AnnounceMessage'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { CardBody } from 'components/Card/index'

const HomeContent = styled.div`
  padding: 10px 5px;
  max-width: 436px;
  margin: 20px auto
`
const AdvancedDetailsFooter = styled.div`
  padding-top: calc(16px + 2rem);
  padding-bottom: 20px;
  margin: auto;
  margin-top: -2rem;
  width: 100%;
  max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.colors.textSubtle};
  z-index: 1
`
export const Home: React.FC = () => {
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [busdAmount, setBusdAmount] = useState("")
  const [aitAmount, setAitAmount] = useState("")

  const allowance = usePresaleAllowance()
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const busdBalance = useTokenBalance(getBusdAddress());
  const { curStage, rate, cap, bonus, soldAmount, totalSold, started, closed, openTime, endTime } = usePresaleStatus()
  const stages = usePresales()

  const atMaxAmount = !!isApproved && (Math.abs(getBalanceNumber(busdBalance, 18) - Number(busdAmount)) > 1e-8)
  
  const busdContract = useERC20(getBusdAddress())
  const { onApprove } = useApprove(busdContract)
  const { buytokens } = useBuyToken()
  const { toastError } = useToast()

  useEffect(() => {
    if(getBalanceNumber(busdBalance, 18) < Number(busdAmount)) {
      setBusdAmount("")
      setAitAmount("")
    }
  }, [busdBalance, busdAmount])

  const handleApprove = useCallback(async () => {
    if(requestedApproval) return

    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if(!txHash) {
        console.log('rejected to approve')
      }
      setRequestedApproval(false)
    } catch (e) {
      setRequestedApproval(false)
    }
  }, [ onApprove, requestedApproval, account])

  const handleBuyToken = useCallback(async () => {
    if(pendingTx) return
    if(Number(busdAmount) <= 0) return;
    if(busdBalance.isLessThan(Number(busdAmount))) {
      toastError('Error', 'Insufficient balance')
      return
    }
    if(Number(aitAmount) < 0.1) {
      toastError('Error', 'AIT amount must exceed 0.1')
      return
    }

    try {
      setPendingTx(true)
      const txHash = await buytokens(busdAmount)
      // user rejected tx or didn't go thru
      if (!txHash) {
        console.warn('rejected')
      } else {
        setBusdAmount("")
        setAitAmount("")
      }
      setPendingTx(false)
    } catch (e) {
      toastError('Error', e?.message)
      setPendingTx(false)
    }
  }, [buytokens, busdAmount, busdBalance])

  const handleTypeInput = useCallback(
    (value: string) => {
      let amount = value;
      if(value.length - value.indexOf(".") - 1 > 18) {
        amount = value.substr(0, value.indexOf(".") + 19)
      }
      if(getBalanceNumber(busdBalance, 18) < Number(amount)) return
      
      let otherAmount = Number(value) / rate
      otherAmount = Number(otherAmount.toFixed(8))
      
      setBusdAmount(amount)
      setAitAmount(otherAmount.toString())
    },
    [busdBalance, rate]
  )

  const handleTypeOutput = useCallback(
    (value: string) => {
      let amount = value;
      if(value.length - value.indexOf(".") - 1 > 18) {
        amount = value.substr(0, value.indexOf(".") + 19)
      }

      let otherAmount = Number(value) * rate
      otherAmount = Number(otherAmount.toFixed(4))
      if(getBalanceNumber(busdBalance, 18) < Number(otherAmount)) return

      setAitAmount(amount)
      setBusdAmount(otherAmount.toString());
    },
    [busdBalance, rate]
  )

  const handleMaxInput = useCallback(() => {
      const amount = getBalanceNumber(busdBalance, 18).toString()
      setBusdAmount(amount)

      let otherAmount = Number(amount) / rate
      otherAmount = Number(otherAmount.toFixed(8))
      setAitAmount(otherAmount.toString())
  }, [ busdBalance, rate ])

  return (
    <>
      <AnnounceMessage 
        title = "Dear ArtiChain Community !"
        message = "With reference to minimum  buying, recently a community poll was created in official telegram group. As a result, majority of votes were on 0.1 AIT minimum buying. In this regard, we listen, care and deliever to our community for the best of their interests. So our team has decided to go with the poll result. We understand the importance of the community support as community is power for the project. We have given directions to our dev to fix the minimum buying price. We will announce shortly once all done. Thank you all for your great support. Stay Tuned !"
      />
      <HomeContent>
        <Card>
          <CardTitle>Presale</CardTitle>
          <CardBody>
            { !closed && (
              started ? (
                <>
                  <Text>End in</Text>
                  <CountDown endtime={endTime * 1000} />
                </>
              ) : (
                <>
                  <Text>Start with in</Text>
                  <CountDown endtime={openTime * 1000} />
                </>
              )
            )}
            <CardContent>
              <AutoColumn gap="md">
                <CurrencyInputPanel
                    label="BUSD"
                    value={busdAmount.toString()}
                    showMaxButton={atMaxAmount}
                    currency="busd"
                    onUserInput={handleTypeInput}
                    onMax={handleMaxInput}
                    id="presale-currency-input"
                  />
                <CurrencyInputPanel
                    label="AIT"
                    value={aitAmount.toString()}
                    showMaxButton={false}
                    currency="ait"
                    onUserInput={handleTypeOutput}
                    id="presale-currency-output"
                  />
              </AutoColumn>        
              { started && !closed &&
                <StyledCardActions>
                  {!account && <UnlockButton />}
                  {account &&
                    (!isApproved ? (
                      <div style={{ flex: 1 }}>
                        <Button width="100%" onClick={handleApprove} disabled={requestedApproval}>
                          {!requestedApproval ? `Approve BUSD` : `Approving...`}
                        </Button>
                      </div>
                    ) : (
                      <Button width="100%" onClick={handleBuyToken} disabled={pendingTx}>
                        {!pendingTx ? `Buy AIT` : 'Buying...'}
                      </Button>
                    ))
                  }
                </StyledCardActions>
              }
              
            </CardContent>
          </CardBody>
        </Card>
        { started && !closed &&
          <AdvancedDetailsFooter>
            <Card>
              <CardBody>
                <AutoColumn gap="4px">
                  <RowBetween>
                    <Text fontSize="14px">Current Stage</Text>
                    <Text fontSize="14px" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>{curStage}</Text>
                  </RowBetween>
                  <RowBetween>
                    <Text fontSize="14px">Bonus</Text>
                    <Text fontSize="14px" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>{bonus} %</Text>
                  </RowBetween>
                  <RowBetween>
                    <Text fontSize="14px">Price</Text>
                    <Text fontSize="14px" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>{rate} BUSD</Text>
                  </RowBetween>
                  <RowBetween>
                    <Text fontSize="14px">Presale Cap</Text>
                    <Text fontSize="14px" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>{cap} AIT</Text>
                  </RowBetween>
                  <RowBetween>
                    <Text fontSize="14px">Sold</Text>
                    <Text fontSize="14px" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>{soldAmount.toFixed(2)}/{totalSold.toFixed(2)}</Text>
                  </RowBetween>
                </AutoColumn>
              </CardBody>
            </Card>
          </AdvancedDetailsFooter>
        }
        <AdvancedDetailsFooter>
          <Card>
            <CardBody>
              <AutoColumn>
                <RowBetween>
                  <Text fontSize="14px">Stage</Text>
                  <Text fontSize="14px">Cap</Text>
                  <Text fontSize="14px">Price</Text>
                  <Text fontSize="14px">Bonus</Text>
                </RowBetween>
                { stages.map(stage => 
                  <RowBetween key = {`${stage.stage}`}>
                    <Text fontSize="14px">{stage.stage}</Text>
                    <Text fontSize="14px">{stage.cap}</Text>
                    <Text fontSize="14px">{stage.rate}</Text>
                    <Text fontSize="14px">{stage.bonus}%</Text>
                  </RowBetween>
                )}
              </AutoColumn>
            </CardBody>
          </Card>
        </AdvancedDetailsFooter>
      </HomeContent>
    </>
  )
}

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`
const AutoColumn = styled.div<{
  gap?: 'sm' | 'md' | 'lg' | string
  justify?: 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'space-between'
}>`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap};
  justify-items: ${({ justify }) => justify && justify};
`


