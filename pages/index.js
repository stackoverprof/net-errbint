import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
import Spinner from '../components/spinner/Spinkit1'
    
const Index = () => {
    const [removeDisplay, setremoveDisplay] = useState(false)
    const [gameStatus, setgameStatus] = useState('initial')
    const [isLoaded, setisLoaded] = useState(false)
    const [score, setscore] = useState({food: 0, time: 0})

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
        </Wrapper>
    </>
    )
}
    
const Wrapper = Styled.div(() =>`

    
`)
    
export default Index