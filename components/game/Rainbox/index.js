import React, { useRef } from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'
import useResize from 'use-resizing'

const Rainbox = ({gameStatus, setgameStatus, score, setscore}) => {
    const newGameBtnRef = useRef()
    const briRef = useRef()
    const etRef = useRef()
    const nrRef = useRef()
    const screen = useResize().width

    return (
        <Wrapper gameStatus={gameStatus} score={score} screen={screen}>
            <div className="container-canvas" id="game-container">
                <div className="canvas">
                    <div className="fixedfull h1-cont zi-dimm">
                        <div className="h1-subcont">    
                            <div className="h1-dimm supertitle"></div>
                            <p>{screen > 500 ? 'A FULLSTACK DEVELOPER' : 'FULLSTACK'} <br/> {screen < 500 ? 'DEVELOPER' : ''}</p>
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
                            <div className="h1 supertitle"></div>
                            <p className={`hideable ${gameStatus == 'running' ? 'hide' : ''}`}>{screen > 500 ? 'A FULLSTACK DEVELOPER' : 'FULLSTACK'} <br/> {screen < 500 ? 'DEVELOPER' : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="nav-filler"></div>
            </div>
            <div className="fixedfull screen-gameover">
                <button ref={newGameBtnRef}>NEW GAME</button>
            </div>
            <p>{score.food} {score.time} {gameStatus}</p>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(({gameStatus, score, screen}) =>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -2;

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
        padding-bottom: 256px;

        h1{
            opacity: 0;
        }

        .h1-subcont{
            position: absolute; 
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;

            p{                
                font-family: 'Bahnschrift', sans-serif;
                font-size: ${screen >  500 ? '32px' : '28px'};
                color: ${gameStatus == 'running' ? '#BBBBBB' : 'gray'};
                transition: opacity 1s 2s, color 0.5s;
                opacity: ${gameStatus == 'intro' ? 0 : 1};
                z-index: -4;
                text-align: center;

                position: relative;
                top: ${screen > 500 ? '-16px' : '-32px'};
            }
            
            p.hide{
                opacity: 0; 
            }

            .hideable{
                ${gameStatus != 'subintro' ? "transition: opacity 0s;" : ''}
            }

            .supertitle{
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                max-width: 675px;
                width: 90%;
                min-width: 340px;
                height: 200px;
            }

            .h1{
                background-image: url('/img/title/h1.svg');
                transition: ${gameStatus == 'subintro' ? '2.5s' : '1s'};
                opacity: ${ gameStatus == 'intro' ? 0 :
                            gameStatus == 'subintro' ? 1 :
                            gameStatus == 'initial' ? 1 :
                            gameStatus == 'over' ? 1 :
                            gameStatus == 'running' ? 0 : 1};
            }
            .h1-dimm{
                background-image: url('/img/title/h1-dimm.svg');
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
        z-index: -6;
            

        div.canvas{
            background: url('/img/bg3d.webp');
            background-size: cover;
            background-position: top;
            background-repeat: no-repeat;

            display: flex;
            justify-content: start;
            align-items: center;
            flex-direction: column;
            z-index: -5;   

            canvas{
                z-index: -2;
            }
            
            .zi-dimm{
                z-index: -3;   
            }
            
            .zi-orange{
                z-index: -2;
            }
            .glimpse{
                position: absolute;
                width: 100%;
                height: calc(100% - 60px);
                
                background-size: cover;
                background-position: top;
                background-repeat: no-repeat;
                z-index: -4;
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