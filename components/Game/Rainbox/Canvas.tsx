import React, { useRef, useEffect, useMemo } from 'react';
import { PlayerInterface, RainInterface, FoodInterface, CanvasProps, EnumDirection, ControlInterface, SceneInterface} from './Canvas.types';
import { useLayout } from '@core/contexts';
import { useRainbox } from '@core/contexts/rainbox';
import { GameTheme } from './Decorative/theme';
import TouchControl from './TouchControl';

// [TODO] : di hape masi ga nyaman, secara responsivitas

const Canvas = ({responsive, skipIntro}: CanvasProps) => {
	const { setAnimateValue, setProcessMessage, setGameStatus, setScore } = useRainbox();
	const { sideRef, briRef, nrRef, etRef, newGameBtnRef, dialogAvoidRef, dialogOhnoRef } = useRainbox();

	const rightTouchRef = useRef<HTMLDivElement>(null);
	const leftTouchRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	
	const { selectedTheme } = useLayout();
	
	const memoized_rains = useMemo(() => [], []);
	
	const GameScript = () => {
		let _isMounted = true;

		const safeTimeout = (fn: () => void, time: number) => {
			const _timeout = setTimeout(fn, time);
			if (!_isMounted) clearTimeout(_timeout);
			return _timeout;
		};


		/////////THE PLAYER (ORANGE BOX) OBJECT 
		class Player extends PlayerInterface {
			constructor () {
				super();

				this.IsAppearing = false;
				this.Height = 50;
				this.Width = 50;
				this.Shadow = scene.THEME.shadow;
				this.Color = scene.THEME.dark;
				this.Blur = 25;
				this.Velocity = 5 * scene.REALTIME;
				this.Emphasis = { alpha: 0.0, direction: 'up'};
				this.Shine = 0;
				
				this.IsAlive = true;
				this.EatCount = 0;
				this.TimeStart = 'initial';
				this.TimeEnd = 'initial';
				this.TimeSpan = 0;
				
				this.Position = {
					X: scene.el.canvas.width < 744 ? scene.el.canvas.width * 10 / 100 : scene.el.canvas.width / 2 - 306,
					Y: scene.el.canvas.height - this.Height
				};
			}
			
			NewGame = ({noGlimpse, showAvoid}: {noGlimpse?: boolean, showAvoid?: boolean} = {}) => {
				this.IsAlive = true;
				this.EatCount = 0;
				this.TimeStart = new Date().getTime();
				this.TimeEnd = 'initial';
				this.TimeSpan = 0;
				this.Shadow = scene.THEME.shadow;
				this.Color = scene.THEME.dark;

				food.Spawn();
				
				setGameStatus('running');
				setProcessMessage('');
				setAnimateValue(0);
				if (!noGlimpse) scene.GlimpseHandler('regular');
				if (showAvoid) this.DialogHandler('init-avoid');
			}
			
			DiscoverShield = () => {
				this.IsAppearing = true;
				this.NewGame({noGlimpse: true});
				this.DialogHandler('remove-avoid');
				food.Spawn();
				
				setGameStatus('running');

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
					scene.GlimpseHandler(this.EatCount);
					food.Spawn();
					this.DrawShine('init');
				}
			};			

			DrawShine = (action?: string) => {
				if (action === 'init') this.Shine = 1;
				if (this.Shine > 0.4) {
					scene.ctx.shadowColor = '#0000';
					scene.ctx.shadowBlur = 0;
					scene.ctx.fillStyle = (!this.IsAlive ? '#000000' : scene.THEME.light) + (this.Shine * 255/2).toString(16).split('.')[0];
					scene.ctx.beginPath();
					scene.ctx.rect(
						this.Position.X - (this.Width * (1 - (this.Shine - 1)) - this.Width) / 2,
						this.Position.Y - (this.Width * (1 - (this.Shine - 1)) - this.Width) / 2,
						this.Width * (1 - (this.Shine - 1)),
						this.Height * (1 - (this.Shine - 1))
					);
					scene.ctx.fill();

					this.Shine -= 0.03 * scene.REALTIME;
				}
			};
			
			DrawEmphasis = () => {
				if (this.IsAlive) {
					if (this.Emphasis.alpha >= 1.0) this.Emphasis.direction = 'down';
					if (this.Emphasis.alpha <= 0.0) this.Emphasis.direction = 'up';
					const speed = 0.005 * scene.REALTIME;
					this.Emphasis.alpha += this.Emphasis.direction === 'up' ? speed : -speed;
					
					scene.ctx.shadowColor = '#0000';
					scene.ctx.shadowBlur = 0;
					scene.ctx.fillStyle = scene.THEME.light + (this.Emphasis.alpha * 255).toString(16).split('.')[0];
					scene.ctx.beginPath();
					scene.ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
					scene.ctx.fill();
				}
			};
			
			Draw = () => {
				scene.ctx.shadowColor = this.Shadow;
				scene.ctx.shadowBlur = this.Blur;
				scene.ctx.fillStyle = this.Color;
				scene.ctx.beginPath();
				scene.ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				scene.ctx.fill();
			};
			
			DrawDialog = () => {
				scene.el.avoid.style.left = `${this.Position.X + this.Width - 20}px`;
				scene.el.ohno.style.left = `${this.Position.X + this.Width - 20}px`;
			};

			DialogHandler = (action: string) => {
				switch (action) {
					case 'init-avoid':
						scene.el.avoid.style.transition = 'none';
						scene.el.avoid.style.opacity = '1';
						break;
					case 'remove-avoid':
						scene.el.avoid.style.transition = 'opacity 3s';
						scene.el.avoid.style.opacity = '0';
						break;
					case 'over':
						scene.el.avoid.style.display = 'none';
						scene.el.ohno.style.transition = 'none';
						scene.el.ohno.style.visibility = 'visible';
						scene.el.ohno.style.opacity = '1';
						
						safeTimeout(() => {
							scene.el.ohno.style.transition = 'opacity 2s, visibility 0s 2s';
							scene.el.avoid.style.display = 'flex';
							scene.el.ohno.style.visibility = 'hidden';
							scene.el.ohno.style.opacity = '0';
						}, 500);
						break;
				}
			};

			HandleResponsive = () => {
				player.Position.Y = scene.el.canvas.height - player.Height;
			}

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
				
				if (!(this.Position.X + vector < 0 || this.Position.X + vector > scene.el.canvas.width - this.Width)) {
					this.Position.X += vector;
				} else if (this.Position.X > scene.el.canvas.width - this.Width) {
					this.Position.X = scene.el.canvas.width - (this.Width + 2);
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
		class Rain extends RainInterface {
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
				this.Velocity = (Math.random() * this.AdditionalSpeed + this.Base) * scene.REALTIME;
				this.Index = index;

				this.Position = {
					X: this.RandomPosition(),
					Y: -this.Height
				};
			}

			RandomPosition = () => {
				let randomPos: number;
				do randomPos = Math.random() * (scene.el.canvas.width + this.Size * 2) - this.Size;
				while (!player.IsAppearing && randomPos > player.Position.X - this.Size * 2 && randomPos < player.Position.X + this.Size * 2);
				return randomPos;
			}

			DrawHead = () => {
				scene.ctx.beginPath();
				scene.ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
				scene.ctx.fillStyle = this.Colorbox;
				scene.ctx.shadowColor = 'gray';
				scene.ctx.shadowBlur = 3;
				scene.ctx.fill();
			};

			DrawTrail = () => {
				scene.ctx.beginPath();
				scene.ctx.rect(this.Position.X, this.Position.Y - 120, this.Width, this.Height * 4);
				this.TrailGradient = scene.ctx.createLinearGradient(scene.el.canvas.height / 2, this.Position.Y, scene.el.canvas.height / 2, this.Position.Y - 120);
				this.TrailGradient.addColorStop(0, this.Colortrail0);
				this.TrailGradient.addColorStop(1, this.Colortrail1);
				scene.ctx.fillStyle = this.TrailGradient;
				scene.ctx.shadowColor = '#000';
				scene.ctx.shadowBlur = 0;
				scene.ctx.fill();
			};

			Move = () => {
				this.Position.Y += this.Velocity;
			}

			Remove = () => {
				rains[this.Index] = null;
			}

			Update = () => {
				if (this.Position.Y < scene.el.canvas.height + this.Height * 5) {
					this.Move();
					this.DrawHead();
					this.DrawTrail();
				} else {
					this.Remove();
				}
			};
		}


		/////////THE FOOD OBJECT
		class Food extends FoodInterface {
			constructor () {
				super();
				
				this.IsAppearing = false; 
				this.Width = 20;
				this.Height = 20;
				this.Color = scene.THEME.dark;
				this.Shadow = scene.THEME.shadow;
				this.Blur = 25;
				this.distance = 50;
				this.PosX = null;
			}
			
			RandomPosition = () => {
				let randomPos;
				do randomPos = Math.random() * (scene.el.canvas.width - this.Width * 3) + this.Width;
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
				if (this.PosX > scene.el.canvas.width - this.Width * 2) this.PosX = scene.el.canvas.width - this.Width * 2;

				scene.ctx.beginPath();
				scene.ctx.rect(this.PosX, scene.el.canvas.height - this.Height * 2, this.Width, this.Width);
				scene.ctx.shadowColor = this.Shadow;
				scene.ctx.shadowBlur = this.Blur;
				scene.ctx.fillStyle = this.Color;
				scene.ctx.fill();
			};

			Update = () => {
				this.Draw();
			};
		}


		/////////THE CONTROLLER INPUT
		class Control extends ControlInterface {
			constructor() {
				super();
				this.CONTROL_DIRECTION = 'idle';
				
				this.isRightPressed = false;
				this.isLeftPressed = false;
				
				this.newGameBtn = scene.el.newGameBtn;
				this.right = scene.el.rightTouch;
				this.left = scene.el.leftTouch;
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
					if (e.which === 13 && !player.IsAlive && document.activeElement !== scene.el.side) {
						player.NewGame();
					}
					
					//AVOID UNEXPECTED SCROLLDOWN
					if (e.which === 40 && window.scrollY === 0) e.preventDefault();
	
					//SPECIAL THING
					else if (e.which === 16) {
						if (e.location === 1) scene.GlimpseHandler('regular');
						else if (e.location === 2) scene.GlimpseHandler('special');
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


		/////////THE sceneIRONMENT
		class Scene extends SceneInterface {
			constructor () {
				super();

				this.FPS = 50;
				this.REALTIME = 100/this.FPS;
				this.isTabInactive = false;
				this.THEME = GameTheme[selectedTheme];

				this.el = {
					side: sideRef.current,
					bri: briRef.current,
					nr: nrRef.current,
					et: etRef.current,
					newGameBtn: newGameBtnRef.current,
					avoid: dialogAvoidRef.current,
					ohno: dialogOhnoRef.current,
					rightTouch: rightTouchRef.current,
					leftTouch: leftTouchRef.current,
					canvas: canvasRef.current,
				};				
				
				this.ctx = this.el.canvas.getContext('2d');

				this.HandleResponsive();
			}
			
			HandleResponsive = () => {
				this.el.canvas.width = responsive.width(window);
				this.el.canvas.height = responsive.height(window);
			};
			
			HandleInactive = () => {
				this.isTabInactive = document.hidden ? true : false;
			}

			GlimpseHandler = (score) => {				
				const animate = (element) => {
					element.style.opacity = 1;
					
					safeTimeout(() => {
						element.style.opacity = 0;
					}, 200);
				};
					
				const animateIntro = (element) => {
					element.style.transition = '1s';
					element.style.opacity = 0;

					safeTimeout(() => {
						element.style.transition = '0.2s';
					}, 1000);
				};

				const animateSpecial = (et, nr, bri) => {
					et.style.opacity = 1;
					nr.style.opacity = 1;
					bri.style.opacity = 1;
						
					safeTimeout(() => {
						et.style.opacity = 0;
						nr.style.opacity = 0;
						bri.style.opacity = 0;
					}, 350);
				};

				const {et, nr, bri} = scene.el;

				if (score % 10 === 0 || score === 'special') {
					animateSpecial(et, nr, bri);
					safeTimeout(() => animateSpecial(et, nr, bri), 700);
					safeTimeout(() => animateSpecial(et, nr, bri), 1400);
				} else if (score % 5 === 0 || score === 'regular') {
					animate(et);
					safeTimeout(() => animate(nr), 150);
					safeTimeout(() => animate(bri), 400);
				} else if (score === 'intro') {
					setGameStatus('sub_intro');
					animateIntro(et);
					safeTimeout(() => animateIntro(bri), 500);
					safeTimeout(() => animateIntro(nr), 1000);
				}
			};
		}


		/////////RUNNING THE GAME :: Execute the game
		const scene: Scene = new Scene();
		const control: Control = new Control();
		const player: Player = new Player();
		const food: Food = new Food();
		const rains: Rain[] = memoized_rains;
		
		const EXECUTE = () => {
			let IS_EXECUTED = false;
			const timeouts: NodeJS.Timeout[] = [];
			const intervals: NodeJS.Timeout[] = [];
		
			const IgniteGame = () => {
				IS_EXECUTED = true;
				player.NewGame({noGlimpse: true, showAvoid: true});	
				setGameStatus('ready');
				
				//Controls registration
				control.newGameBtn.addEventListener('click', () => player.NewGame());
				document.addEventListener('keydown', control.Keyboard.controlling);
				document.addEventListener('keyup', control.Keyboard.uncontrolling);
				control.right.addEventListener('touchstart', control.Touch.controlRight, false);
				control.left.addEventListener('touchstart', control.Touch.controlLeft, false);
				control.right.addEventListener('touchend', control.Touch.uncontrolRight, false);
				control.left.addEventListener('touchend', control.Touch.uncontrolLeft, false);
			};
				
			if (skipIntro) IgniteGame();
			else {
				const delay = 1000;
				timeouts.push(setTimeout(() => scene.GlimpseHandler('intro'), delay));
				timeouts.push(setTimeout(() => scene.GlimpseHandler('regular'), delay + 3900));
				timeouts.push(setTimeout(IgniteGame, delay + 4500));
			}

			const Updater = () => setInterval(() => {
				if (IS_EXECUTED) {
					scene.ctx.clearRect(0, 0, scene.el.canvas.width, scene.el.canvas.height);
		
					if (player.IsAlive && player.IsAppearing && food.IsAppearing) food.Update();
					for (const rain of rains) if (rain) rain.Update();
					player.Update();
				}
			}, 1000/scene.FPS);
			intervals.push(Updater());

			const GenerateRain = () => {
				if (player.IsAlive && !scene.isTabInactive && IS_EXECUTED) rains.push(new Rain(rains.length));
				
				const dynamicInterval = scene.el.canvas.width > 540 ? 100 * (1366 / scene.el.canvas.width) : 100 * (1366 / scene.el.canvas.width) * 3 / 4;
				return safeTimeout(GenerateRain, dynamicInterval);
			};
			timeouts.push(GenerateRain());

			return { intervals, timeouts };	
		};
		const { intervals, timeouts } = EXECUTE();
		
		
		document.addEventListener('visibilitychange', scene.HandleInactive);
		window.addEventListener('resize', scene.HandleResponsive);
		window.addEventListener('resize', player.HandleResponsive);

		/////////USE-EFFECT CLEAN-UP
		return () => {
			document.removeEventListener('visibilitychange', scene.HandleInactive);
			document.removeEventListener('keydown', control.Keyboard.controlling);
			document.removeEventListener('keyup', control.Keyboard.uncontrolling);
			window.removeEventListener('resize', scene.HandleResponsive);
			window.removeEventListener('resize', player.HandleResponsive);
			control.right.removeEventListener('touchstart', control.Touch.controlRight, false);
			control.right.removeEventListener('touchend', control.Touch.uncontrolRight, false);
			control.left.removeEventListener('touchstart', control.Touch.controlLeft, false);
			control.left.removeEventListener('touchend', control.Touch.uncontrolLeft, false);

			for (const interval of intervals) clearInterval(interval);
			for (const timeout of timeouts) clearTimeout(timeout);

			_isMounted = false;
		};
	};


	/////////HOOK THE SCRIPT TO USE-EFFECT  
	useEffect(GameScript, [selectedTheme]); 

	return (
		<div className="pointer-events-none flex-sc col full" style={{zIndex: -2}}>
			<canvas ref={canvasRef} className="absolute inset-0 full"/>
			<TouchControl leftTouchRef={leftTouchRef} rightTouchRef={rightTouchRef}/>
		</div>
	);
};

export default Canvas;
