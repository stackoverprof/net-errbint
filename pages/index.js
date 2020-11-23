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
    
const Wrapper = Styled.div(({gameStatus}) =>`

    .fixedfull{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .h1-cont{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 292px;

        h1{
            opacity: 0;
        }

        .h1{
            position: absolute;
            background-image: url('/img/title/h1.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 675px;
            height: 197px;
            opacity: ${gameStatus == 'running' ? 0 : 1};
            transition: 1s;
        }
        .h1-dimm{
            position: absolute;
            background-image: url('/img/title/h1-dimm.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat; 
            width: 675px;
            height: 197px;
        }
    }
`)
    
export default Index