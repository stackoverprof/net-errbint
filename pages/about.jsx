import React from 'react'
import Link from 'next/link'
import Styled from '@emotion/styled'
import FadeTransition from '../components/transition/Fade'

const About = () => {
    
    return (
        <FadeTransition>    
            <Wrapper>
                <Link href="/"><a className="linktest">home</a></Link>
            </Wrapper>
        </FadeTransition>
    )
}
    
const Wrapper = Styled.div(() =>`
    
`)
    
export default About