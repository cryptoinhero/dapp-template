import React, { useState } from 'react'
import styled from 'styled-components'

import { CloseIcon} from 'components/Svg'
import { IconButton } from './Button'

const Announcement = styled.div`
    position: relative;
    padding: 10px;
    padding-right: 30px;
    margin: 10px;
    background: #3db3ffd1;
    border-radius: 5px;
    color: #355ea7;
  `
const AnnouncementTitle = styled.div`
    font-weight: 600;
`
const AnnouncementBody = styled.div`
    margin: 10px 0;
`
const CloseButton = styled(IconButton)`
    position: absolute;
    top: 0;
    right: 0;
`

interface Props {
    title?: string
    message: string
}

const AnnounceMessage: React.FC<Props> = ({title, message}) => {
    const [isShow, setShowable] = useState(true)

    if(!isShow) return <></>

    return (
        <Announcement>
            {title  && <AnnouncementTitle>{title}</AnnouncementTitle> }
            <AnnouncementBody>{message}</AnnouncementBody>
            <CloseButton variant="text" aria-label="Remove the Message" onClick = {() => {setShowable(false)}}>
                <CloseIcon color="white" />
            </CloseButton>
        </Announcement>
    )
}

export default AnnounceMessage
