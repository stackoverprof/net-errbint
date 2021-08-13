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
	TimeEnd: string;
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