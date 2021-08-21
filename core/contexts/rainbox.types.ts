export interface RainboxStoreType {
	processMessage: string
	score: ScoreType
	gameStatus: EnumGameStatus
	animateValue: number
	Leaderboard: LeaderboardType[]
	UserData: UserDataType
	nickname: string
	setProcessMessage(arg0: string): void
	setScore(arg0: ScoreType): void
	setGameStatus(arg0: EnumGameStatus): void
	setAnimateValue(arg0: number): void
	setLeaderboard(arg0: LeaderboardType[]): void
	setUserData(arg0: UserDataType): void
	setNickname(arg0: string): void
	newGameBtnRef: React.MutableRefObject<HTMLButtonElement>
	dialogAvoidRef: React.MutableRefObject<HTMLDivElement>
	dialogOhnoRef: React.MutableRefObject<HTMLDivElement>
	sideRef: React.MutableRefObject<HTMLInputElement>
	briRef: React.MutableRefObject<HTMLImageElement>
	etRef: React.MutableRefObject<HTMLImageElement>
	nrRef: React.MutableRefObject<HTMLImageElement>
}

export interface ScoreType {
	food: number
	time: number
}

export type LeaderboardType = any
export type UserDataType = any

export type EnumGameStatus = 'intro' | 'sub_intro' | 'ready' | 'running' | 'over' | 'recorded'