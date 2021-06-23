import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { floor } from 'lodash'

const CountDownWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`
const CountDownItem = styled.div`
  display: inline-block;
  margin: 5px 1px;
  min-width: 70px;
  padding: 5px 0;
  text-align: center;
`
const CountDownItemValue = styled.div`
  color: #6757fc;
  font-size: 2rem;
  margin-bottom: 5px;
`
const CountDownUnit = styled.div`
  text-transform: capitalize;
  color: #280D5F;
`

const CountDown: React.FC<{endtime: number}> = ({endtime}) => {
  const [days, setDays] = useState('0')
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('0')
  const [seconds, setSeconds] = useState('0')

  useEffect(() => {
    const interval = setInterval(() => {
      const then = moment(endtime)
      const now = moment()
      let countdown = floor(then.diff(now) / 1000)
      if(countdown < 0) countdown = 0

      setDays(`${floor(countdown / ( 60 * 60 * 24))}`)
      setHours(`00${floor((countdown % ( 60 * 60 * 24)) / ( 60 * 60))}`.slice(-2))
      setMinutes(`00${floor((countdown % (60 * 60)) / 60)}`.slice(-2))
      setSeconds(`00${countdown % 60}`.slice(-2))
    }, 1000)
    return () => clearInterval(interval)
  }, [endtime, setDays, setHours, setMinutes, setSeconds])

  return (
    <CountDownWrapper>
      <CountDownItem>
        <CountDownItemValue>{days}</CountDownItemValue>
        <CountDownUnit>Days</CountDownUnit>
      </CountDownItem>
      <CountDownItem>
        <CountDownItemValue>{hours}</CountDownItemValue>
        <CountDownUnit>Hours</CountDownUnit>
      </CountDownItem>
      <CountDownItem>
        <CountDownItemValue>{minutes}</CountDownItemValue>
        <CountDownUnit>Minutes</CountDownUnit>
      </CountDownItem>
      <CountDownItem>
        <CountDownItemValue>{seconds}</CountDownItemValue>
        <CountDownUnit>Seconds</CountDownUnit>
      </CountDownItem>
    </CountDownWrapper>    
  )
}

export default CountDown
