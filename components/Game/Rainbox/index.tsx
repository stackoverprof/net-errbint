/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import AnimatedNumber from 'animated-number-react';
import SideLeaderBoard from './SideLeaderBoard';
import { DB } from '@core/services/firebase';
import useResize from 'use-resizing';
import Canvas from './Canvas';
import Glimpse from './Glimpse';

interface Props {
	isInitialLoad: boolean
	skipIntro: boolean
}

const Rainbox = ({ isInitialLoad, skipIntro }: Props) => {
	const [processMessage, setProcessMessage] = useState('');
	const [score, setScore] = useState({ food: 0, time: 0 });
	const [gameStatus, setGameStatus] = useState('intro');
	const [animateValue, setAnimateValue] = useState(0);
	const [Leaderboard, setLeaderboard] = useState([]);
	const [UserData, setUserData] = useState({});
	const [nickname, setNickname] = useState('');
	const screen = useResize().width;
	
	const newGameBtnRef = useRef<HTMLButtonElement>(null);
	const dialogAvoidRef = useRef<HTMLDivElement>(null);
	const dialogOhnoRef = useRef<HTMLDivElement>(null);
	const sideRef = useRef<HTMLInputElement>(null);
	const briRef = useRef<HTMLImageElement>(null);
	const etRef = useRef<HTMLImageElement>(null);
	const nrRef = useRef<HTMLImageElement>(null);

	const formatValue = (value) => `${(Number(value) / 1000).toFixed(2)}`;

	const checkRank = () => {
		let rank = 1;

		Leaderboard.forEach(each => {
			if (score.food < each.score.food ||
				(score.food == each.score.food && score.time > each.score.time))
				rank++;
		});
		return rank;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let isUpdate = false;
		setProcessMessage('');

		const isScoreBigger = (userData) => {
			if (!userData.exists) return true;
			isUpdate = true;
			const old = userData.data();
			return score.food > old.score.food ||
				(score.food == old.score.food && parseInt(score.time.toString().replace('.', '')) <= old.score.time);
		};

		if (gameStatus == 'over' && /\S/.test(nickname) && nickname.match(/[0-9a-z]/i)) {
			setProcessMessage('SAVING...');

			const userData = await DB.collection('Leaderboard').doc(nickname.trim()).get();

			if (isScoreBigger(userData)) {
				DB.collection('Leaderboard').doc(nickname.trim()).set({
					nickname: nickname.trim(),
					score: {
						food: score.food,
						time: parseInt(score.time.toString().replace('.', ''))
					},
					timestamp: new Date().toDateString()
				}).then(() => {
					setProcessMessage(isUpdate ? 'UPDATED!' : 'ALL OK!');
					setScore({ food: 0, time: 0 });
					setGameStatus('recorded');
				}).catch(() => {
					setProcessMessage('ERROR!');
				});
			} else {
				setProcessMessage(' ');
				setUserData(userData.data());
			}
		} else {
			setProcessMessage('INVALID');
		}
	};

	useEffect(() => {
		const FireAction = () => {
			DB.collection('Leaderboard').orderBy('score.food', 'desc').orderBy('score.time', 'asc').onSnapshot(querySnapshot => {
				const dataSnapshot = [];
				querySnapshot.forEach(doc => {
					dataSnapshot.push({
						nickname: doc.data().nickname,
						score: {
							food: doc.data().score.food,
							time: doc.data().score.time
						}
					});
				});
				setLeaderboard(dataSnapshot);
			});
		};

		FireAction();
	}, []);

	return (
		<div className="relative z-0 full">
			<div className="relative flex-ec col full" style={{ zIndex: -6 }} id="game-container">
				<div className="relative flex-sc col w-full bg-top bg-no-repeat bg-cover" style={{ zIndex: -5, backgroundImage: 'url("/img/bg3d.webp")'}}>
					<div className="absolute inset-0 flex-cc pb-40 pointer-events-none full" style={{ zIndex: -3 }}>
						<div className="absolute flex-cc col w-full">
							<div className="bg-center bg-no-repeat bg-contain" style={{ backgroundImage: 'url("/img/title/h1-dimm.svg")', maxWidth: 675, width: '90%', minWidth: 340, height: 200}}></div>
							<div className="relative flex-cc-container" style={{ zIndex: -4, top: screen > 500 ? '-12px' : '-48px', minHeight: '38px'}}>
								<p className="pt-1 text-center transition-all font-bahn" style={{ fontSize: screen > 500 ? 32 : 24, color: {'running': '#BBBBBB'}[gameStatus] || '#0000'}}>
									A CREATIVE DEVELOPER
								</p>
							</div>
						</div>
					</div>

					<Glimpse skipIntro={skipIntro} etRef={etRef} nrRef={nrRef} briRef={briRef} />
					
					<Canvas
						setGameStatus={setGameStatus}
						skipIntro={gameStatus === 'intro' ? skipIntro : true }
						newGameBtnRef={newGameBtnRef}
						setAnimateValue={setAnimateValue}
						setProcessMessage={setProcessMessage}
						dialogAvoidRef={dialogAvoidRef}
						dialogOhnoRef={dialogOhnoRef}
						isInitialLoad={gameStatus === 'intro' ? isInitialLoad : false }
						setScore={setScore}
						sideRef={sideRef}
						briRef={briRef}
						etRef={etRef}
						nrRef={nrRef} 
					/>

					<div className="absolute inset-0 z-0 flex-cc pb-40 pointer-events-none full">
						<div className="absolute flex-cc col w-full">
							<div className={'transition-all bg-center bg-contain bg-no-repeat opacity-100'} style={{backgroundImage: 'url("/img/title/h1.svg")', maxWidth: 675, width: '90%',minWidth: 340, height: 200, transitionDuration: gameStatus === 'sub.intro' ? '2.5s' : '1s', opacity: { 'intro': '0', 'sub.intro': '1', 'ready': '1', 'over': '1', 'running': '0'}[gameStatus] || '1'}}></div>
							<div className="relative flex-cc transition-all" style={{zIndex: -4, top: screen > 500 ? '-12px' : '-48px', transition: skipIntro ? 'none' : gameStatus === 'running' || gameStatus === 'over' ? 'all 1s 2s, opacity 0s' : 'all 1s 2s', opacity: {intro: '0', running: '0'}[gameStatus] || '1', minHeight: '38px'}}>
								<p className="pt-1 text-center transition-all font-bahn" style={{fontSize: screen > 500 ? 32 : 24, color: gameStatus == 'running' ? '#BBBBBB' :	gameStatus == 'over' ? 'black' : 'gray'}}>
									{{
										'over': 'GAME OVER',
										'recorded': 'SCORE SAVED'
									}[gameStatus] || 'A CREATIVE DEVELOPER' }
								</p>
								<button className="ml-3 pointer-events-auto" ref={newGameBtnRef} style={{display: gameStatus == 'over' || gameStatus == 'recorded' ? 'unset' : 'none', fontSize: screen < 500 ? 16 : ''}}>PLAY AGAIN</button>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full bg-black" style={{height: 60}}></div>
			</div>


			<p className="absolute text-2xl top-4 left-5 font-bahn" style={{transition: '0.25s', opacity: gameStatus == 'ready' ? 0.75 : gameStatus == 'running' ? 1 : 0}}>
				<span className="text-accent">{score.food}</span>&nbsp;&nbsp;{score.time == 0 ? 0 : score.time / 100}
			</p>
			<p className="absolute text-xl right-5 font-bahn" style={{zIndex: 1, top: 18, transition: '0.25s', opacity: gameStatus == 'ready' ? 0.25 : gameStatus == 'running' ? 0.50 : gameStatus == 'over' ? 0.50 : 0.15}}>
				: : {gameStatus}
			</p>
			<div className="absolute flex-ce col text-gray-400 right-5" style={{top: 54,transition: '0.25s', opacity: gameStatus == 'running' ? 1 : 0}}>
				<p>CURRENT POSITION</p>
				<p className="text-accent">#{checkRank()}</p>
			</div>

			<div className={'absolute inset-0 pointer-events-none flex-ce full font-bahn text-gray-600'} style={{paddingBottom: 78}}>
				{{
					'over' : (
						<p className="flex-sc w-40 gap-2 whitespace-nowrap">
							<span className="text-xl text-accent">Food : {score.food}</span>
							<span className="text-xl text-black fixed-size">Time : <AnimatedNumber value={animateValue} formatValue={formatValue} duration={1000} easing={'linear'} /></span>
						</p>
					),
					'ready': (
						<p className={`text-gray-500 font-medium text-lg ${screen < 600 && 'instruction-mobile'}`}>Touch the screen <span className="text-gray-300">/</span> use arrow key to move</p>
					),
					'recorded': (
						<p className={`text-gray-500 font-medium text-lg ${screen < 600 && 'instruction-mobile'}`}>Press ENTER <span className="text-gray-300">/</span> click the button to play again</p>
					),
				}[gameStatus]}
			</div>

			<div className="absolute inset-0 flex-ce pointer-events-none full">
				<div className="absolute left-0 flex-cc pb-4 text-lg font-bold transition-all bg-center bg-no-repeat bg-cover opacity-0 bottom-28 font-bahn" style={{backgroundImage: 'url("/img/dialog/avoid.svg")', width: 261, height: 110}} ref={dialogAvoidRef}>AVOID THE RAINBOX!</div>
				<div className="absolute left-0 flex-cc pb-4 text-xl font-bold transition-all bg-center bg-no-repeat bg-cover opacity-0 bottom-28 font-bahn" style={{backgroundImage: 'url("/img/dialog/ohno.svg")', width: 158, height: 110}} ref={dialogOhnoRef}>OH NO!</div>
			</div>

			<SideLeaderBoard
				processMessage={processMessage}
				handleSubmit={handleSubmit}
				Leaderboard={Leaderboard}
				setNickname={setNickname}
				gameStatus={gameStatus}
				checkRank={checkRank}
				UserData={UserData}
				nickname={nickname}
				sideRef={sideRef}
				score={score}
			/>

		</div>
	);
};

export default Rainbox;
