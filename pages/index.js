import React from 'react'
// import Link from 'next/link'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
import Loader from '../components/spinner/Spinkit1'
    
const Index = () => {
    
    return (
        <Loader>
            <Wrapper>
                <a href="/about" className="linktest">about</a>
                <Rainbox />
            </Wrapper>
        </Loader>
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