import { MutableRefObject } from 'react';

export interface CanvasProps {
	isInitialLoad: boolean;
	skipIntro: boolean;
	setanimateValue(arg0: number): void;
	setprocessMessage(arg0: string): void;
	setgameStatus(arg0: string): void;
	setscore(arg0: { food: number, time: number }): void;
	sideRef: MutableRefObject<HTMLElement>;
	briRef: MutableRefObject<HTMLElement>;
	nrRef: MutableRefObject<HTMLElement>;
	etRef: MutableRefObject<HTMLElement>;
	newGameBtnRef: MutableRefObject<HTMLElement>;
	dialogAvoidRef: MutableRefObject<HTMLElement>;
	dialogOhnoRef: MutableRefObject<HTMLElement>;
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
	Position: { X: any; Y: number; };
	TrailGradient: CanvasGradient;
}

export class FoodType {
	Width: number;
	Height: number;
	Color: string;
	Shadow: string;
	Blur: number;
	distance: number;
	PosX: any;
}