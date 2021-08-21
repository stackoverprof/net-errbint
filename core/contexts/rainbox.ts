import { useRef, useState } from 'react';
import { EnumGameStatus, LeaderboardType, RainboxStoreType, ScoreType, UserDataType } from './rainbox.types';

const RainboxStore = (): RainboxStoreType => {
	const [processMessage, setProcessMessage] = useState('');
	const [score, setScore] = useState<ScoreType>({ food: 0, time: 0 });
	const [gameStatus, setGameStatus] = useState<EnumGameStatus>('intro');
	const [animateValue, setAnimateValue] = useState(0);
	const [Leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
	const [UserData, setUserData] = useState<UserDataType>({});
	const [nickname, setNickname] = useState('');

	const newGameBtnRef = useRef<HTMLButtonElement>(null);
	const dialogAvoidRef = useRef<HTMLDivElement>(null);
	const dialogOhnoRef = useRef<HTMLDivElement>(null);
	const sideRef = useRef<HTMLInputElement>(null);
	const briRef = useRef<HTMLImageElement>(null);
	const etRef = useRef<HTMLImageElement>(null);
	const nrRef = useRef<HTMLImageElement>(null);

	return {
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