import React, { useState } from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'    

const Rainbox = () => {
    const [gameStatus, setgameStatus] = useState('initial')

    return (
        <Wrapper gameStatus={gameStatus}>
            <Canvas setgameStatus={setgameStatus} />
            <div className="screen-gameover">
                <button id='newgame-btn'>NEW GAME</button>
            </div>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(({gameStatus}) =>`
    
    .screen-gameover{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        display: ${gameStatus == 'over' ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
    }
`)
    
export default Rainbox