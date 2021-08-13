import React, { useRef, useEffect } from 'react';

const Canvas = ({ isInitialLoad, skipIntro, setanimateValue, setprocessMessage, setgameStatus, setscore, newGameBtnRef, dialogAvoidRef, dialogOhnoRef, sideRef, briRef, nrRef, etRef }: any) => {
	const rightTouchRef = useRef();
	const leftTouchRef = useRef();
	const canvasRef = useRef();

	useEffect(() => {
		let _isMounted = true;

		/////////CANVAS INITIALIZATION 
		const canvas: HTMLCanvasElement = canvasRef.current;
		const ctx = canvas.getContext('2d');
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

			if (executeGame) {
				player.Position.Y = screenHeight - player.Height - navbarOffset;
			}
		};
		window.addEventListener('resize', reportWindowSize);


		/////////GAMESCRIPT STARTS HERE

		/////////THE PLAYER (ORANGE BOX) OBJECT 
		class PlayerType {
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
				
				this.shine = 0;
				
				//Scoring things
				this.EatCount = 0;
				this.TimeStart = new Date().getTime();
				this.TimeEnd = 'initial';
				this.TimeSpan = new Date().getTime();
				
				this.Position = {
					X: posX,
					Y: screenHeight - this.Height - navbarOffset
				};
			}

			checkCollisions = () => {
				for (const i in shapes) {
					if (
						this.Position.X <= shapes[i].Position.X + shapes[i].Width &&
						this.Position.X + this.Width >= shapes[i].Position.X &&
						this.Position.Y + this.Height >= shapes[i].Position.Y &&
						this.Position.Y <= shapes[i].Position.Y + shapes[i].Height
					) {
						GameOver();
						this.shine = 0.025;
					}
				}
			};

			checkEaten = () => {
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
						this.Height * (1 + this.shine));
					ctx.fill();

					this.shine += 0.025;
					if (this.shine >= 0.75) this.shine = 0;
				}
			};

			dialogAttachment = () => {
				avoid.style.left = `${this.Position.X + 34}px`;
				ohno.style.left = `${this.Position.X + 34}px`;
			};

			Draw = () => {
				if (this.RGB.g == 152) this.RGBChange.g = -0.5;
				if (this.RGB.g == 74) this.RGBChange.g = 0.5;
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
				if (!(this.Position.X + this.Velocity < 0 || this.Position.X + this.Velocity > screenWidth - 50)) {
					this.Position.X += this.Velocity;
				} else if (this.Position.X > screenWidth - this.Width) {
					this.Position.X = screenWidth - (this.Width + 2);
				}
			};

			Update = () => {

				this.Move();
				this.dialogAttachment();
				this.checkCollisions();
				this.checkEaten();
				this.Draw();
				this.DrawShine();
			};
		}


		////////THE RAIN OBJECT
		const RainConfig = {
			colortrail0: 'rgba(220,220,220,1)',
			colortrail1: 'rgba(220,220,220,0)',
			colorbox: 'rgb(210,210,210)',
			additionalSpeed: 4,
			base: 5,
			size: 30
		};

		function Rain(posX) {
			this.Height = RainConfig.size;
			this.Width = RainConfig.size;
			this.Velocity = Math.random() * RainConfig.additionalSpeed + RainConfig.base;
			this.Index = shapeIndex;
			this.Position = {
				X: posX,
				Y: -this.Height
			};

			shapes[shapeIndex++] = this;

			this.DrawHead = () => {
				ctx.beginPath();
				ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				ctx.fillStyle = RainConfig.colorbox;
				ctx.shadowColor = 'gray';
				ctx.shadowBlur = 3;
				ctx.fill();
			};

			this.DrawTrail = () => {
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

			this.Update = () => {
				if (this.Position.Y < screenHeight - navbarOffset + this.Height * 5) {
					this.Position.Y += this.Velocity;
					this.DrawHead();
					this.DrawTrail();
					// if(player.EatCount % 5 != 0 || player.EatCount == 0) 
				}
			};
		}


		/////////THE FOOD OBJECT
		class FoodType {	
			Width: number;
			Height: number;
			Color: string;
			Shadow: string;
			Blur: number;
			distance: number;
			PosX: any;
		}
		
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

				setgameStatus('over');
				isGameOver = true;
				food = {};

				DialogHandler('over');
				setanimateValue(player.TimeSpan);
			}
		};


		/////////NEW GAME HANDLER
		const newGameBtn = newGameBtnRef.current;

		const NewGame = () => {
			setgameStatus('running');
			setprocessMessage('');
			GlimpseHandler('regular');
			isGameOver = false;

			player = new Player(player.Position.X);
			food = new Food();

			setanimateValue(0);
		};
		newGameBtn.addEventListener('click', NewGame);

		/////////FIRST ATTEMPT TO ENTER THE GAME
		let isAttempted = false;

		const firstAttempt = () => {
			if (!isAttempted) {

				isAttempted = true;
				setgameStatus('running');

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
			if (e.which == 65 || e.which == 37) {
				//GO LEFT 
				isLeftPressed = true;
				player.Velocity = -5;
				firstAttempt();
			} else if (e.which == 68 || e.which == 39) {
				//GO RIGHT
				isRightPressed = true;
				player.Velocity = 5;
				firstAttempt();
			} else if (e.which == 13 && isGameOver && document.activeElement !== siderinput) {
				//PRESSING ENTER
				NewGame();
			}

			//Special things
			else if (e.which == 16) {
				if (e.location == 1) GlimpseHandler('regular');
				else if (e.location == 2) GlimpseHandler('special');
			}
		};

		const uncontrolling = (e) => {
			if (e.which == 65 || e.which == 37) {
				isLeftPressed = false;
				player.Velocity = isRightPressed ? 5 : 0;
			} else if (e.which == 68 || e.which == 39) {
				isRightPressed = false;
				player.Velocity = isLeftPressed ? -5 : 0;
			}
		};

		/////////CONTROLLER - TOUCHSCREEN EVENT HANDLER
		const right: HTMLElement = rightTouchRef.current;
		const left: HTMLElement = leftTouchRef.current;

		let isRightTouched = false;
		let isLeftTouched = false;

		const controlRight = () => {
			isRightTouched = true;
			player.Velocity = 5;
			firstAttempt();
		};
		const controlLeft = () => {
			isLeftTouched = true;
			player.Velocity = -5;
			firstAttempt();
		};
		const uncontrolRight = () => {
			isRightTouched = false;
			player.Velocity = isLeftTouched ? -5 : 0;
		};
		const uncontrolLeft = () => {
			isLeftTouched = false;
			player.Velocity = isRightTouched ? 5 : 0;
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

			if (score % 10 == 0 || score == 'special') {
				animateSpecial(et, nr, bri);
				setTimeout(() => animateSpecial(et, nr, bri), 700);
				setTimeout(() => animateSpecial(et, nr, bri), 1400);
			} else if (score % 5 == 0 || score == 'regular') {
				animate(et);
				setTimeout(() => animate(nr), 150);
				setTimeout(() => animate(bri), 400);
			} else if (score == 'intro') {
				setgameStatus('sub.intro');
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
					ohno.style.opacity = 1;
					ohno.style.transition = '0s';

					setTimeout(() => {
						ohno.style.visibility = 'hidden';
						ohno.style.opacity = 0;
						ohno.style.transition = 'opacity 2s, visibility 0s 2s';

					}, 1000);
					break;
			}
		};

		/////////HANDLE INACTIVE TAB
		let tabInactive = false;
		const handleInactive = () => tabInactive = document.hidden ? true : false;
		document.addEventListener('visibilitychange', handleInactive);

		const siderinput = sideRef.current;

		/////////RUNNING THE GAME :: execution delayed within 5.5 seconds (for intro)
		const startingPosition = screenWidth < 744 ? screenWidth * 10 / 100 : screenWidth / 2 - 306;
		let player: Player | any = {};
		let isGameOver = false;
		let shapeIndex = 0;
		const shapes = {};
		let food: Food | any = {};
		let executeGame = false;
		const delay = 1000;

		const IgniteGame = () => {
			setgameStatus('initial');
			DialogHandler('init', startingPosition);
			player = new Player(startingPosition);
			executeGame = true;

			document.addEventListener('keydown', controlling);
			document.addEventListener('keyup', uncontrolling);
			right.addEventListener('touchstart', controlRight, false);
			left.addEventListener('touchstart', controlLeft, false);
			right.addEventListener('touchend', uncontrolRight, false);
			left.addEventListener('touchend', uncontrolLeft, false);
		};

		let timeoutIntro, timeoutInitial, timeoutExecute;

		let executeLoadedRun = false;
		const executeLoaded = () => {
			if (!executeLoadedRun) {
				executeLoadedRun = true;
				/////////TIMELINE EXECUTION (WEB CINEMATIC INTRO PART)
				if (skipIntro) IgniteGame();
				else {
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
			// canvas.style.backdropFilter =  player.EatCount % 5 == 0 && player.EatCount > 0? 'invert(100%) blur(4px)' : ''
			if (executeGame) {
				const calcTiming = () => {
					return player.TimeEnd != 'initial' ?
						player.TimeSpan : new Date().getTime() - player.TimeStart;
				};

				setscore({
					food: player.EatCount,
					time: ((isAttempted ? calcTiming() : 0) / 10).toFixed(0)
				});

				//Reseting canvas
				ctx.clearRect(0, 0, screenWidth, screenHeight);

				//Then, redrawing objects
				if (!isGameOver && isAttempted) food.Update();
				for (const i in shapes) shapes[i].Update();
				player.Update();
			}
		}, 10);

		let GenerateRainTimeout: NodeJS.Timeout;
		
		const GenerateRain = () => {
			if (!isGameOver && !tabInactive && executeGame) {
				let randomPos;
				do randomPos = Math.random() * (screenWidth + RainConfig.size * 2) - RainConfig.size;
				while (!isAttempted && randomPos > player.Position.X - RainConfig.size * 2 && randomPos < player.Position.X + RainConfig.size * 2);
				new Rain(randomPos);
			}

			const dynamicInterval = screenWidth > 540 ? 100 * (1366 / screenWidth) : 100 * (1366 / screenWidth) * 3 / 4;
			if (_isMounted) GenerateRainTimeout = setTimeout(GenerateRain, dynamicInterval); //i need the setInterval value to be dynamic, but it can't, so i use a recursive setTimout instead, it's interval value is dynamically changing based on screenWidth
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

	}, []); /////////END USE-EFFECT  


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
