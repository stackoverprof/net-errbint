import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
import Spinner from '../components/spinner/Spinkit1'
    
const Index = () => {
    const [removeDisplay, setremoveDisplay] = useState(false)
    const [score, setscore] = useState({food: 0, time: 0})
    const [gameStatus, setgameStatus] = useState('intro')
    const [isLoaded, setisLoaded] = useState(false)

    const removeSpinner = () => {
        setisLoaded(true)
        setTimeout(() => {
            setremoveDisplay(true)
        }, 1000)
    }

    useEffect(() => {
        window.addEventListener('load', removeSpinner)
        
        return () => {
            window.removeEventListener('load', removeSpinner)
        }
    }, [])
    
    return (
    <>
        <Spinner isLoaded={isLoaded} removeDisplay={removeDisplay}/>
        <Wrapper gameStatus={gameStatus}>
            <Rainbox gameStatus={gameStatus} setgameStatus={setgameStatus} score={score} setscore={setscore}/>
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