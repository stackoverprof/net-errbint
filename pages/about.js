import React from 'react'
import Link from 'next/link'
import Styled from '@emotion/styled'
    
const About = () => {
    return (
        <Wrapper>
            <Link href="/"><a className="linktest">home</a></Link>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(() =>`
    
`)
    
export default About