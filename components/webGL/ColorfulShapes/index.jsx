import React from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'

const ColorfulShapes = () => {

    return (
        <Wrapper>
            <Canvas />
        </Wrapper>
    )
}

const Wrapper = Styled.div(() =>`
    position: relative;
    height: 348px;
    // min-height: 348px;
    width: 100%;
    background: red;
`)

export default ColorfulShapes