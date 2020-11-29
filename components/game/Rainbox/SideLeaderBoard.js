import React from 'react'
import Styled from '@emotion/styled'
    
const SideLeaderBoard = ({Leaderboard, UserData, checkRank, processMessage, score, gameStatus, sideRef, nickname, setnickname, handleSubmit}) => {
    return (
        <Wrapper gameStatus={gameStatus}>
            <div className="side-leaderboard-cont fixedfull">

                <div className="side-leaderboard">
                    <div className="upper">
                        <p className="title-leaderboard">LEADERBOARD</p>
                        <div className="linesepar"></div>
                        <div className="the-leaderboard">
                            {Leaderboard.slice(0, checkRank() < 11 && gameStatus == 'over' ? 9 : 10).map((each, i)=>(
                                <div key={i} >
                                    <div className={`rank${i+1} eachLead`} style={{transitionDelay : gameStatus == 'over' ? 0.75 + 0.10*i +'s' : '0s'}}>
                                        <div className="nick">
                                            {gameStatus == 'over' ? 
                                                <p className="num">{checkRank() > i+1? i+1 : i+2}.</p>
                                                :
                                                <p className="num">{i+1}.</p>
                                            }
                                            <p className="name">{each.nickname}</p>
                                        </div>
                                        <div>
                                            <p><span className="gray">{each.score.time/100} &ensp;</span></p>
                                            <p><span className="orange food">{each.score.food}</span></p>
                                        </div>
                                    </div>
                                    {(gameStatus == 'over' && checkRank() == i+2 )&&
                                        <div className="newscore">
                                            <div className="linesepar-org"></div>
                                            <div className={`rank${i+1} eachLead`} style={{transitionDelay : gameStatus == 'over' ? 0.75 + 0.10*i +'s' : '0s'}}>
                                                <div className="nick">
                                                    <p className="orange num">{checkRank()}.</p>
                                                    <p className="orange name">NEW SCORE</p>
                                                </div>
                                                <div>
                                                    <p><span className="gray">{parseInt(score.time)/100} &ensp;</span></p>
                                                    <p><span className="orange food">{score.food}</span></p>
                                                </div>
                                            </div>
                                            <div className="linesepar-org"></div>
                                        </div>
                                    }
                                </div>
                            ))}
                            {Leaderboard.length == 0 && <p className="no-connection">CONNECTION ERROR</p>}
                        </div>
                    </div>

                    <div className="lower">
                        <form onSubmit={handleSubmit}>
                            <div className="input">
                                <input type="text" onChange={(e)=> setnickname(e.target.value.toUpperCase())} value={nickname} ref={sideRef} placeholder="Enter a Nickname" maxLength="10"/>
                                <p><span className="orange">{score.food}</span>&ensp;{score.time}</p>
                            </div>
                            <div>
                                <button type="submit" className={`${gameStatus == "recorded" ? 'disabled' : ''}`} disabled={gameStatus == 'recorded'}>{gameStatus != 'recorded' ? 'SAVE SCORE' : 'SCORE SAVED'}</button>
                                <p className="process">
                                    {processMessage}
                                </p>
                            </div>
                            {processMessage == ' ' && 
                                <p>{`Sorry, ${UserData.nickname} already got a higher score!`}</p>
                            }
                        </form>
                    </div>
                    
                </div>
            </div>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(({gameStatus}) =>`

.no-connection{
    width: 100%;
    display: inline-block !important;
    text-align: center;
}

.newscore{
    margin-bottom: 8px;
    
    p{
        margin: 8px 0;
    }
    .linesepar-org{
        opacity: ${gameStatus == 'over' ? 1 : 0};
        transition: 1s;
        // transition-delay: 0.5s;
        height: 1px;
        width: 100%;
        background: #FF5B1444;
    }
}

.nick{
    display: flex;
    justify-content: flex-start !important;
    align-items: center;

    .name{
        color: black;
    }
    
    .num{
        width: 20px;
        color: gray;
        text-align: right;

        &:hover{
            color: gray;
        }

        &:hover + .name{
            color: #FF5B14;
        }
    }

}
    
`)
    
export default SideLeaderBoard