import React, { useRef, useEffect, useMemo } from 'react';
import { PlayerType, RainType, FoodType, CanvasProps, EnumDirection, ControlType, EnvironmentType} from './Canvas.types';
import { useLayout } from '@core/contexts/index';
import { GameTheme } from './theme';

// [TODO] : di hape masi ga nyaman, secara responsivitas

const Canvas = (props: CanvasProps) => {
	const {
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

	const memoized_rains = useMemo(() => [], []);
	

	const GameScript = () => {
		let _isMounted = true;	
		
		
		/////////THE PLAYER (ORANGE BOX) OBJECT 
		class Player extends PlayerType {
			constructor () {
				super();

				this.IsAppearing = false;
				this.Height = 50;
				this.Width = 50;
				this.Shadow = ENV.THEME.shadow;
				this.Color = ENV.THEME.dark;
				this.Blur = 25;
				this.Velocity = 5 * ENV.REALTIME;
				this.Emphasis = { alpha: 0.0, direction: 'up'};
				this.Shine = 0;
				
				this.IsAlive = true;
				this.EatCount = 0;
				this.TimeStart = 'initial';
				this.TimeEnd = 'initial';
				this.TimeSpan = 0;
				
				this.Position = {
					X: ENV.screenWidth < 744 ? ENV.screenWidth * 10 / 100 : ENV.screenWidth / 2 - 306,
					Y: ENV.screenHeight - this.Height
				};
			}
			
			NewGame = (option?: string) => {
				this.IsAlive = true;
				this.EatCount = 0;
				this.TimeStart = new Date().getTime();
				this.TimeEnd = 'initial';
				this.TimeSpan = 0;
				this.Shadow = ENV.THEME.shadow;
				this.Color = ENV.THEME.dark;
				
				food.Spawn();
				
				setGameStatus('running');
				setProcessMessage('');
				setAnimateValue(0);
				if(option !== 'no-glimpse') ENV.GlimpseHandler('regular');
			}
			
			DiscoverShield = () => {
				this.IsAppearing = true;

				this.NewGame('no-glimpse');

				setGameStatus('running');
				
				food.Spawn();
				
				for (const rain of rains) {
					if (rain){
						rain.Colorbox = '#888888';
						rain.Colortrail0 = 'rgba(200,200,200,1)';
						rain.Colortrail1 = 'rgba(200,200,200,0)';
					}
				}
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
						this.GameOver();
						this.DrawShine('init');
					}
				}
			};

			CheckEaten = () => {
				if (food.IsAppearing && player.Position.X <= food.PosX + food.Width && player.Position.X + player.Width >= food.PosX) {
					this.EatCount++;
					ENV.GlimpseHandler(this.EatCount);
					food.Spawn();
					this.DrawShine('init');
				}
			};			

			DrawShine = (action?: string) => {
				if (action === 'init') this.Shine = 1;
				if (this.Shine > 0.4) {
					ENV.ctx.shadowColor = '#0000';
					ENV.ctx.shadowBlur = 0;
					ENV.ctx.fillStyle = (!this.IsAlive ? '#000000' : ENV.THEME.light) + (this.Shine * 255/2).toString(16).split('.')[0];
					ENV.ctx.beginPath();
					ENV.ctx.rect(
						this.Position.X - (this.Width * (1 - (this.Shine - 1)) - this.Width) / 2,
						this.Position.Y - (this.Width * (1 - (this.Shine - 1)) - this.Width) / 2,
						this.Width * (1 - (this.Shine - 1)),
						this.Height * (1 - (this.Shine - 1))
					);
					ENV.ctx.fill();

					this.Shine -= 0.03 * ENV.REALTIME;
				}
			};
			
			DrawEmphasis = () => {
				if (this.IsAlive) {
					if (this.Emphasis.alpha >= 1.0) this.Emphasis.direction = 'down';
					if (this.Emphasis.alpha <= 0.0) this.Emphasis.direction = 'up';
					const speed = 0.005 * ENV.REALTIME;
					this.Emphasis.alpha += this.Emphasis.direction === 'up' ? speed : -speed;
					
					ENV.ctx.shadowColor = '#0000';
					ENV.ctx.shadowBlur = 0;
					ENV.ctx.fillStyle = ENV.THEME.light + (this.Emphasis.alpha * 255).toString(16).split('.')[0];
					ENV.ctx.beginPath();
					ENV.ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
					ENV.ctx.fill();
				}
			};
			
			Draw = () => {
				ENV.ctx.shadowColor = this.Shadow;
				ENV.ctx.shadowBlur = this.Blur;
				ENV.ctx.fillStyle = this.Color;
				ENV.ctx.beginPath();
				ENV.ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				ENV.ctx.fill();
			};
			
			DrawDialog = () => {
				const avoid = dialogAvoidRef.current;
				const ohno = dialogOhnoRef.current;
				
				avoid.style.left = `${this.Position.X + this.Width - 20}px`;
				ohno.style.left = `${this.Position.X + this.Width - 20}px`;
			};

			DialogHandler = (action: string, startingPosition?: number) => {
				const avoid = dialogAvoidRef.current;
				const ohno = dialogOhnoRef.current;
		
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

			GameOver = () => {
				if (this.IsAlive) setAnimateValue(this.TimeSpan);

				this.IsAlive = false;
				this.TimeEnd = new Date().getTime();
				this.Shadow = '#000';
				this.Color = '#000';
				
				food.Remove();
				this.DialogHandler('over');
				setGameStatus('over');
			}

			UpdateTimeSpan = () => {
				this.TimeSpan = this.TimeStart !== 'initial' ? new Date().getTime() - this.TimeStart : 0;
			}

			UpdateScoring = () => {
				if (this.IsAlive){
					setScore({
						food: player.EatCount,
						time: parseInt(((player.IsAppearing ? player.TimeSpan : 0) / 10).toFixed(0))
					});
				}
			}

			Move = (direction: EnumDirection) => {
				const vector = this.Velocity * {left: -1, right: 1, idle: 0}[direction];
				
				if (!(this.Position.X + vector < 0 || this.Position.X + vector > ENV.screenWidth - this.Width)) {
					this.Position.X += vector;
				} else if (this.Position.X > ENV.screenWidth - this.Width) {
					this.Position.X = ENV.screenWidth - (this.Width + 2);
				} else if (this.Position.X < 0) {
					this.Position.X = 0 + 2;
				}
			};

			Update = () => {
				this.Move(control.CONTROL_DIRECTION);
				this.CheckCollisions();
				this.CheckEaten();
				this.DrawShine();
				this.Draw();
				this.DrawEmphasis();
				this.DrawDialog();
				this.UpdateTimeSpan();
				this.UpdateScoring();
			};
		}


		/////////THE RAIN OBJECT
		class Rain extends RainType {
			constructor (index: number) {
				super();
				this.Colorbox = player.IsAppearing ? '#888888' : 'rgb(210,210,210)';
				this.Colortrail0 = player.IsAppearing ? 'rgba(200,200,200,1)' : 'rgba(220,220,220,1)';
				this.Colortrail1 = 'rgba(200,200,200,0)';
				this.AdditionalSpeed = 4;
				this.Base = 5;
				this.Size = 30;

				this.Height = this.Size;
				this.Width = this.Size;
				this.Velocity = (Math.random() * this.AdditionalSpeed + this.Base) * ENV.REALTIME;
				this.Index = index;

				this.Position = {
					X: this.RandomPosition(),
					Y: -this.Height
				};
			}

			RandomPosition = () => {
				let randomPos: number;
				do randomPos = Math.random() * (ENV.screenWidth + this.Size * 2) - this.Size;
				while (!player.IsAppearing && randomPos > player.Position.X - this.Size * 2 && randomPos < player.Position.X + this.Size * 2);
				return randomPos;
			}

			DrawHead = () => {
				ENV.ctx.beginPath();
				ENV.ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				ENV.ctx.fillStyle = this.Colorbox;
				ENV.ctx.shadowColor = 'gray';
				ENV.ctx.shadowBlur = 3;
				ENV.ctx.fill();
			};

			DrawTrail = () => {
				ENV.ctx.beginPath();
				ENV.ctx.rect(this.Position.X, this.Position.Y - 120, this.Width, this.Height * 4);
				this.TrailGradient = ENV.ctx.createLinearGradient(ENV.screenHeight / 2, this.Position.Y, ENV.screenHeight / 2, this.Position.Y - 120);
				this.TrailGradient.addColorStop(0, this.Colortrail0);
				this.TrailGradient.addColorStop(1, this.Colortrail1);
				ENV.ctx.fillStyle = this.TrailGradient;
				ENV.ctx.shadowColor = '#000';
				ENV.ctx.shadowBlur = 0;
				ENV.ctx.fill();
			};

			Move = () => {
				this.Position.Y += this.Velocity;
			}

			Remove = () => {
				rains[this.Index] = null;
			}

			Update = () => {
				if (this.Position.Y < ENV.screenHeight + this.Height * 5) {
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
				
				this.IsAppearing = false; 
				this.Width = 20;
				this.Height = 20;
				this.Color = ENV.THEME.dark;
				this.Shadow = ENV.THEME.shadow;
				this.Blur = 25;
				this.distance = 50;
				this.PosX = null;
			}
			
			RandomPosition = () => {
				let randomPos;
				do randomPos = Math.random() * (ENV.screenWidth - this.Width * 3) + this.Width;
				while (randomPos >= player.Position.X - (this.Width + this.distance) && randomPos <= player.Position.X + player.Width + this.distance);
				return randomPos;
			}

			Spawn = () => {
				this.IsAppearing = true;
				this.PosX = this.RandomPosition();
			}

			Remove = () => {
				this.IsAppearing = false;
			}

			Draw = () => {
				if (this.PosX > ENV.screenWidth - this.Width * 2) this.PosX = ENV.screenWidth - this.Width * 2;

				ENV.ctx.beginPath();
				ENV.ctx.rect(this.PosX, ENV.screenHeight - this.Height * 2, this.Width, this.Width);
				ENV.ctx.shadowColor = this.Shadow;
				ENV.ctx.shadowBlur = this.Blur;
				ENV.ctx.fillStyle = this.Color;
				ENV.ctx.fill();
			};

			Update = () => {
				this.Draw();
			};
		}


		/////////THE CONTROLLER INPUT
		class Control extends ControlType {
			constructor() {
				super();
				this.CONTROL_DIRECTION = 'idle';
				
				this.isRightPressed = false;
				this.isLeftPressed = false;
				
				this.newGameBtn = newGameBtnRef.current;
				this.right = rightTouchRef.current;
				this.left = leftTouchRef.current;
				this.isRightTouched = false;
				this.isLeftTouched = false;
			}

			Keyboard = {
				controlling: (e) => {
					if (e.which === 65 || e.which === 37) {
						//GO LEFT 
						this.isLeftPressed = true;
						this.CONTROL_DIRECTION = 'left';
						if (!player.IsAppearing) player.DiscoverShield();
					} else if (e.which === 68 || e.which === 39) {
						//GO RIGHT
						this.isRightPressed = true;
						this.CONTROL_DIRECTION = 'right';
						if (!player.IsAppearing) player.DiscoverShield();
					}
	
					//PRESSING ENTER
					const siderinput: HTMLInputElement = sideRef.current;
					if (e.which === 13 && !player.IsAlive && document.activeElement !== siderinput) {
						player.NewGame();
					}
					
					//AVOID UNEXPECTED SCROLLDOWN
					if (e.which === 40 && window.scrollY === 0) e.preventDefault();
	
					//SPECIAL THING
					else if (e.which === 16) {
						if (e.location === 1) ENV.GlimpseHandler('regular');
						else if (e.location === 2) ENV.GlimpseHandler('special');
					}
				},			
				uncontrolling: (e) => {
					if (e.which === 65 || e.which === 37) {
						this.isLeftPressed = false;
						this.CONTROL_DIRECTION = this.isRightPressed ? 'right' : 'idle';
					} else if (e.which === 68 || e.which === 39) {
						this.isRightPressed = false;
						this.CONTROL_DIRECTION = this.isLeftPressed ? 'left' : 'idle';
					}
				}
			}

			Touch = {
				controlRight: () => {
					this.isRightTouched = true;
					this.CONTROL_DIRECTION = 'right';
					if (!player.IsAppearing) player.DiscoverShield();
				},
				controlLeft: () => {
					this.isLeftTouched = true;
					this.CONTROL_DIRECTION = 'left';
					if (!player.IsAppearing) player.DiscoverShield();
				},
				uncontrolRight: () => {
					this.isRightTouched = false;
					this.CONTROL_DIRECTION = this.isLeftTouched ? 'left' : 'idle';
				},
				uncontrolLeft: () => {
					this.isLeftTouched = false;
					this.CONTROL_DIRECTION = this.isRightTouched ? 'right' : 'idle';
				},
			}
		}


		/////////THE CONTROLLER INPUT
		class Environment extends EnvironmentType {
			constructor () {
				super();

				this.FPS = 50;
				this.REALTIME = 100/this.FPS;

				this.IS_EXECUTED = false;
		
				/////////CANVAS INITIALIZATION 
				this.canvas = canvasRef.current;
				this.ctx = this.canvas.getContext('2d');
				
				this.screenWidth = window.innerWidth;
				this.screenHeight = window.innerHeight;
				this.canvas.width = this.screenWidth;
				this.canvas.height = this.screenHeight;
		
				
				/////////HANDLE INACTIVE TAB
				this.isTabInactive = false;
				
				
				/////////PICK THEME
				this.THEME = GameTheme[selectedTheme];
			}
			
			ReportWindowSize = () => {
				this.screenWidth = window.innerWidth;
				this.screenHeight = window.innerHeight;
				this.canvas.width = this.screenWidth;
				this.canvas.height = this.screenHeight;
	
				if (this.IS_EXECUTED) player.Position.Y = this.screenHeight - player.Height;
			};
			
			HandleInactive = () => {
				this.isTabInactive = document.hidden ? true : false;
			}

			GlimpseHandler = (score) => {
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

		}


		/////////RUNNING THE GAME :: Execute the game
		const ENV: Environment = new Environment();
		const control: Control = new Control();
		const player: Player = new Player();
		const food: Food = new Food();
		const rains: Rain[] = memoized_rains;
		
		
		const EXECUTE = () => {
			const IgniteGame = () => {
				const startingPosition = ENV.screenWidth < 744 ? ENV.screenWidth * 10 / 100 : ENV.screenWidth / 2 - 306;
				player.NewGame('no-glimpse');
				ENV.IS_EXECUTED = true;
	
				setGameStatus('ready');
				player.DialogHandler('init', startingPosition);
				
				//Controls registration
				control.newGameBtn.addEventListener('click', () => player.NewGame());
				document.addEventListener('keydown', control.Keyboard.controlling);
				document.addEventListener('keyup', control.Keyboard.uncontrolling);
				control.right.addEventListener('touchstart', control.Touch.controlRight, false);
				control.left.addEventListener('touchstart', control.Touch.controlLeft, false);
				control.right.addEventListener('touchend', control.Touch.uncontrolRight, false);
				control.left.addEventListener('touchend', control.Touch.uncontrolLeft, false);
			};
				
			if (skipIntro) {
				IgniteGame();
				return [null, null, null];
			}
			else {
				const delay = 1000;
				const timeoutIntro = setTimeout(() => ENV.GlimpseHandler('intro'), delay);
				const timeoutInitial = setTimeout(() => ENV.GlimpseHandler('regular'), delay + 3900);
				const timeoutExecute = setTimeout(IgniteGame, delay + 4500);
				return [timeoutIntro, timeoutInitial, timeoutExecute];
			}
			
		};
		const [timeoutIntro, timeoutInitial, timeoutExecute]: NodeJS.Timeout[] = EXECUTE();

		
		/////////RAINFALL GENERATOR
		const GenerateRain = () => {
			if (player.IsAlive && !ENV.isTabInactive && ENV.IS_EXECUTED) rains.push(new Rain(rains.length));
			
			const dynamicInterval = ENV.screenWidth > 540 ? 100 * (1366 / ENV.screenWidth) : 100 * (1366 / ENV.screenWidth) * 3 / 4;
			if (_isMounted) return setTimeout(GenerateRain, dynamicInterval); 
		};
		const GenerateRainTimeout: NodeJS.Timeout = GenerateRain();
		
		
		/////////SCREEN UPDATER
		const Updater = setInterval(() => {
			if (ENV.IS_EXECUTED) {
				//Reseting canvas
				ENV.ctx.clearRect(0, 0, ENV.screenWidth, ENV.screenHeight);

				//Then, redrawing objects
				if (player.IsAlive && player.IsAppearing && food.IsAppearing) food.Update();
				for (const rain of rains) if (rain) rain.Update();
				player.Update();
			}
		}, 1000/ENV.FPS);
		

		document.addEventListener('visibilitychange', ENV.HandleInactive);
		window.addEventListener('resize', ENV.ReportWindowSize);

		/////////USE-EFFECT CLEAN-UP
		return () => {
			document.removeEventListener('visibilitychange', ENV.HandleInactive);
			document.removeEventListener('keydown', control.Keyboard.controlling);
			document.removeEventListener('keyup', control.Keyboard.uncontrolling);
			window.removeEventListener('resize', ENV.ReportWindowSize);
			control.right.removeEventListener('touchstart', control.Touch.controlRight, false);
			control.left.removeEventListener('touchstart', control.Touch.controlLeft, false);
			control.right.removeEventListener('touchend', control.Touch.uncontrolRight, false);
			control.left.removeEventListener('touchend', control.Touch.uncontrolLeft, false);

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
