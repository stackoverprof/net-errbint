import React from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'    

const Rainbox = ({gameStatus, setgameStatus, score, setscore}) => {

    return (
        <Wrapper gameStatus={gameStatus} score={score}>
            <p>{score.food} {score.time}</p>
            <div className="container-canvas" id="game-container">
                <div className="canvas">
                    <div className="fixedfull h1-cont zi-dimm">
                        <div className="h1-dimm"></div>
                    </div>
                    <div className="glimpse nr"></div>
                    <div className="glimpse et"></div>
                    <div className="glimpse bri"></div>
                    <Canvas setgameStatus={setgameStatus} setscore={setscore}/>
                    <div className="fixedfull h1-cont">
                        <div className="h1"></div>
                    </div>
                </div>
                <div className="nav-filler"></div>
            </div>
            <div className="fixedfull screen-gameover">
                <button id='newgame-btn'>NEW GAME</button>
            </div>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(({gameStatus, score}) =>`

    p{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
    }

    .container-canvas{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
            

        div.canvas{
            background: url('/img/bg3d.png');
            background-size: cover;
            background-position: top;
            background-repeat: no-repeat;

            display: flex;
            justify-content: start;
            align-items: center;
            flex-direction: column;
            z-index: -2;   

            canvas{
                z-index: 0;
            }
            
            .zi-dimm{
                z-index: -1;   
            }
            
            .glimpse{
                position: absolute;
                width: 100%;
                height: calc(100% - 60px);
                
                background-size: cover;
                background-position: top;
                background-repeat: no-repeat;
                z-index: -1;
            }
    
            .bri{
                background-image: url('/img/glimpse/bri.svg');
            }
            .et{
                background-image: url('/img/glimpse/et.svg');
            }
            .nr{
                background-image: url('/img/glimpse/nr.svg');
            }
    
        }
    
        .nav-filler{
            height: 60px;
            width: 100%;
            background: black;
        }
    }
    

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