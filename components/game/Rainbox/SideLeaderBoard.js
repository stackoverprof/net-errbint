import React from 'react'
import Styled from '@emotion/styled'
    
const SideLeaderBoard = ({Leaderboard, UserData, processMessage, score, gameStatus, sideRef, nickname, setnickname, handleSubmit}) => {
    return (
        <Wrapper>
            <div className="side-leaderboard-cont fixedfull">

                <div className="side-leaderboard">
                    <div className="upper">
                        <p className="title-leaderboard">LEADERBOARD</p>
                        <div className="linesepar"></div>
                        <div className="the-leaderboard">
                            {Leaderboard.slice(0, 10).map((each, i)=>(
                                <div key={i} className={`rank${i+1} eachLead`} style={{transitionDelay : gameStatus == 'over' ? 0.75 + 0.10*i +'s' : '0s'}}>
                                    <p>{each.nickname}</p>
                                    <div>
                                        <p><span className="gray">{each.score.time/100} &ensp;</span></p>
                                        <p><span className="orange food">{each.score.food}</span></p>
                                    </div>
                                </div>
                            ))}
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
    
const Wrapper = Styled.div(() =>`
    
`)
    
export default SideLeaderBoard