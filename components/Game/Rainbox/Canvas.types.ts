export interface CanvasProps {
	responsive: {
		width(arg0: Window & typeof globalThis): number;
		height(arg0: Window & typeof globalThis): number;
	};
	skipIntro: boolean;
}

export type EnumDirection = 'idle' | 'left' | 'right';

export class SceneInterface {
	FPS: number;
	REALTIME: number;
	el: {
		side: HTMLInputElement;
		bri: HTMLImageElement;
		nr: HTMLImageElement;
		et: HTMLImageElement;
		newGameBtn: HTMLButtonElement;
		avoid: HTMLDivElement;
		ohno: HTMLDivElement;
		rightTouch: HTMLDivElement;
		leftTouch: HTMLDivElement;
		canvas: HTMLCanvasElement;
	};
	IS_EXECUTED: boolean;
	ctx: CanvasRenderingContext2D;
	screenWidth: number;
	screenHeight: number;
	isTabInactive: boolean;
	THEME: any;
}
export class ControlInterface {
	CONTROL_DIRECTION: EnumDirection;
	isRightPressed: boolean;
	isLeftPressed: boolean;
	newGameBtn: HTMLButtonElement;
	right: HTMLDivElement;
	left: HTMLDivElement;
	isRightTouched: boolean;
	isLeftTouched: boolean;
}
export class PlayerInterface {
	Height: number;
	Width: number;
	Shadow: string;
	Color: string;
	Blur: number;
	IsAppearing: boolean;
	Velocity: number;
	IsAlive: boolean;
	Acceleration: number;
	Emphasis: { alpha: number; direction: 'up' | 'down' };
	Shine: number;
	EatCount: number;
	TimeStart: number | 'initial';
	TimeEnd: number | 'initial';
	TimeSpan: number;
	Position: { X: number; Y: number };
}

export class RainInterface {
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
	Position: { X: number; Y: number };
	TrailGradient: CanvasGradient;
}

export class FoodInterface {
	Width: number;
	Height: number;
	Color: string;
	Shadow: string;
	IsAppearing: boolean;
	Blur: number;
	distance: number;
	PosX: number;
}
