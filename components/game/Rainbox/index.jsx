import React, { useEffect, useRef, useState } from 'react'
import AnimatedNumber from "animated-number-react"
import SideLeaderBoard from './SideLeaderBoard'
import { DB } from '../../../core/services/firebase'
import useResize from 'use-resizing'
import Styled from '@emotion/styled'
import Canvas from './Canvas'

const Rainbox = ({isServer}) => {
    const [processMessage, setprocessMessage] = useState('')
    const [score, setscore] = useState({food: 0, time: 0})
    const [gameStatus, setgameStatus] = useState('intro')
    const [animateValue, setanimateValue] = useState(0)
    const [Leaderboard, setLeaderboard] = useState([])
    const [UserData, setUserData] = useState({})
    const [nickname, setnickname] = useState('')
    const screen = useResize().width
    const dialogAvoidRef = useRef()
    const dialogOhnoRef = useRef()
    const newGameBtnRef = useRef()
    const sideRef = useRef()
    const briRef = useRef()
    const etRef = useRef()
    const nrRef = useRef()

    const formatValue = (value) => `${(Number(value)/1000).toFixed(2)}`

    const checkRank = () => {
        let rank = 1
        // console.log(parseInt(toString(score.time).replace(".","")))
        // console.log(score.time.replace(".",""))
        Leaderboard.forEach( each => {
            if(score.food < each.score.food || 
            (score.food == each.score.food && score.time > each.score.time))
            rank++
            // console.log(each.nickname + 'cek' + rank)
            // console.log((score.food == each.score.food && parseInt(toString(score.time).replace(".","")) > each.score.time))
            // console.log((parseInt(toString(score.time).replace(".","")) + " > " + each.score.time))
        })
        return rank
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let isUpdate = false
        setprocessMessage('')
        
        const isScoreBigger = (userData) => {
            if (!userData.exists) return true
            isUpdate = true
            const old = userData.data()
            return score.food > old.score.food || 
            (score.food == old.score.food && parseInt(score.time.replace(".", "")) <= old.score.time)
        }
        
        if(gameStatus == 'over' && /\S/.test(nickname) && nickname.match(/[0-9a-z]/i)){
            setprocessMessage('SAVING...')

            const userData = await DB.collection('Leaderboard').doc(nickname.trim()).get()
            
            if (isScoreBigger(userData)) {   
                DB.collection('Leaderboard').doc(nickname.trim()).set({
                    nickname : nickname.trim(),
                    score : {
                        food : score.food,
                        time : parseInt(score.time.replace('.',''))
                    },
                    timestamp: new Date().getTime()
                }).then(() => {
                    setprocessMessage(isUpdate ? 'UPDATED!' : 'ALL OK!')
                    setscore({food: 0, time: 0})
                    setgameStatus('recorded')
                }).catch(() => {
                    setprocessMessage('ERROR!')
                })
            }else{
                setprocessMessage(' ')
                setUserData(userData.data())
            }
        } else {
            setprocessMessage('INVALID')
        }
    }

    useEffect(() => {           

        const FireAction = () => {
            DB.collection('Leaderboard').orderBy("score.food", "desc").orderBy("score.time", "asc").onSnapshot(querySnapshot => {
                var dataSnapshot = []
                querySnapshot.forEach(doc => {
                    dataSnapshot.push({
                        nickname:doc.data().nickname,
                        score: {
                            food: doc.data().score.food,
                            time: doc.data().score.time
                        }
                    })
                })
                setLeaderboard(dataSnapshot)
            })
        }

        FireAction()
    }, [])

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
                                        screen < 500 ? 'CREATIVE DEVELOPER' : 'A CREATIVE DEVELOPER'
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
                            setprocessMessage={setprocessMessage}
                            dialogAvoidRef={dialogAvoidRef}
                            dialogOhnoRef={dialogOhnoRef}
                            isServer={isServer}
                            setscore={setscore} 
                            sideRef={sideRef}
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
                                        gameStatus == 'recorded' ? 'SCORE SAVED' : 
                                        screen < 500 ? 'CREATIVE DEVELOPER' : 'A CREATIVE DEVELOPER'
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
                <span>{score.food}</span>&nbsp;&nbsp;{score.time == 0 ? 0 : score.time/100}
            </p>
            <p className="game-status">
                : : {gameStatus}
            </p>
            <div className="live-position">
                <p>CURRENT POSITION</p>
                <p className="orange">#{checkRank()}</p>
            </div>
            
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
                gameStatus == 'recorded' ?
                    <p className={`instruction ${screen < 600 && 'instruction-mobile'}`}>Press ENTER <span className="light-gray">/</span> click the button to play again</p>
                :
                    <p></p>
                }
            </div>

            <div className="dialog-cont fixedfull">
                <div className="dialog-avoid" ref={dialogAvoidRef}>AVOID THE RAINBOX!</div>
                <div className="dialog-ohno" ref={dialogOhnoRef}>OH NO!</div>
            </div>

            <SideLeaderBoard 
                processMessage={processMessage}
                handleSubmit={handleSubmit}
                Leaderboard={Leaderboard}
                setnickname={setnickname}
                gameStatus={gameStatus}
                checkRank={checkRank}
                UserData={UserData}
                nickname={nickname}
                sideRef={sideRef}
                score={score}
            />

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

    .orange{
        color: #FF5B14 !important;
    }
    .gray{
        color: gray;
    }
    .upper{
        width: 100%;
    }

    .live-position{
        position: fixed;
        top: 54px;
        right: 20px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
        color: gray;

        opacity: ${gameStatus == 'running' ? 1 : 0 };
        transition: 0.25s;
    }

    .linesepar{
        height: 1px;
        width: 100%;
        background: black;
        margin: 16px 0;
        opacity: .2;
    }

    .the-leaderboard{
        margin-top: 24px;
        width: 100%;

        .eachLead{
            position: relative;
            top: ${gameStatus == 'over' || gameStatus == 'recorded' ? 0 : 12}px;
            opacity: ${gameStatus == 'over' || gameStatus == 'recorded' ? 1 : 0};
            transition: opacity 1s, top 0.5s ${gameStatus == 'over' || gameStatus == 'recorded' ? '0s' : '1s !important'};
      
            display: flex;
            justify-content: space-between;
            align-items: center;

            div{
                display: flex;
                justify-content: space-between;
                align-items: center;

                min-width: 68px;

            }
        }

        p{
            // width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            color: #555;

            &:hover{        
                color: #FF5B14;
            }
        }
    }

    form{
        div.input{
            background-color: rgba(0,0,0,0);
            border: none;
            border-bottom: solid 1px black;
            width: 100%;
            margin-bottom: 12px;

            p{
                font-size: 18px;
                color: black;
                width: 100%;
                text-align: right;
            }
        }
        input{
            background-color: rgba(0,0,0,0);
            border: none;;
            width: 100%;
            min-width: 140px;

            font-family: Bahnschrift;
            font-size: 18px;
            padding: 8px 0;
        }

        div{
            display: flex;
            justify-content: space-between;
            align-items: center;

            p{
                margin: 0;
                font-size: 16px;
            }
        }
        
        p{
            color: gray;
            margin-top: 12px;
            font-size: 14px;
            max-width: 164px;
        }

        button{
            margin: 12px 0;
            transition: background .2s, color .2s;
            min-width: 116px;
            width: 116px;
            max-width: 116px;
            min-height: 36px;
            height: 36px;
            max-height: 36px;
            font-size: 16px;
            padding: ${gameStatus == 'recorded' ? '10px 2px 8px 2px' : '10px 10px 8px 10px'};
        }
    }

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
        z-index: 1;
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
        background-image: url('/img/glimpse/bri.webp');
    }
    .et{
        background-image: url('/img/glimpse/et.webp');
    }
    .nr{
        background-image: url('/img/glimpse/nr.webp');
    }

    .nav-filler{
        height: 60px;
        width: 100%;
        background: black;
    }

    button.newgame{
        display: ${gameStatus == 'over' || gameStatus == 'recorded'? 'unset' : 'none'};
        pointer-events: all;
        margin-left: 12px;
        ${screen < 500 && 'font-size: 16px;'}
    }
`)
    
export default Rainbox
