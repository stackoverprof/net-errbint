import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
import Spinner from '../components/spinner/Spinkit1'
    
const Index = () => {
    const [removeDisplay, setremoveDisplay] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)

    
    useEffect(() => {
        const removeSpinner = () => {
            setisLoaded(true)
            setTimeout(() => {
                setremoveDisplay(true)
            }, 1000)
        }
        
        window.addEventListener('load', removeSpinner)
        
        return () => {
            window.removeEventListener('load', removeSpinner)
        }
    }, [])
    
    return (
    <>
        <Spinner isLoaded={isLoaded} removeDisplay={removeDisplay}/>
        <Wrapper>
            <Rainbox />
            {/* <button>BUTTON</button> */}
        </Wrapper>
    </>
    )
}
    
const Wrapper = Styled.div(() =>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    
    button{
        z-index: 100;
    }
`)
    
export default Index