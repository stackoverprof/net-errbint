import { MutableRefObject } from 'react';

export interface CanvasProps {
	responsive: {
		width(arg0: Window & typeof globalThis): number,
		height(arg0: Window & typeof globalThis): number
	};
	skipIntro: boolean;
	setAnimateValue(arg0: number): void;
	setProcessMessage(arg0: string): void;
	setGameStatus(arg0: string): void;
	setScore(arg0: { food: number, time: number }): void;
	sideRef: MutableRefObject<HTMLInputElement>;
	briRef: MutableRefObject<HTMLImageElement>;
	nrRef: MutableRefObject<HTMLImageElement>;
	etRef: MutableRefObject<HTMLImageElement>;
	newGameBtnRef: MutableRefObject<HTMLButtonElement>;
	dialogAvoidRef: MutableRefObject<HTMLDivElement>;
	dialogOhnoRef: MutableRefObject<HTMLDivElement>;
}

export type EnumDirection = 'idle' | 'left' | 'right';

export class EnvironmentType {
	FPS: number;
	REALTIME: number;
	IS_EXECUTED: boolean;
	canvas: HTMLCanvasElement;
	area: HTMLElement;
	ctx: CanvasRenderingContext2D;
	screenWidth: number;
	screenHeight: number;
	isTabInactive: boolean;
	THEME: any;
}
export class ControlType {
	CONTROL_DIRECTION: EnumDirection;
	isRightPressed: boolean;
	isLeftPressed: boolean;
	newGameBtn: HTMLButtonElement;
	right: HTMLDivElement;
	left: HTMLDivElement;
	isRightTouched: boolean;
	isLeftTouched: boolean;
}
export class PlayerType {
	Height: number;
	Width: number;
	Shadow: string;
	Color: string;
	Blur: number;
	IsAppearing: boolean;
	Velocity: number;
	IsAlive: boolean;
	Acceleration: number;
	Emphasis: { alpha: number, direction: 'up' | 'down' };
	Shine: number;
	EatCount: number;
	TimeStart: number | 'initial';
	TimeEnd: number | 'initial';
	TimeSpan: number;
	Position: { X: number; Y: number; };
}

export class RainType {
	Colortrail0: any;
	Colortrail1: string;
	Colorbox: string;
	AdditionalSpeed: number;
	Base: number;
	Size: number;
	Height: number;
	Width: number;
	Velocity: number;
	Index: number;
	Position: { X: number; Y: number; };
	TrailGradient: CanvasGradient;
}

export class FoodType {
	Width: number;
	Height: number;
	Color: string;
	Shadow: string;
	IsAppearing: boolean;
	Blur: number;
	distance: number;
	PosX: number;
}