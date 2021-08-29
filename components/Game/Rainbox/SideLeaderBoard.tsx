import React from 'react';
import Styled from '@emotion/styled';
import useResize from 'use-resizing';
import { useRainbox } from '@core/gameContext';

const SideLeaderBoard = () => {
	const { checkRank, handleSubmit, Leaderboard, UserData, processMessage, score, gameStatus, sideRef, nickname, setNickname } = useRainbox();
	const screen = useResize().width;

	return (
		<Wrapper gameStatus={gameStatus} screen={screen}>
			<div className="side-leaderboard-cont pointer-events-none absolute overflow-hidden full inset-0">

				<div className="side-leaderboard">
					<div className="upper">
						<p className="title-leaderboard">LEADERBOARD</p>
						<div className="linesepar"></div>
						<div className="the-leaderboard">
							{Leaderboard.slice(0, checkRank() < 11 && gameStatus === 'over' ? 9 : 10).map((each, i) => (
								<div key={i} >
									{(gameStatus === 'over' && checkRank() === i + 1) &&
										<div className="newscore">
											<div className="linesepar-org"></div>
											<div className="eachLead">
												<div className="nick">
													<p className="orange num">{checkRank()}.</p>
													<p className="orange name">NEW SCORE</p>
												</div>
												<div>
													<p><span className="gray">{score.time / 100} &ensp;</span></p>
													<p><span className="orange food">{score.food}</span></p>
												</div>
											</div>
											<div className="linesepar-org"></div>
										</div>
									}
									<div className="eachLead" style={{ transitionDelay: gameStatus === 'over' ? 0.75 + 0.10 * i + 's' : '0s' }}>
										<div className="nick">
											{gameStatus === 'over' ?
												<p className="num">{checkRank() > i + 1 ? i + 1 : i + 2}.</p>
												:
												<p className="num">{i + 1}.</p>
											}
											<p className="name">{each.nickname}</p>
										</div>
										<div>
											<p><span className="gray">{each.score.time / 100} &ensp;</span></p>
											<p><span className="orange food">{each.score.food}</span></p>
										</div>
									</div>
								</div>
							))}
							{(gameStatus === 'over' && checkRank() === 10) &&
								<div className="newscore">
									<div className="linesepar-org"></div>
									<div className="eachLead">
										<div className="nick">
											<p className="orange num">{checkRank()}.</p>
											<p className="orange name">NEW SCORE</p>
										</div>
										<div>
											<p><span className="gray">{score.time / 100} &ensp;</span></p>
											<p><span className="orange food">{score.food}</span></p>
										</div>
									</div>
									<div className="linesepar-org"></div>
								</div>
							}

							{Leaderboard.length === 0 && <p className="no-connection">CONNECTION ERROR</p>}
						</div>
					</div>

					<div className="lower">
						<form onSubmit={handleSubmit}>
							<div className="input">
								<input type="text" onChange={(e) => setNickname(e.target.value.toUpperCase())} value={nickname} ref={sideRef} placeholder="Enter a Nickname" maxLength={10} />
								<p><span className="orange">{score.food}</span>&ensp;{score.time / 100}</p>
							</div>
							<div>
								<button type="submit" className={`${gameStatus === 'recorded' ? 'disabled' : ''}`} disabled={gameStatus === 'recorded'}>{gameStatus != 'recorded' ? 'SAVE SCORE' : 'SCORE SAVED'}</button>
								<p className="process">
									{processMessage === '' ? `RANK #${checkRank()}` : processMessage}
								</p>
							</div>
							{processMessage === ' ' &&
								<p>{`Sorry, ${UserData.nickname} already got a higher score!`}</p>
							}
						</form>
					</div>

				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = Styled.div(({ gameStatus, screen }: any) => `


    .side-leaderboard-cont{
            display: flex;
            justify-content: flex-end;
            align-items: center;

            height: calc(100% - 60px);
            pointer-events: none;
        }
        .side-leaderboard{
            height: 100%;
            width: 288px;
            position: relative;
            right: ${gameStatus === 'over' || gameStatus === 'recorded' ? '0' : '-292px'};

            transition: 1s;
            padding: 20px ${screen < 600 ? 24 : 40}px 24px 24px;
            backdrop-filter: blur(8px);
            box-shadow: -4px 0 4px rgba(0,0,0,0.15);
            pointer-events: all;
            background: linear-gradient(0deg, rgba(255,255,255,0.7) 11%, rgba(255,255,255,0) 37%);

            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-direction: column;

            p.title-leaderboard{
                font-size: 18px;
                text-shadow: 0 0 0.5px rgb(0, 0, 0);
                // opacity: ${gameStatus === 'over' || gameStatus === 'recorded' ? 1 : 0};
                // transition: opacity 1s ${gameStatus === 'over' ? '.25s' : '0s'};
            }
        }
        

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
            opacity: ${gameStatus === 'over' ? 1 : 0};
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
    
`);

export default SideLeaderBoard;