import React from 'react'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
    
const Index = () => {

    return (
        <Wrapper>
            <Rainbox />
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(() =>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`)
    
export default Index