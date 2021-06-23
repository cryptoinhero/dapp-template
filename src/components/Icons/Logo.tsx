import React from 'react'
import PropTypes from 'prop-types'
import { SvgProps } from 'components/Svg/types'
import DarkLogo from './DarkLogo'
import LightLogo from './LightLogo'

interface LogoProps extends SvgProps {
  isDark: boolean
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  if(isDark) {
     return <DarkLogo {...props}/>
  } 
  
  return <LightLogo {...props}/>
}

Logo.propTypes = {
  isDark: PropTypes.bool.isRequired,
}

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark)
