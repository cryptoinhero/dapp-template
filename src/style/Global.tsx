import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { Theme } from '../theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends Theme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    background-image: url(/bg-presale.png);
    background-size: cover;
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
