import React, { useRef, useState } from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'
import useResize from 'use-resizing'

const Rainbox = () => {
    const [score, setscore] = useState({food: 0, time: 0})
    const [gameStatus, setgameStatus] = useState('intro')
    const newGameBtnRef = useRef()
    const briRef = useRef()
    const etRef = useRef()
    const nrRef = useRef()
    const screen = useResize().width

    return (
        <Wrapper gameStatus={gameStatus} screen={screen}>
            <div className="container-canvas" id="game-container">
                <div className="canvas">
                    <div className="h1-cont zi-dimm fixedfull">
                        <div className="h1-subcont">    
                            <div className="h1-dimm supertitle"></div>
                            <div className="subtitle">
                                <p className={`${screen < 500 ? 'maxw' : ''}`}>
                                    {
                                        gameStatus == 'over' ? <span>&emsp;</span> :
                                        gameStatus != 'running' ? <span>&emsp;{screen < 500 ? <br/> : '' }&emsp;</span> : 
                                        screen < 500 ? 'FULLSTACK DEVELOPER' : 'A FULLSTACK DEVELOPER'
                                    }
                                </p>                                
                            </div>
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
                    <div className="h1-cont zi-orange fixedfull">
                        <div className="h1-subcont">    
                            <div className="h1 supertitle"></div>
                            <div className={`subtitle hideable ${gameStatus == 'running' ? 'hide' : ''}`}>
                                <p className={`${screen < 500 ? 'maxw' : ''}`}>
                                    {
                                        gameStatus == 'over' ? 'GAME OVER' : 
                                        screen < 500 ? 'FULLSTACK DEVELOPER' : 'A FULLSTACK DEVELOPER'
                                    }
                                </p>
                                <button className="newgame" ref={newGameBtnRef}>PLAY AGAIN</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-filler"></div>
            </div>
            <div>
            {/* {gameStatus == 'running' || gameStatus == 'initial' && */}
            <p className="live-score"><span>{score.food}</span>&nbsp;&nbsp;{score.time == 0.00 ? 0 : score.time}</p>
            {/* } */}
            </div>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(({gameStatus, screen}) =>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -2;

    .maxw{
        max-width: 200px;
    }

    .live-score{
        opacity: ${gameStatus == 'initial' ? 0.75 : gameStatus == 'running' ? 1 : 0 };
        font-family: 'Bahnschrift';
        transition: 0.25s;
        font-size: 24px;

        margin: 16px 20px;

        span{
            color: #FF5B14;
        }
    }

    .h1-cont{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 252px;
    }    

    .h1-subcont{
        position: absolute; 
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;      

        .supertitle{
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            max-width: 675px;
            width: 90%;
            min-width: 340px;
            height: 200px;
        }

        .subtitle{
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: -4;
            position: relative;
            top: ${screen > 500 ? '-12px' : '-32px'};
            transition: 1s 2s;
            opacity: ${gameStatus == 'intro' ? 0 : 1};

            p{
                padding-top: 4px;
                font-family: 'Bahnschrift', sans-serif;
                font-size: ${screen >  500 ? '32px' : '28px'};
                text-align: center;
                transition: 0.5s;
                color: ${ gameStatus == 'running' ? '#BBBBBB' : 
                          gameStatus == 'over' ? 'black' : 'gray'};
            }
            
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
    }        

    div.canvas{
        background: url('/img/bg3d.webp');
        // <a href="https://www.freepik.com/photos/background">Background photo created by kjpargeter - www.freepik.com</a>
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
    }
        
    .zi-dimm{
        z-index: -3;
    }
    
    .zi-orange{
        z-index: 0;
        pointer-events: none;

        .hide{
            opacity: 0; 
        }
    
        .hideable{
            ${gameStatus != 'subintro' ? "transition: opacity 0s;" : ''}
        }
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

    .nav-filler{
        height: 60px;
        width: 100%;
        background: black;
    }

    button.newgame{
        display: ${gameStatus == 'over' ? 'unset' : 'none'};
        pointer-events: all;
        ${screen > 500 ? 'margin-left: 12px;' : ''}
    }
`)
    
export default Rainbox