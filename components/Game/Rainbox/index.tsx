/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import AnimatedNumber from 'animated-number-react';
import SideLeaderBoard from './SideLeaderBoard';
import { DB } from '@core/services/firebase';
import useResize from 'use-resizing';
import Canvas from './Canvas';
import Glimpse from './Glimpse';
import { useRainbox } from '@core/contexts';
import SupertitleBack from './SupertitleBack';
import SupertitleFront from './SupertitleFront';

interface Props {
	skipIntro: boolean
}

const Rainbox = ({ skipIntro }: Props) => {
	const { 
		score,
		gameStatus,
		animateValue,
		Leaderboard,
		nickname,
	} = useRainbox();

	const { 
		setProcessMessage,
		setScore,
		setGameStatus,
		setLeaderboard,
		setUserData,
	} = useRainbox();
	
	const { 
		dialogAvoidRef,
		dialogOhnoRef,
		briRef,
		etRef,
		nrRef,
	} = useRainbox();
	
	const screen = useResize().width;


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
		<div className="relative z-0 overflow-hidden" style={{ height: screen > 639 ? 'calc(100vh - 60px)' : 500}}>
			<div className="relative flex-sc col full bg-top bg-no-repeat bg-cover" style={{ zIndex: -5, backgroundImage: 'url("/img/bg3d.webp")'}}>
				<SupertitleBack />
				<Glimpse skipIntro={skipIntro} etRef={etRef} nrRef={nrRef} briRef={briRef} />
				<Canvas
					responsive={{
						width: window => window.innerWidth,
						height: window => window.innerWidth > 629 ? window.innerHeight - 60 : 500
					}}
					skipIntro={gameStatus === 'intro' ? skipIntro : true}
				/>
				<SupertitleFront skipIntro={skipIntro} />
			</div>


			<p className="absolute text-2xl top-4 left-5" style={{transition: '0.25s', opacity: gameStatus == 'ready' ? 0.75 : gameStatus == 'running' ? 1 : 0}}>
				<span className="text-accent">{score.food}</span>&nbsp;&nbsp;{score.time == 0 ? 0 : score.time / 100}
			</p>
			<p className="absolute text-xl right-5" style={{zIndex: 1, top: 18, transition: '0.25s', opacity: gameStatus == 'ready' ? 0.25 : gameStatus == 'running' ? 0.50 : gameStatus == 'over' ? 0.50 : 0.15}}>
				: : {gameStatus}
			</p>
			<div className="absolute flex-ce col text-gray-400 right-5" style={{top: 54,transition: '0.25s', opacity: gameStatus == 'running' ? 1 : 0}}>
				<p>CURRENT POSITION</p>
				<p className="text-accent">#{checkRank()}</p>
			</div>

			<div className="absolute inset-0 pointer-events-none flex-ce full text-gray-600 pb-4">
				{{
					'over' : (
						<p className="flex-sc w-40 gap-2 whitespace-nowrap">
							<span className="text-xl text-accent">Food : {score.food}</span>
							<span className="text-xl text-black fixed-size">Time : <AnimatedNumber value={animateValue} formatValue={formatValue} duration={1000} easing={'linear'} /></span>
						</p>
					),
					'ready': (
						<div className="w-full flex-cc -sm:flex-ec -sm:w-9/12">
							<p className={`text-gray-500 font-medium text-lg -sm:w-48 -sm:text-right -sm:text-sm ${screen < 600 && 'instruction-mobile'}`}>Touch the screen <span className="text-gray-300">/</span> use arrow key to move</p>
						</div>
					),
					'recorded': (
						<p className={`text-gray-500 font-medium text-lg ${screen < 600 && 'instruction-mobile'}`}>Press ENTER <span className="text-gray-300">/</span> click the button to play again</p>
					),
				}[gameStatus]}
			</div>

			<div className="absolute inset-0 flex-ce pointer-events-none full">
				<div className="absolute left-0 flex-cc pb-4 text-lg font-bold transition-all bg-center bg-no-repeat bg-cover opacity-0" style={{backgroundImage: 'url("/img/dialog/avoid.svg")', bottom: 52, width: 261, height: 110}} ref={dialogAvoidRef}>AVOID THE RAINBOX!</div>
				<div className="absolute left-0 flex-cc pb-4 text-xl font-bold transition-all bg-center bg-no-repeat bg-cover opacity-0" style={{backgroundImage: 'url("/img/dialog/ohno.svg")', bottom: 52, width: 158, height: 110}} ref={dialogOhnoRef}>OH NO!</div>
			</div>

			<SideLeaderBoard handleSubmit={handleSubmit} checkRank={checkRank} />

		</div>
	);
};

export default Rainbox;
