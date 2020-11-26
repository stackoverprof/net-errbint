import React, { useRef, useState } from 'react'
import AnimatedNumber from "animated-number-react"
import useResize from 'use-resizing'
import Styled from '@emotion/styled'
import Canvas from './Canvas'

const Rainbox = () => {
    const [score, setscore] = useState({food: 0, time: 0})
    const [gameStatus, setgameStatus] = useState('intro')
    const [animateValue, setanimateValue] = useState(0)
    const dialogAvoidRef = useRef()
    const dialogOhnoRef = useRef()
    const newGameBtnRef = useRef()
    const briRef = useRef()
    const etRef = useRef()
    const nrRef = useRef()
    const screen = useResize().width

    const formatValue = (value) => `${(Number(value)/1000).toFixed(2)}`

    return (
        <Wrapper gameStatus={gameStatus} screen={screen}>
            <div className="container-canvas" id="game-container">
                <div className="canvas">
                    <div className="h1-cont zi-dimm fixedfull">
                        <div className="h1-subcont">    
                            <div className="h1-dimm supertitle"></div>
                            <div className="subtitle">
                                <p>
                                    {
                                        gameStatus == 'over' ? <span>&emsp;</span> :
                                        gameStatus != 'running' ? <span>&emsp;&emsp;</span> : 
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
                            setanimateValue={setanimateValue}
                            dialogAvoidRef={dialogAvoidRef}
                            dialogOhnoRef={dialogOhnoRef}
                            setscore={setscore} 
                            briRef={briRef}
                            etRef={etRef}
                            nrRef={nrRef}/>
                    <div className="h1-cont zi-orange fixedfull">
                        <div className="h1-subcont">    
                            <div className="h1 supertitle"></div>
                            <div className={`subtitle hideable ${gameStatus == 'running' ? 'hide' : ''}`}>
                                <p>
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

            
            <p className="live-score">
                <span>{score.food}</span>&nbsp;&nbsp;{score.time == 0.00 ? 0 : score.time}
            </p>
            <p className="game-status">
                : : {gameStatus}
            </p>
            
            <div className="final-score fixedfull">
                {
                gameStatus == 'over' ?
                <>
                    <p className="score"><span className="orange">Food : {score.food}</span>&nbsp;&nbsp;Time :&nbsp;</p>
                    <p className="fixed-size"><AnimatedNumber value={animateValue} formatValue={formatValue} duration={1000} easing={'linear'} /></p>
                </> 
                :
                gameStatus == 'initial' ?
                    <p className={`instruction ${screen < 600 && 'instruction-mobile'}`}>Touch the screen <span className="light-gray">/</span> use arrow key to move</p>
                :
                    <p></p>
                }
            </div>
            <div className="dialog-cont fixedfull">
                <div className="dialog-avoid" ref={dialogAvoidRef}>AVOID THE RAINBOX!</div>
                <div className="dialog-ohno" ref={dialogOhnoRef}>OH NO!</div>
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
    
    .dialog-cont{
        display: flex;
        justify-content: center;
        align-items: flex-end;


        .dialog-avoid{
            position: fixed;
            bottom: 118px;
            left: 0;

            background-image: url('/img/dialog/avoid.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 261px;
            height: 110px;
            display: none;
            justify-content: center;
            align-items: center;
            padding-bottom: 16px;
            
            opacity: ${gameStatus == 'initial' ? 1 : 0};
            transition: opacity 3s;

            font-size: 18px;
            font-weight: bold;
        }
        .dialog-ohno{
            position: fixed;
            bottom: 118px;
            left: 0;

            background-image: url('/img/dialog/ohno.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 158px;
            height: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 16px;
            // opacity: 0;
            visibility: hidden;
            // transition: opacity 3s 1s;

            font-size: 22px;
            font-weight: bold;
        }
    }

    .maxw{
        max-width: 200px;
    }

    .instruction{
        color: gray;
        font-weight: 500;
        font-size: 18px;
        
        span.light-gray{
            color: #CCCCCC;
        }
    }
    
    .instruction-mobile{
        width: 40%;
        min-width: 164px; 
        text-align: right !important; 
        margin-right: 10%;
        font-size: 16px;
        position: relative;
        top: 6px;
    }

    .final-score{
        display: flex;
        justify-content: ${screen < 600 && gameStatus != 'over' ? 'flex-end' : 'center'};
        align-items: flex-end;

        padding-bottom: 78px;

        font-family: 'Bahnschrift';
        font-weight: 500;
        font-size: 16pt;

        p{
            text-align: center;
        }

        span.orange{
            color: #FF5B14;
        }

        p.fixed-size{
            min-width: 50px;
            text-align: left;
        }
    }

    .live-score{
        position: fixed;
        opacity: ${gameStatus == 'initial' ? 0.75 : gameStatus == 'running' ? 1 : 0 };
        transition: 0.25s;
        top: 16px;
        left: 20px;
        
        font-family: 'Bahnschrift';
        font-size: 24px;
        
        span{
            color: #FF5B14;
        }
    }
    
    .game-status{
        position: fixed;
        opacity: ${gameStatus == 'initial' ? 0.25 : gameStatus == 'running' ? 0.50 : gameStatus == 'over' ? 0.50 : 0.15 };
        transition: 0.25s;
        top: 18px;
        right: 20px;
        
        font-family: 'Bahnschrift';
        font-size: 20px;
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
            top: ${screen > 500 ? '-12px' : '-48px'};
            transition: 1s 2s;
            opacity: ${gameStatus == 'intro' ? 0 : 1};

            min-height: 38px;

            p{
                padding-top: 4px;
                font-family: 'Bahnschrift', sans-serif;
                font-size: ${screen >  500 ? '32px' : '24px'};
                text-align: center;
                transition: 0.5s;
                color: ${ gameStatus == 'running' ? '#BBBBBB' : 
                          gameStatus == 'over' ? 'black' : 'gray'};
            }
            
        }

        .h1{
            background-image: url('/img/title/h1.svg');
            transition: ${gameStatus == 'sub.intro' ? '2.5s' : '1s'};
            opacity: ${ gameStatus == 'intro' ? 0 :
                        gameStatus == 'sub.intro' ? 1 :
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
            ${gameStatus != 'sub.intro' ? "transition: opacity 0s;" : ''}
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
        margin-left: 12px;
        ${screen < 500 && 'font-size: 16px;'}
    }
`)
    
export default Rainbox