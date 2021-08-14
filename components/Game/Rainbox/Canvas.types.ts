import { MutableRefObject } from 'react';

export interface CanvasProps {
	isInitialLoad: boolean;
	skipIntro: boolean;
	setAnimateValue(arg0: number): void;
	setProcessMessage(arg0: string): void;
	setGameStatus(arg0: string): void;
	setScore(arg0: { food: number, time: number }): void;
	sideRef: MutableRefObject<HTMLInputElement>;
	briRef: MutableRefObject<HTMLDivElement>;
	nrRef: MutableRefObject<HTMLDivElement>;
	etRef: MutableRefObject<HTMLDivElement>;
	newGameBtnRef: MutableRefObject<HTMLButtonElement>;
	dialogAvoidRef: MutableRefObject<HTMLDivElement>;
	dialogOhnoRef: MutableRefObject<HTMLDivElement>;
}

export class PlayerType {
	Height: number;
	Width: number;
	Shadow: string;
	RGB: { r: number; g: number; b: number; };
	RGBChange: { r: number; g: number; b: number; };
	Color: string;
	Blur: number;
	Velocity: number;
	Acceleration: number;
	shine: number;
	EatCount: number;
	TimeStart: number;
	TimeEnd: number | 'initial';
	TimeSpan: number;
	Position: { X: number; Y: number; };
}

export class RainType {
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
	Blur: number;
	distance: number;
	PosX: number;
}