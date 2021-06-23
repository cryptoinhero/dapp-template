import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { throttle } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import Logo from './Logo'
import UserBlock from './UserBlock'
import { Flex } from './Box'

const MENU_HEIGHT = 64
const StyledNav = styled.nav<{ showMenu: boolean }>`
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 0px 0px 4px 1px rgb(14 14 44 / 40%);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`

export const Navbar: React.FC = () => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      // eslint-disable-next-line
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  // eslint-disable-next-line
  return (
    <StyledNav showMenu={showMenu}>
      <Logo isDark={false} href="/" />
      <Flex>
        {account ? (
          <UserBlock account={account} login={login} logout={logout} />
        ) : (
          <UserBlock login={login} logout={logout} />
        )}
      </Flex>
    </StyledNav>
  )
}
