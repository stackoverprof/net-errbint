import React, { useRef, useEffect, useMemo } from 'react';
import { PlayerType, RainType, FoodType, CanvasProps, EnumDirection} from './Canvas.types';
import { useLayout } from '@core/contexts/index';
import { GameTheme } from './theme';

// [TODO] : di hape masi ga nyaman, secara responsivitas

const Canvas = (props: CanvasProps) => {
	const {
		isInitialLoad,
		skipIntro,
		setAnimateValue,
		setProcessMessage,
		setGameStatus,
		setScore,
		sideRef,
		briRef,
		nrRef,
		etRef,
		newGameBtnRef,
		dialogAvoidRef,
		dialogOhnoRef
	} = props;

	const { selectedTheme } = useLayout();
	
	const rightTouchRef = useRef<HTMLDivElement>(null);
	const leftTouchRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const memoized = {
		player: useMemo(() => ({}), []),
		food: useMemo(() => ({}), []),
		rains: useMemo(() => [], []),
	};

	const GameScript = () => {
		let _isMounted = true;	

		const FPS = 50;
		const REALTIME = 100/FPS;

		/////////CANVAS INITIALIZATION 
		const canvas: HTMLCanvasElement = canvasRef.current;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		
		let screenWidth = window.innerWidth;
		let screenHeight = window.innerHeight;
		canvas.width = screenWidth;
		canvas.height = screenHeight;


		/////////SCREEN RESIZE HANDLER
		const reportWindowSize = () => {
			screenWidth = window.innerWidth;
			screenHeight = window.innerHeight;
			canvas.width = screenWidth;
			canvas.height = screenHeight;

			if (executeGame) player.Position.Y = screenHeight - player.Height;
		};
		window.addEventListener('resize', reportWindowSize);


		/////////PICK THEME
		const THEME = GameTheme[selectedTheme];
		
		/////////THE PLAYER (ORANGE BOX) OBJECT 
		class Player extends PlayerType {
			constructor (posX: number) {
				super();

				this.Height = 50;
				this.Width = 50;
				this.Shadow = THEME.shadow;
				this.Color = THEME.dark;
				this.Blur = 25;
				this.Velocity = 5 * REALTIME;
				this.Emphasis = { alpha: 0.0, direction: 'up'};
				this.Shine = 0;
				this.IsAlive = true;
								
				this.EatCount = 0;
				this.TimeStart = new Date().getTime();
				this.TimeEnd = 'initial';
				this.TimeSpan = 0;
				
				this.Position = {
					X: posX,
					Y: screenHeight - this.Height
				};
			}

			CheckCollisions = () => {
				for (const rain of rains) {
					if (
						rain &&
						this.Position.X <= rain.Position.X + rain.Width &&
						this.Position.X + this.Width >= rain.Position.X &&
						this.Position.Y + this.Height >= rain.Position.Y &&
						this.Position.Y <= rain.Position.Y + rain.Height
					) {
						GameOver();
						this.Dead();
						this.DrawShine('init');
					}
				}
			};

			CheckEaten = () => {
				if (player.Position.X <= food.PosX + food.Width && player.Position.X + player.Width >= food.PosX) {
					this.EatCount++;
					GlimpseHandler(this.EatCount);
					food = new Food();
					this.DrawShine('init');
				}
			};			

			DrawShine = (action?: string) => {
				if (action === 'init') this.Shine = 1;
				if (this.Shine > 0.4) {
					ctx.shadowColor = '#0000';
					ctx.shadowBlur = 0;
					ctx.fillStyle = (!this.IsAlive ? '#000000' : THEME.light) + (this.Shine * 255/2).toString(16).split('.')[0];
					ctx.beginPath();
					ctx.rect(
						this.Position.X - (this.Width * (1 - (this.Shine - 1)) - this.Width) / 2,
						this.Position.Y - (this.Width * (1 - (this.Shine - 1)) - this.Width) / 2,
						this.Width * (1 - (this.Shine - 1)),
						this.Height * (1 - (this.Shine - 1))
					);
					ctx.fill();

					this.Shine -= 0.03 * REALTIME;
				}
			};
			
			DrawEmphasis = () => {
				if (this.IsAlive) {
					if (this.Emphasis.alpha >= 1.0) this.Emphasis.direction = 'down';
					if (this.Emphasis.alpha <= 0.0) this.Emphasis.direction = 'up';
					const speed = 0.005 * REALTIME;
					this.Emphasis.alpha += this.Emphasis.direction === 'up' ? speed : -speed;
					
					ctx.shadowColor = '#0000';
					ctx.shadowBlur = 0;
					ctx.fillStyle = THEME.light + (this.Emphasis.alpha * 255).toString(16).split('.')[0];
					ctx.beginPath();
					ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
					ctx.fill();
				}
			};
			
			Draw = () => {
				ctx.shadowColor = this.Shadow;
				ctx.shadowBlur = this.Blur;
				ctx.fillStyle = this.Color;
				ctx.beginPath();
				ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				ctx.fill();
			};
			
			DialogAttachment = () => {
				avoid.style.left = `${this.Position.X + this.Width - 20}px`;
				ohno.style.left = `${this.Position.X + this.Width - 20}px`;
			};

			Dead = () => {
				this.IsAlive = false;
				this.TimeEnd = new Date().getTime();
				this.Shadow = '#000';
				this.Color = '#000';
			}

			UpdateTimeSpan = () => {
				this.TimeSpan = new Date().getTime() - player.TimeStart;
			}

			UpdateScoring = () => {
				if (this.IsAlive){
					setScore({
						food: player.EatCount,
						time: parseInt(((isAttempted ? player.TimeSpan : 0) / 10).toFixed(0))
					});
				}
			}

			Move = (direction: EnumDirection) => {
				const vector = this.Velocity * {left: -1, right: 1, idle: 0}[direction];
				
				if (!(this.Position.X + vector < 0 || this.Position.X + vector > screenWidth - this.Width)) {
					this.Position.X += vector;
				} else if (this.Position.X > screenWidth - this.Width) {
					this.Position.X = screenWidth - (this.Width + 2);
				} else if (this.Position.X < 0) {
					this.Position.X = 0 + 2;
				}
			};

			Update = () => {
				this.Move(CONTROL_DIRECTION);
				this.DialogAttachment();
				this.CheckCollisions();
				this.CheckEaten();
				this.DrawShine();
				this.Draw();
				this.DrawEmphasis();
				this.UpdateTimeSpan();
				this.UpdateScoring();
			};
		}


		/////////THE RAIN OBJECT
		class Rain extends RainType {
			constructor (index: number) {
				super();
				this.Colorbox = isAttempted ? '#888888' : 'rgb(210,210,210)';
				this.Colortrail0 = isAttempted ? 'rgba(200,200,200,1)' : 'rgba(220,220,220,1)';
				this.Colortrail1 = 'rgba(200,200,200,0)';
				this.AdditionalSpeed = 4;
				this.Base = 5;
				this.Size = 30;

				this.Height = this.Size;
				this.Width = this.Size;
				this.Velocity = (Math.random() * this.AdditionalSpeed + this.Base) * REALTIME;
				this.Index = index;

				this.Position = {
					X: this.RandomPosition(),
					Y: -this.Height
				};
			}

			RandomPosition = () => {
				let randomPos: number;
				do randomPos = Math.random() * (screenWidth + this.Size * 2) - this.Size;
				while (!isAttempted && randomPos > player.Position.X - this.Size * 2 && randomPos < player.Position.X + this.Size * 2);
				return randomPos;
			}

			DrawHead = () => {
				ctx.beginPath();
				ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				ctx.fillStyle = this.Colorbox;
				ctx.shadowColor = 'gray';
				ctx.shadowBlur = 3;
				ctx.fill();
			};

			DrawTrail = () => {
				ctx.beginPath();
				ctx.rect(this.Position.X, this.Position.Y - 120, this.Width, this.Height * 4);
				this.TrailGradient = ctx.createLinearGradient(screenHeight / 2, this.Position.Y, screenHeight / 2, this.Position.Y - 120);
				this.TrailGradient.addColorStop(0, this.Colortrail0);
				this.TrailGradient.addColorStop(1, this.Colortrail1);
				ctx.fillStyle = this.TrailGradient;
				ctx.shadowColor = '#000';
				ctx.shadowBlur = 0;
				ctx.fill();
			};

			Move = () => {
				this.Position.Y += this.Velocity;
			}

			Remove = () => {
				rains[this.Index] = null;
			}

			Update = () => {
				if (this.Position.Y < screenHeight + this.Height * 5) {
					this.Move();
					this.DrawHead();
					this.DrawTrail();
				} else {
					this.Remove();
				}
			};
		}


		/////////THE FOOD OBJECT
		class Food extends FoodType {
			constructor () {
				super();

				this.Width = 20;
				this.Height = 20;
				this.Color = THEME.dark;
				this.Shadow = THEME.shadow;
				this.Blur = 25;
				this.distance = 50;
				this.PosX = this.RandomPosition();
			}
			
			RandomPosition = () => {
				let randomPos;
				do randomPos = Math.random() * (screenWidth - this.Width * 3) + this.Width;
				while (randomPos >= player.Position.X - (this.Width + this.distance) && randomPos <= player.Position.X + player.Width + this.distance);
				return randomPos;
			}

			Draw = () => {
				if (this.PosX > screenWidth - this.Width * 2) this.PosX = screenWidth - this.Width * 2;

				ctx.beginPath();
				ctx.rect(this.PosX, screenHeight - this.Height * 2, this.Width, this.Width);
				ctx.shadowColor = this.Shadow;
				ctx.shadowBlur = this.Blur;
				ctx.fillStyle = this.Color;
				ctx.fill();
			};

			Update = () => {
				this.Draw();
			};
		}


		/////////GAME OVER HANDLER        
		const GameOver = () => {
			if (player.IsAlive && isAttempted) {
				food = {};
				
				DialogHandler('over');
				setGameStatus('over');
				setAnimateValue(player.TimeSpan);
			}
		};


		/////////NEW GAME HANDLER		
		const NewGame = () => {
			player = new Player(player.Position.X);
			food = new Food();
			
			setGameStatus('running');
			setProcessMessage('');
			setAnimateValue(0);
			GlimpseHandler('regular');
		};
		
		
		/////////FIRST ATTEMPT TO ENTER THE GAME
		let isAttempted = false;

		const FirstAttempt = () => {
			isAttempted = true;
			setGameStatus('running');
				
			food = new Food();
			
			for (const rain of rains) {
				if (rain){
					rain.Colorbox = '#888888';
					rain.Colortrail0 = 'rgba(200,200,200,1)';
					rain.Colortrail1 = 'rgba(200,200,200,0)';
				}
			}
		};
		

		/////////CONTROLLER
		let CONTROL_DIRECTION: EnumDirection = 'idle';

		/////////CONTROLLER - KEYBOARD EVENT HANDLER
		let isRightPressed = false;
		let isLeftPressed = false;

		const ControlKeyboard = {
			controlling: (e) => {
				if (e.which === 65 || e.which === 37) {
					//GO LEFT 
					isLeftPressed = true;
					CONTROL_DIRECTION = 'left';
					if (!isAttempted) FirstAttempt();
				} else if (e.which === 68 || e.which === 39) {
					//GO RIGHT
					isRightPressed = true;
					CONTROL_DIRECTION = 'right';
					if (!isAttempted) FirstAttempt();
				}

				//PRESSING ENTER
				const siderinput: HTMLInputElement = sideRef.current;
				if (e.which === 13 && !player.IsAlive && document.activeElement !== siderinput) {
					NewGame();
				}
				
				//AVOID UNEXPECTED SCROLLDOWN
				if (e.which === 40 && window.scrollY === 0) e.preventDefault();

				//SPECIAL THING
				else if (e.which === 16) {
					if (e.location === 1) GlimpseHandler('regular');
					else if (e.location === 2) GlimpseHandler('special');
				}
			},			
			uncontrolling: (e) => {
				if (e.which === 65 || e.which === 37) {
					isLeftPressed = false;
					CONTROL_DIRECTION = isRightPressed ? 'right' : 'idle';
				} else if (e.which === 68 || e.which === 39) {
					isRightPressed = false;
					CONTROL_DIRECTION = isLeftPressed ? 'left' : 'idle';
				}
			}
			
		};

		/////////CONTROLLER - TOUCHSCREEN EVENT HANDLER
		const newGameBtn: HTMLButtonElement = newGameBtnRef.current;
		const right: HTMLDivElement = rightTouchRef.current;
		const left: HTMLDivElement = leftTouchRef.current;
		
		let isRightTouched = false;
		let isLeftTouched = false;

		const ControlTouch = {
			controlRight: () => {
				isRightTouched = true;
				CONTROL_DIRECTION = 'right';
				if (!isAttempted) FirstAttempt();
			},
			controlLeft: () => {
				isLeftTouched = true;
				CONTROL_DIRECTION = 'left';
				if (!isAttempted) FirstAttempt();
			},
			uncontrolRight: () => {
				isRightTouched = false;
				CONTROL_DIRECTION = isLeftTouched ? 'left' : 'idle';
			},
			uncontrolLeft: () => {
				isLeftTouched = false;
				CONTROL_DIRECTION = isRightTouched ? 'right' : 'idle';
			},
		};

		/////////GLIMPSE HANDLER
		const GlimpseHandler = (score) => {
			const bri = briRef.current;
			const nr = nrRef.current;
			const et = etRef.current;
			
			const animate = (element) => {
				element.style.opacity = 1;

				setTimeout(() => {
					element.style.opacity = 0;
				}, 200);
			};
			
			const animateIntro = (element) => {
				element.style.transition = '1s';
				element.style.opacity = 0;

				setTimeout(() => {
					element.style.transition = '0.2s';
				}, 1000);
			};

			const animateSpecial = (et, nr, bri) => {
				et.style.opacity = 1;
				nr.style.opacity = 1;
				bri.style.opacity = 1;
				
				setTimeout(() => {
					et.style.opacity = 0;
					nr.style.opacity = 0;
					bri.style.opacity = 0;
				}, 350);
			};
			
			if (score % 10 === 0 || score === 'special') {
				animateSpecial(et, nr, bri);
				setTimeout(() => animateSpecial(et, nr, bri), 700);
				setTimeout(() => animateSpecial(et, nr, bri), 1400);
			} else if (score % 5 === 0 || score === 'regular') {
				animate(et);
				setTimeout(() => animate(nr), 150);
				setTimeout(() => animate(bri), 400);
			} else if (score === 'intro') {
				setGameStatus('sub.intro');
				animateIntro(et);
				setTimeout(() => animateIntro(bri), 500);
				setTimeout(() => animateIntro(nr), 1000);
			}
		};

		
		/////////DIALOG HANDLER
		const avoid = dialogAvoidRef.current;
		const ohno = dialogOhnoRef.current;
		
		const DialogHandler = (action: string, startingPosition?: number) => {
			switch (action) {
				case 'init':
					avoid.style.display = 'flex';
					avoid.style.left = `${startingPosition + 34}px`;
					break;
				case 'over':
					avoid.style.display = 'none';
					ohno.style.visibility = 'visible';
					ohno.style.opacity = '1';
					ohno.style.transition = '0s';

					setTimeout(() => {
						ohno.style.visibility = 'hidden';
						ohno.style.opacity = '0';
						ohno.style.transition = 'opacity 2s, visibility 0s 2s';
					}, 1000);
					break;
			}
		};


		/////////HANDLE INACTIVE TAB
		let isTabInactive = false;
		const handleInactive = () => isTabInactive = document.hidden ? true : false;
		document.addEventListener('visibilitychange', handleInactive);


		/////////RUNNING THE GAME :: Execute the game
		let player: Player | Record<string, never> = memoized.player;
		let food: Food | Record<string, never> = memoized.food;
		const rains: Rain[] = memoized.rains;
		
		let executeGame = false;
		let rainIndex = 0;
		
		const IgniteGame = () => {
			const startingPosition = screenWidth < 744 ? screenWidth * 10 / 100 : screenWidth / 2 - 306;
			player = new Player(startingPosition);
			executeGame = true;

			setGameStatus('ready');
			DialogHandler('init', startingPosition);
			
			//Controllers registration
			newGameBtn.addEventListener('click', NewGame);
			document.addEventListener('keydown', ControlKeyboard.controlling);
			document.addEventListener('keyup', ControlKeyboard.uncontrolling);
			right.addEventListener('touchstart', ControlTouch.controlRight, false);
			left.addEventListener('touchstart', ControlTouch.controlLeft, false);
			right.addEventListener('touchend', ControlTouch.uncontrolRight, false);
			left.addEventListener('touchend', ControlTouch.uncontrolLeft, false);
		};
		
		
		/////////TIMELINE EXECUTION (WEB CINEMATIC INTRO PART)
		let executeLoadedRun = false;
		let timeoutIntro: NodeJS.Timeout;
		let timeoutInitial: NodeJS.Timeout;
		let timeoutExecute: NodeJS.Timeout;

		const executeLoaded = () => {
			if (!executeLoadedRun) {
				executeLoadedRun = true;
				
				if (skipIntro) IgniteGame();
				else {
					const delay = 1000;
					timeoutIntro = setTimeout(() => GlimpseHandler('intro'), delay);
					timeoutInitial = setTimeout(() => GlimpseHandler('regular'), delay + 3900);
					timeoutExecute = setTimeout(IgniteGame, delay + 4500);
				}
			}
		};

		if (isInitialLoad) window.addEventListener('load', executeLoaded);
		else executeLoaded();
		const executeFallback = setTimeout(executeLoaded, 2000);

		
		/////////SCREEN UPDATER
		const Updater = setInterval(() => {
			if (executeGame) {
				//Reseting canvas
				ctx.clearRect(0, 0, screenWidth, screenHeight);
				
				//Then, redrawing objects
				if (player.IsAlive && isAttempted) food.Update();
				for (const rain of rains) if (rain) rain.Update();
				player.Update();
			}
		}, 1000/FPS);
		

		/////////RAINFALL GENERATOR
		
		const GenerateRain = () => {
			if (player.IsAlive && !isTabInactive && executeGame) rains.push(new Rain(rainIndex++));
			
			const dynamicInterval = screenWidth > 540 ? 100 * (1366 / screenWidth) : 100 * (1366 / screenWidth) * 3 / 4;
			if (_isMounted) return setTimeout(GenerateRain, dynamicInterval); 
		};
		const GenerateRainTimeout: NodeJS.Timeout = GenerateRain();


		/////////USE-EFFECT CLEAN-UP
		return () => {
			document.removeEventListener('visibilitychange', handleInactive);
			document.removeEventListener('keydown', ControlKeyboard.controlling);
			document.removeEventListener('keyup', ControlKeyboard.uncontrolling);
			window.removeEventListener('resize', reportWindowSize);
			window.removeEventListener('load', executeLoaded);
			right.removeEventListener('touchstart', ControlTouch.controlRight, false);
			left.removeEventListener('touchstart', ControlTouch.controlLeft, false);
			right.removeEventListener('touchend', ControlTouch.uncontrolRight, false);
			left.removeEventListener('touchend', ControlTouch.uncontrolLeft, false);

			clearTimeout(timeoutIntro);
			clearTimeout(timeoutInitial);
			clearTimeout(timeoutExecute);
			clearTimeout(executeFallback);
			clearTimeout(GenerateRainTimeout);
			clearInterval(Updater);

			_isMounted = false;
		};
	};


	/////////HOOK THE SCRIPT TO USE-EFFECT  
	useEffect(GameScript, [selectedTheme]); 

	return (
		<div className="flex-sc col w-full pointer-events-none" style={{height: 'calc(100vh - 60px)', zIndex: -1 }}>
			<canvas ref={canvasRef} className="absolute inset-0 full" style={{ zIndex: -2 }} />
			<div className="absolute inset-0 flex-bc full pointer-events-none" style={{ zIndex: 0 }}>
				<div className="w-1/2 h-full pointer-events-auto select-none opacity-20" ref={leftTouchRef}></div>
				<div className="w-1/2 h-full pointer-events-auto select-none opacity-20" ref={rightTouchRef}></div>
			</div>
		</div>
	);
};

export default Canvas;
