import React from 'react'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
import useResize from 'use-resizing'
  
const Index = () => {
  const screen = useResize()

  return (
    <Wrapper>
      <Rainbox />
    </Wrapper>
  )
}
  
const Wrapper = Styled.div(() =>`
  
`)
  
export default Index