import React, { useRef, useEffect } from 'react';
import { PlayerType, RainType, FoodType, CanvasProps } from './Canvas.types';

// [TODO] : key up/down make not trigger page scroll

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
	
	const rightTouchRef = useRef<HTMLDivElement>(null);
	const leftTouchRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const GameScript = () => {
		let _isMounted = true;

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


		/////////THE PLAYER (ORANGE BOX) OBJECT 
		class Player extends PlayerType {
			constructor (posX: number) {
				super();

				this.Height = 50;
				this.Width = 50;
				this.Shadow = 'orange';
				this.RGB = { r: 255, g: 74, b: 20 };
				this.RGBChange = { r: 0, g: 0.5, b: 0 };
				this.Color = `rgb(255, ${this.RGB.g}, 20)`;
				this.Blur = 25;
				this.Velocity = 0;
				this.Acceleration = 5 * FPS_ADAPTOR;
				this.shine = 0;
				
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
						this.Position.X <= rain.Position.X + rain.Width &&
						this.Position.X + this.Width >= rain.Position.X &&
						this.Position.Y + this.Height >= rain.Position.Y &&
						this.Position.Y <= rain.Position.Y + rain.Height
					) {
						GameOver();
						this.shine = 0.025;
					}
				}
			};

			CheckEaten = () => {
				if (player.Position.X <= food.PosX + food.Width && player.Position.X + player.Width >= food.PosX) {
					this.EatCount++;
					GlimpseHandler(this.EatCount);
					food = new Food();
					this.shine = 0.025;
				}
			};

			DrawShine = () => {
				if (this.shine > 0) {
					ctx.fillStyle = `rgba(${isGameOver ? '0, 0, 0,' : '255, 90, 20,'} ${-(this.shine * 2 - 1)})`;
					ctx.beginPath();
					ctx.rect(
						this.Position.X - (this.Width * (1 + this.shine) - this.Width) / 2,
						this.Position.Y - (this.Width * (1 + this.shine) - this.Width) / 2,
						this.Width * (1 + this.shine),
						this.Height * (1 + this.shine)
					);
					ctx.fill();

					this.shine += 0.025 * FPS_ADAPTOR;
					if (this.shine >= 1) this.shine = 0;
				}
			};

			DialogAttachment = () => {
				avoid.style.left = `${this.Position.X + 34}px`;
				ohno.style.left = `${this.Position.X + 34}px`;
			};

			Draw = () => {
				if (this.RGB.g === 152) this.RGBChange.g = -0.5;
				if (this.RGB.g === 74) this.RGBChange.g = 0.5;
				this.RGB.g += this.RGBChange.g;
				if (!isGameOver) this.Color = `rgb(255, ${this.RGB.g}, 20)`;

				ctx.shadowColor = this.Shadow;
				ctx.shadowBlur = this.Blur;
				ctx.fillStyle = this.Color;
				ctx.beginPath();
				ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				ctx.fill();
			};

			Move = () => {
				if (!(this.Position.X + this.Velocity < 0) && !(this.Position.X + this.Velocity > screenWidth - 50)) {
					this.Position.X += this.Velocity;
					console.log(this.Velocity);
					
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
			};
		}


		/////////THE RAIN OBJECT
		const RainConfig = {
			colortrail0: 'rgba(220,220,220,1)',
			colortrail1: 'rgba(220,220,220,0)',
			colorbox: 'rgb(210,210,210)',
			additionalSpeed: 4,
			base: 5,
			size: 30
		};

		class Rain extends RainType {
			constructor (posX) {
				super();

				this.Height = RainConfig.size;
				this.Width = RainConfig.size;
				this.Velocity = (Math.random() * RainConfig.additionalSpeed + RainConfig.base) * FPS_ADAPTOR;
				this.Index = rainIndex;

				this.Position = {
					X: posX,
					Y: -this.Height
				};
				
				rains[rainIndex++] = this;
			}

			DrawHead = () => {
				ctx.beginPath();
				ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				ctx.fillStyle = RainConfig.colorbox;
				ctx.shadowColor = 'gray';
				ctx.shadowBlur = 3;
				ctx.fill();
			};

			DrawTrail = () => {
				ctx.beginPath();
				ctx.rect(this.Position.X, this.Position.Y - 120, this.Width, this.Height * 4);
				this.TrailGradient = ctx.createLinearGradient(screenHeight / 2, this.Position.Y, screenHeight / 2, this.Position.Y - 120);
				this.TrailGradient.addColorStop(0, RainConfig.colortrail0);
				this.TrailGradient.addColorStop(1, RainConfig.colortrail1);
				ctx.fillStyle = this.TrailGradient;
				ctx.shadowColor = 'rgba(0,0,0,0)';
				ctx.shadowBlur = 0;
				ctx.fill();
			};

			Update = () => {
				if (this.Position.Y < screenHeight - navbarOffset + this.Height * 5) {
					this.Position.Y += this.Velocity;
					this.DrawHead();
					this.DrawTrail();
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

				let randomPos;
				do randomPos = Math.random() * (screenWidth - this.Width * 3) + this.Width;
				while (randomPos >= player.Position.X - (this.Width + this.distance) && randomPos <= player.Position.X + player.Width + this.distance);
				
				this.PosX = randomPos;
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
			setGameStatus('running');
			setProcessMessage('');
			GlimpseHandler('regular');
			
			isGameOver = false;
			player = new Player(player.Position.X);
			food = new Food();
			
			setAnimateValue(0);
		};
		
		const newGameBtn: HTMLButtonElement = newGameBtnRef.current;
		newGameBtn.addEventListener('click', NewGame);


		/////////FIRST ATTEMPT TO ENTER THE GAME
		let isAttempted = false;

		const FirstAttempt = () => {
			if (!isAttempted) {
				isAttempted = true;
				setGameStatus('running');

				RainConfig.colorbox = '#888888';
				RainConfig.colortrail0 = 'rgba(200,200,200,1)';
				RainConfig.colortrail1 = 'rgba(200,200,200,0)';

				food = new Food();
				player.TimeStart = new Date().getTime();
				player.TimeEnd = 'initial';
				player.TimeSpan = new Date().getTime();
			}
		};


		/////////CONTROLLER - KEYBOARD EVENT HANDLER
		let isRightPressed = false;
		let isLeftPressed = false;

		const controlling = (e) => {
			if (e.which === 40 && window.scrollY === 0) e.preventDefault();
			
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
			} else if (e.which === 13 && isGameOver && document.activeElement !== siderinput) {
				//PRESSING ENTER
				NewGame();
			}

			//SPECIAL THING
			else if (e.which === 16) {
				if (e.location === 1) GlimpseHandler('regular');
				else if (e.location === 2) GlimpseHandler('special');
			}
		};

		const uncontrolling = (e) => {
			if (e.which === 65 || e.which === 37) {
				isLeftPressed = false;
				player.Velocity = isRightPressed ? player.Acceleration : 0;
			} else if (e.which === 68 || e.which === 39) {
				isRightPressed = false;
				player.Velocity = isLeftPressed ? -player.Acceleration : 0;
			}
		};


		/////////CONTROLLER - TOUCHSCREEN EVENT HANDLER
		const right: HTMLDivElement = rightTouchRef.current;
		const left: HTMLDivElement = leftTouchRef.current;

		let isRightTouched = false;
		let isLeftTouched = false;

		const controlRight = () => {
			isRightTouched = true;
			player.Velocity = player.Acceleration;
			FirstAttempt();
		};
		const controlLeft = () => {
			isLeftTouched = true;
			player.Velocity = -player.Acceleration;
			FirstAttempt();
		};
		const uncontrolRight = () => {
			isRightTouched = false;
			player.Velocity = isLeftTouched ? -player.Acceleration : 0;
		};
		const uncontrolLeft = () => {
			isLeftTouched = false;
			player.Velocity = isRightTouched ? player.Acceleration : 0;
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
		let tabInactive = false;
		const handleInactive = () => tabInactive = document.hidden ? true : false;
		document.addEventListener('visibilitychange', handleInactive);

		const siderinput: HTMLInputElement = sideRef.current;


		/////////RUNNING THE GAME :: Execute the game
		let player: Player | Record<string, never> = {};
		let food: Food | Record<string, never> = {};
		const rains: Rain[] = [];

		let executeGame = false;
		let isGameOver = false;
		let rainIndex = 0;
		
		const IgniteGame = () => {
			const startingPosition = screenWidth < 744 ? screenWidth * 10 / 100 : screenWidth / 2 - 306;
			player = new Player(startingPosition);
			executeGame = true;

			setGameStatus('initial');
			DialogHandler('init', startingPosition);
			
			//Controllers registration
			document.addEventListener('keydown', controlling);
			document.addEventListener('keyup', uncontrolling);
			right.addEventListener('touchstart', controlRight, false);
			left.addEventListener('touchstart', controlLeft, false);
			right.addEventListener('touchend', uncontrolRight, false);
			left.addEventListener('touchend', uncontrolLeft, false);
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
		const FPS = 50;
		const FPS_ADAPTOR = (1000/FPS)/10;

		const Updater = setInterval(() => {
			if (executeGame) {
				const calcTiming = () => {
					if (player.TimeEnd != 'initial') return player.TimeSpan; 
					else return new Date().getTime() - player.TimeStart;
				};
				
				setScore({
					food: player.EatCount,
					time: parseInt(((isAttempted ? calcTiming() : 0) / 10).toFixed(0))
				});
				
				//Reseting canvas
				ctx.clearRect(0, 0, screenWidth, screenHeight);
				
				//Then, redrawing objects
				if (!isGameOver && isAttempted) food.Update();
				for (const rain of rains) rain.Update();
				player.Update();
			}
		}, 1000/FPS);
		

		/////////RAINFALL GENERATOR
		let GenerateRainTimeout: NodeJS.Timeout;
		
		const GenerateRain = () => {
			if (!isGameOver && !tabInactive && executeGame) {
				let randomPos: number;
				do randomPos = Math.random() * (screenWidth + RainConfig.size * 2) - RainConfig.size;
				while (!isAttempted && randomPos > player.Position.X - RainConfig.size * 2 && randomPos < player.Position.X + RainConfig.size * 2);
				new Rain(randomPos);
			}

			const dynamicInterval = screenWidth > 540 ? 100 * (1366 / screenWidth) : 100 * (1366 / screenWidth) * 3 / 4;
			if (_isMounted) GenerateRainTimeout = setTimeout(GenerateRain, dynamicInterval); 
			//i need the setInterval value to be dynamic, but it can't, so i use a recursive setTimout instead
			//it's interval value is dynamically changing based on screenWidth
		};
		GenerateRain();


		/////////USE-EFFECT CLEAN-UP
		return () => {
			document.removeEventListener('visibilitychange', handleInactive);
			document.removeEventListener('keydown', controlling);
			document.removeEventListener('keyup', uncontrolling);
			window.removeEventListener('resize', reportWindowSize);

			window.removeEventListener('load', executeLoaded);

			right.removeEventListener('touchstart', controlRight, false);
			left.removeEventListener('touchstart', controlLeft, false);
			right.removeEventListener('touchend', uncontrolRight, false);
			left.removeEventListener('touchend', uncontrolLeft, false);

			clearTimeout(timeoutIntro);
			clearTimeout(timeoutInitial);
			clearTimeout(timeoutExecute);

			clearTimeout(executeFallback);

			clearInterval(Updater);
			clearTimeout(GenerateRainTimeout);

			_isMounted = false;
		};
	};


	/////////HOOK THE SCRIPT TO USE-EFFECT  
	useEffect(GameScript, []); 

	return (
		<div className="flex-sc col full" style={{ zIndex: -1 }}>
			<canvas ref={canvasRef} style={{ zIndex: -2 }} />
			<div className="absolute full inset-0 flex-bc" style={{ zIndex: 0 }}>
				<div className="h-full opacity-20 w-1/2" ref={leftTouchRef}></div>
				<div className="h-full opacity-20 w-1/2" ref={rightTouchRef}></div>
			</div>
		</div>
	);
};

export default Canvas;
