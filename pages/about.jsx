import React from 'react'
import Link from 'next/link'
import Styled from '@emotion/styled'
import Page from '../components/transition'

const About = () => {
    
    return (
        <Page transition="fade">    
            <Wrapper>
                <Link href="/"><a className="linktest">home</a></Link>
            </Wrapper>
        </Page>
    )
}
    
const Wrapper = Styled.div(() =>`
    
`)
    
export default About