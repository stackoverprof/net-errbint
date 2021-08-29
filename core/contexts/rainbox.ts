import { DB } from '@core/services/firebase';
import { useRef, useState } from 'react';
import { EnumGameStatus, LeaderboardType, RainboxStoreType, ScoreType, UserDataType } from './rainbox.types';

const RainboxStore = (): RainboxStoreType => {
	const [gameStatus, setGameStatus] = useState<EnumGameStatus>('intro');
	const [Leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
	const [UserData, setUserData] = useState<UserDataType>({ });
	const [score, setScore] = useState<ScoreType>({ food: 0, time: 0 });
	const [processMessage, setProcessMessage] = useState('');
	const [animateValue, setAnimateValue] = useState(0);
	const [nickname, setNickname] = useState('');

	const newGameBtnRef = useRef<HTMLButtonElement>(null);
	const dialogAvoidRef = useRef<HTMLDivElement>(null);
	const dialogOhnoRef = useRef<HTMLDivElement>(null);
	const sideRef = useRef<HTMLInputElement>(null);
	const briRef = useRef<HTMLImageElement>(null);
	const etRef = useRef<HTMLImageElement>(null);
	const nrRef = useRef<HTMLImageElement>(null);

	const checkRank = () => {
		let rank = 1;

		Leaderboard.forEach(each => {
			if (score.food < each.score.food ||
				(score.food === each.score.food && score.time > each.score.time))
				rank++;
		});
		return rank;
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		let isUpdate = false;
		setProcessMessage('');

		const isScoreBigger = (userData) => {
			if (!userData.exists) return true;
			isUpdate = true;
			const old = userData.data();
			return score.food > old.score.food ||
				(score.food === old.score.food && parseInt(score.time.toString().replace('.', '')) <= old.score.time);
		};

		if (gameStatus === 'over' && /\S/.test(nickname) && nickname.match(/[0-9a-z]/i)) {
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

	const fireAction = () => {
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

	return {
		checkRank,
		handleSubmit,
		fireAction,

		processMessage,
		score,
		gameStatus,
		animateValue,
		Leaderboard,
		UserData,
		nickname,

		setProcessMessage,
		setScore,
		setGameStatus,
		setAnimateValue,
		setLeaderboard,
		setUserData,
		setNickname,

		newGameBtnRef,
		dialogAvoidRef,
		dialogOhnoRef,
		sideRef,
		briRef,
		etRef,
		nrRef,
	};
};

export default RainboxStore;