import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { Box } from 'rebass/styled-components'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import useTokenBalance from 'hooks/useTokenBalance'
import { getArtichainAddress, getBusdAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { Input as NumericalInput } from '../NumericalInput'

const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.colors.textSubtle)};
  }
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  background-image: linear-gradient(to right,#3bb9ff,#6c4bfb);
  box-shadow: inset 0px 0px 5px 2px #5661e2;
  // background-color: ${({ theme }) => theme.colors.input};
  // box-shadow: ${({ theme }) => theme.shadows.inset};
`
const Row = styled(Box)<{ align?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: 100%;
  display: flex;
  padding: 0;
  align-items: ${({ align }) => (align || 'center')};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export const RowBetween = styled(Row)`
  justify-content: space-between;
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  currency?: string | null
  hideBalance?: boolean
  hideInput?: boolean
  id: string
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  currency,
  hideBalance = false,
  hideInput = false,
  id,
}: CurrencyInputPanelProps) {
  const { account } = useWeb3React()
  const selectedCurrencyBalance = useTokenBalance(currency === "ait" ? getArtichainAddress() : getBusdAddress())

  const translatedLabel = label || 'Input'
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text fontSize="14px" color="white">{translatedLabel}</Text>
              {account && (
                <Text onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? `Balance: ${Number(getBalanceNumber(selectedCurrencyBalance, 18).toFixed(6))}`
                    : ' -'}
                </Text>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {account && currency && showMaxButton && label !== 'To' && (
                <Button onClick={onMax} scale="sm" variant="text">
                  MAX
                </Button>
              )}
            </>
          )}
        </InputRow>
      </Container>
    </InputPanel>
  )
}