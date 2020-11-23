import React from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'    

const Rainbox = ({gameStatus, setgameStatus}) => {

    return (
        <Wrapper gameStatus={gameStatus}>
            <Canvas setgameStatus={setgameStatus} />
            <div className="fixedfull screen-gameover">
                <button id='newgame-btn'>NEW GAME</button>
            </div>
        </Wrapper>
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
    
    .screen-gameover{
        display: ${gameStatus == 'over' ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
    }
`)
    
export default Rainbox