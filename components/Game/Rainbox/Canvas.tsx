import React, { useRef, useEffect, useMemo } from 'react';
import { PlayerType, RainType, FoodType, CanvasProps} from './Canvas.types';
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

	const rains_memo = useMemo(() => [], []);

	const GameScript = () => {
		let _isMounted = true;	

		const FPS = 50;
		const REALTIME = 100/FPS;

		/////////CANVAS INITIALIZATION 
		const canvas: HTMLCanvasElement = canvasRef.current;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		const navbarOffset = 60;

		let screenHeight = window.innerHeight;
		let screenWidth = window.innerWidth;

		canvas.width = screenWidth;
		canvas.height = screenHeight - navbarOffset;


		/////////SCREEN RESIZE HANDLER
		const reportWindowSize = () => {
			screenWidth = window.innerWidth;
			screenHeight = window.innerHeight;
			canvas.width = screenWidth;
			canvas.height = screenHeight - navbarOffset;

			if (executeGame) player.Position.Y = screenHeight - player.Height - navbarOffset;
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
				this.Velocity = 0;
				this.Acceleration = 5 * REALTIME;
				this.Emphasis = { alpha: 0.0, direction: 'up'};
				this.Shine = 0;
				
				this.EatCount = 0;
				this.TimeStart = new Date().getTime();
				this.TimeEnd = 'initial';
				this.TimeSpan = new Date().getTime();
				
				this.Position = {
					X: posX,
					Y: screenHeight - this.Height - navbarOffset
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
						this.Shine = 1;
					}
				}
			};

			CheckEaten = () => {
				if (player.Position.X <= food.PosX + food.Width && player.Position.X + player.Width >= food.PosX) {
					this.EatCount++;
					GlimpseHandler(this.EatCount);
					food = new Food();
					this.Shine = 1;
				}
			};			

			DrawShine = () => {
				if (this.Shine > 0) {
					console.log(this.Shine.toFixed(2), (isGameOver ? '#000000' : THEME.light) + (this.Shine * 255).toString(16).split('.')[0]);
					
					ctx.shadowColor = '#0000';
					ctx.shadowBlur = 0;
					ctx.fillStyle = (isGameOver ? '#000000' : THEME.light) + (this.Shine * 255).toString(16).split('.')[0];
					ctx.beginPath();
					ctx.rect(
						this.Position.X - (this.Width * (1 - (this.Shine - 1)) - this.Width) / 2,
						this.Position.Y - (this.Width * (1 - (this.Shine - 1)) - this.Width) / 2,
						this.Width * (1 - (this.Shine - 1)),
						this.Height * (1 - (this.Shine - 1))
					);
					ctx.fill();

					this.Shine -= 0.05 * REALTIME;
				}
			};
			
			DrawEmphasis = () => {
				if (!isGameOver) {
					if (this.Emphasis.alpha >= 1.0) this.Emphasis.direction = 'down';
					if (this.Emphasis.alpha <= 0.0) this.Emphasis.direction = 'up';
					this.Emphasis.alpha += this.Emphasis.direction === 'up' ? 0.005 * REALTIME : -0.005 * REALTIME;
				
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
				avoid.style.left = `${this.Position.X + 34}px`;
				ohno.style.left = `${this.Position.X + 34}px`;
			};

			Move = () => {
				if (!(this.Position.X + this.Velocity < 0) && !(this.Position.X + this.Velocity > screenWidth - 50)) {
					this.Position.X += this.Velocity;
				} else if (this.Position.X > screenWidth - this.Width) {
					this.Position.X = screenWidth - (this.Width + 2);
				}
			};

			Update = () => {
				this.Move();
				this.DialogAttachment();
				this.CheckCollisions();
				this.CheckEaten();
				this.Draw();
				this.DrawShine();
				this.DrawEmphasis();
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
				ctx.shadowColor = 'rgba(0,0,0,0)';
				ctx.shadowBlur = 0;
				ctx.fill();
			};

			Remove = () => {
				rains[this.Index] = null;
			}

			Update = () => {
				if (this.Position.Y < screenHeight - navbarOffset + this.Height * 5) {
					this.Position.Y += this.Velocity;
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
				this.Color = '#FF5B14';
				this.Shadow = 'orange';
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
				ctx.rect(this.PosX, screenHeight - navbarOffset - this.Height * 2, this.Width, this.Width);
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
			if (!isGameOver && isAttempted) {
				player.TimeSpan = new Date().getTime() - player.TimeSpan;
				player.TimeEnd = new Date().getTime();
				player.Shadow = 'black';
				player.Color = 'black';

				isGameOver = true;
				food = {};
				
				DialogHandler('over');
				setGameStatus('over');
				setAnimateValue(player.TimeSpan);
			}
		};


		/////////NEW GAME HANDLER		
		const NewGame = () => {
			isGameOver = false;
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
			if (!isAttempted) {
				isAttempted = true;
				setGameStatus('running');
				
				food = new Food();
				player.TimeStart = new Date().getTime();
				player.TimeEnd = 'initial';
				player.TimeSpan = new Date().getTime();
			
				for (const rain of rains) {
					if (rain){
						rain.Colorbox = '#888888';
						rain.Colortrail0 = 'rgba(200,200,200,1)';
						rain.Colortrail1 = 'rgba(200,200,200,0)';
					}
				}
			}
		};
		

		/////////CONTROLLER - KEYBOARD EVENT HANDLER
		let isRightPressed = false;
		let isLeftPressed = false;

		const ControlKeyboard = {
			controlling: (e) => {
				if (e.which === 65 || e.which === 37) {
					//GO LEFT 
					isLeftPressed = true;
					player.Velocity = -player.Acceleration;
					FirstAttempt();
				} else if (e.which === 68 || e.which === 39) {
					//GO RIGHT
					isRightPressed = true;
					player.Velocity = player.Acceleration;
					FirstAttempt();
				}

				//PRESSING ENTER
				const siderinput: HTMLInputElement = sideRef.current;
				if (e.which === 13 && isGameOver && document.activeElement !== siderinput) {
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
					player.Velocity = isRightPressed ? player.Acceleration : 0;
				} else if (e.which === 68 || e.which === 39) {
					isRightPressed = false;
					player.Velocity = isLeftPressed ? -player.Acceleration : 0;
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
				player.Velocity = player.Acceleration;
				FirstAttempt();
			},
			controlLeft: () => {
				isLeftTouched = true;
				player.Velocity = -player.Acceleration;
				FirstAttempt();
			},
			uncontrolRight: () => {
				isRightTouched = false;
				player.Velocity = isLeftTouched ? -player.Acceleration : 0;
			},
			uncontrolLeft: () => {
				isLeftTouched = false;
				player.Velocity = isRightTouched ? player.Acceleration : 0;
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
		let player: Player | Record<string, never> = {};
		let food: Food | Record<string, never> = {};
		const rains: Rain[] = rains_memo;
		
		let executeGame = false;
		let isGameOver = false;
		let rainIndex = 0;
		
		const IgniteGame = () => {
			const startingPosition = screenWidth < 744 ? screenWidth * 10 / 100 : screenWidth / 2 - 306;
			player = new Player(startingPosition);
			console.log(player);
			
			executeGame = true;

			setGameStatus('initial');
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

		
		/////////SCREEN UPDATER
		const Updater = setInterval(() => {
			if (executeGame) {
				const livespan = player.TimeEnd != 'initial' ? player.TimeSpan : new Date().getTime() - player.TimeStart;

				setScore({
					food: player.EatCount,
					time: parseInt(((isAttempted ? livespan : 0) / 10).toFixed(0))
				});
				
				//Reseting canvas
				ctx.clearRect(0, 0, screenWidth, screenHeight);
				
				//Then, redrawing objects
				if (!isGameOver && isAttempted) food.Update();
				for (const rain of rains) if (rain) rain.Update();
				player.Update();
			}
		}, 1000/FPS);
		

		/////////RAINFALL GENERATOR
		
		const GenerateRain = () => {
			if (!isGameOver && !isTabInactive && executeGame) rains.push(new Rain(rainIndex++));
			
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
			clearTimeout(GenerateRainTimeout);
			clearInterval(Updater);

			_isMounted = false;
		};
	};


	/////////HOOK THE SCRIPT TO USE-EFFECT  
	useEffect(GameScript, [selectedTheme]); 

	return (
		<div className="flex-sc col full pointer-events-none" style={{ zIndex: -1 }}>
			<canvas ref={canvasRef} style={{ zIndex: -2 }} />
			<div className="absolute full inset-0 flex-bc pointer-events-none" style={{ zIndex: 0 }}>
				<div className="h-full opacity-20 w-1/2 pointer-events-auto select-none" ref={leftTouchRef}></div>
				<div className="h-full opacity-20 w-1/2 pointer-events-auto select-none" ref={rightTouchRef}></div>
			</div>
		</div>
	);
};

export default Canvas;
