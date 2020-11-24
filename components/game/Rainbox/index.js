import React, { useRef } from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'    

const Rainbox = ({gameStatus, setgameStatus, score, setscore}) => {
    const newGameBtnRef = useRef()
    const briRef = useRef()
    const etRef = useRef()
    const nrRef = useRef()

    return (
        <Wrapper gameStatus={gameStatus} score={score}>
            {/* <p>{score.food} {score.time} {gameStatus}</p> */}
            <div className="container-canvas" id="game-container">
                <div className="canvas">
                    <div className="fixedfull h1-cont zi-dimm">
                        <div className="h1-subcont">    
                            <div className="h1-dimm"></div>
                            <p>A FULLSTACK DEVELOPER</p>
                        </div>
                    </div>
                    <div ref={nrRef} className="glimpse nr"></div>
                    <div ref={etRef} className="glimpse et"></div>
                    <div ref={briRef} className="glimpse bri"></div>
                    <Canvas setgameStatus={setgameStatus} 
                            newGameBtnRef={newGameBtnRef}
                            setscore={setscore} 
                            briRef={briRef}
                            etRef={etRef}
                            nrRef={nrRef}/>
                    <div className="fixedfull h1-cont zi-orange">
                        <div className="h1-subcont">    
                            <div className="h1"></div>
                            <p className={`hideable ${gameStatus == 'running' ? 'hide' : ''}`}>A FULLSTACK DEVELOPER</p>
                        </div>
                    </div>
                </div>
                <div className="nav-filler"></div>
            </div>
            <div className="fixedfull screen-gameover">
                <button ref={newGameBtnRef}>NEW GAME</button>
            </div>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(({gameStatus, score}) =>`

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

        .h1-subcont{
            position: absolute; 
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            p{                
                font-family: 'Bahnschrift', sans-serif;
                font-size: 32px;
                color: ${gameStatus == 'running' ? '#BBBBBB' : 'gray'};
                transition: opacity 1s 2s, color 0.5s;
                opacity: ${gameStatus == 'intro' ? 0 : 1};
                z-index: -2;
            }
            
            p.hide{
                opacity: 0; 
            }

            .hideable{
                transition: opacity 0s;
            }

            .h1{
                background-image: url('/img/title/h1.svg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                width: 675px;
                height: 170px;
                opacity: ${ gameStatus == 'intro' ? 0 :
                gameStatus == 'subintro' ? 1 :
                gameStatus == 'initial' ? 1 :
                gameStatus == 'over' ? 0 :
                gameStatus == 'running' ? 0 : 1};
                transition: ${gameStatus == 'subintro' ? '2.5s' : '1s'};
            }
            .h1-dimm{
                background-image: url('/img/title/h1-dimm.svg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat; 
                width: 675px;
                height: 170px;
            }
        }
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
            z-index: -3;   

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
                z-index: -2;
                opacity: 1;
                transition: 0.2s;
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