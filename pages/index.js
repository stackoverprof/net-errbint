import React, { useState } from 'react'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
    
const Index = () => {
    const [gameStatus, setgameStatus] = useState('initial')

    return (
        <Wrapper gameStatus={gameStatus}>
            <div className="fixedfull h1-cont">
                <h1>errbint</h1>
                <div className="h1"></div>
            </div>
            <Rainbox gameStatus={gameStatus} setgameStatus={setgameStatus}/>
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

    .h1-cont{
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
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
            z-index: 102;
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