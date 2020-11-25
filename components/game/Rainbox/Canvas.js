import React, { useRef, useEffect } from 'react'
import Styled from '@emotion/styled'

const Canvas = ({setgameStatus, setscore, newGameBtnRef, briRef, nrRef, etRef}) => {
    const rightTouchRef = useRef()
    const leftTouchRef = useRef()
    const canvasRef = useRef()
    
    useEffect(() => {
        
        /////////CANVAS INITIALIZATION 
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const navbarOffset = 60
        
        let screenHeight = window.innerHeight
        let screenWidth = window.innerWidth
        
        canvas.width = screenWidth
        canvas.height = screenHeight - navbarOffset

        
        /////////SCREEN RESIZE HANDLER
        const reportWindowSize = () => {
            screenWidth = window.innerWidth
            screenHeight = window.innerHeight
            canvas.width = screenWidth
            canvas.height = screenHeight - navbarOffset
        }
        window.addEventListener('resize', reportWindowSize)
        
        /////////GAMESCRIPT START :: execution delayed within 6.5 seconds
        const GameScript = () => {

            /////////FIRST ATTEMPT TO ENTER THE GAME
            let isAttempted = false

            const firstAttempt = () => { 
                if (!isAttempted){
                    
                isAttempted = true
                setgameStatus('running')
                
                RainConfig.colorbox = "#888888"
                RainConfig.colortrail0 = "rgba(200,200,200,1)"
                RainConfig.colortrail1 = "rgba(200,200,200,0)"

                food = new Food()
                player.TimeStart = new Date().getTime()
                player.TimeEnd = 'initial'
                player.TimeSpan = new Date().getTime()
                
                // if (screenWidth < 540) document.getElementById('game-container').requestFullscreen()
            }}

            /////////CONTROLLER - KEYBOARD EVENT HANDLER
            let isRightPressed = false
            let isLeftPressed = false

            const controlling = (e) => {
                if (e.which == 65 || e.which == 37){
                    //GO LEFT 
                    isLeftPressed = true
                    player.Velocity = -5
                    firstAttempt()
                } else if (e.which == 68 || e.which == 39){
                    //GO RIGHT
                    isRightPressed = true
                    player.Velocity = 5
                    firstAttempt()
                } else if (e.which == 13 && isGameOver) {
                    //PRESSING ENTER
                    NewGame()
                }
            }
            document.addEventListener('keydown', controlling)
            
            const uncontrolling = (e) => {
                if (e.which == 65 || e.which == 37){
                    isLeftPressed = false
                    player.Velocity = isRightPressed ? 5 : 0                
                }else if (e.which == 68 || e.which == 39){
                    isRightPressed = false
                    player.Velocity = isLeftPressed ? -5 : 0
                }
            }
            document.addEventListener('keyup', uncontrolling)

            /////////CONTROLLER - TOUCHSCREEN EVENT HANDLER
            const right = rightTouchRef.current
            const left = leftTouchRef.current

            let isRightTouched = false
            let isLeftTouched = false

            const controlRight = () => {
                    isRightTouched = true
                    player.Velocity = 5
                    firstAttempt()
            }
            const controlLeft = () => {
                    isLeftTouched = true
                    player.Velocity = -5
                    firstAttempt()
            }
            const uncontrolRight = () => {
                    isRightTouched = false
                    player.Velocity = isLeftTouched ? -5 : 0
            }
            const uncontrolLeft = () => {
                    isLeftTouched = false
                    player.Velocity = isRightTouched ? 5 : 0
            }

            right.addEventListener("touchstart", controlRight, false)
            left.addEventListener("touchstart", controlLeft, false)
            right.addEventListener("touchend", uncontrolRight, false)
            left.addEventListener("touchend", uncontrolLeft, false)
            
            /////////THE PLAYER (ORANGE BOX) OBJECT 
            function Player(posX){
                this.Height = 50
                this.Width = 50
                this.Shadow = 'orange'
                this.Color = "#FF5B14"
                this.Blur = 25
                this.Velocity = 0

                //Scoring things
                this.TimeStart = new Date().getTime()
                this.TimeEnd = 'initial'
                this.TimeSpan = new Date().getTime()
                this.EatCount = 0
                
                this.Position = {
                    X: posX, 
                    Y: screenHeight - this.Height - navbarOffset
                }

                this.checkCollisions = () => {
                    for (let i in shapes){
                        if (
                            this.Position.X <= shapes[i].Position.X + shapes[i].Width &&
                            this.Position.X + this.Width >= shapes[i].Position.X &&
                            this.Position.Y + this.Height >= shapes[i].Position.Y &&
                            this.Position.Y <= shapes[i].Position.Y + shapes[i].Height 
                            ){
                                GameOver()
                            }
                    }
                }

                this.checkEaten = function(){        
                    if(player.Position.X <= food.PosX + food.Width && player.Position.X + player.Width >= food.PosX){
                    this.EatCount++
                    GlimpseHandler(this.EatCount)
                    food = new Food()
                }}
                            
                this.Draw = () => {
                    ctx.shadowColor = this.Shadow
                    ctx.shadowBlur = this.Blur
                    ctx.fillStyle = this.Color
                    ctx.beginPath()
                    ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height)
                    ctx.fill()
                }
                
                this.Update = () => {
                    if (!(this.Position.X + this.Velocity < 0 || this.Position.X + this.Velocity > screenWidth - 50)){    
                        this.Position.X += this.Velocity
                    }else if (this.Position.X > screenWidth - this.Width){
                        this.Position.X = screenWidth - (this.Width+2)
                    }
                    
                    this.checkCollisions()
                    this.checkEaten()
                    this.Draw()
                }
            }
            

            ////////THE RAIN OBJECT
            const RainConfig = {
                colortrail0 : "rgba(220,220,220,1)",
                colortrail1 : "rgba(220,220,220,0)",
                colorbox : "rgb(210,210,210)",
                additionalSpeed : 4,
                base : 5,
                size : 30
            }

            function Rain(posX) {
                this.Height = RainConfig.size
                this.Width = RainConfig.size
                this.Velocity = Math.random() * RainConfig.additionalSpeed + RainConfig.base
                this.Index = shapeIndex
                this.Position = {
                    X: posX,
                    Y: -this.Height
                }
                
                shapes[shapeIndex++] = this
            
                this.DrawHead = function() {
                    ctx.beginPath()
                    ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height)
                    ctx.fillStyle = RainConfig.colorbox
                    ctx.shadowColor = 'gray'
                    ctx.shadowBlur = 3
                    ctx.fill()
                }

                this.DrawTrail = function() {
                    ctx.beginPath()
                    ctx.rect(this.Position.X, this.Position.Y-120, this.Width, this.Height*4)
                    this.TrailGradient = ctx.createLinearGradient(screenHeight/2, this.Position.Y, screenHeight/2, this.Position.Y-120 )
                    this.TrailGradient.addColorStop(0, RainConfig.colortrail0)
                    this.TrailGradient.addColorStop(1, RainConfig.colortrail1)
                    ctx.fillStyle = this.TrailGradient
                    ctx.shadowColor = 'rgba(0,0,0,0)'
                    ctx.shadowBlur = 0
                    ctx.fill()
                }

                this.Update = function(){
                    this.Position.Y += this.Velocity
                    this.DrawHead()
                    this.DrawTrail()
                }
            }


            /////////THE FOOD OBJECT
            function Food(){
                this.Width = 20
                this.Height = 20
                this.Color = "#FF5B14"
                this.Shadow = 'orange'
                this.Blur = 25
                this.distance = 50
                
                let randomPos
                do randomPos = Math.random()*(screenWidth-this.Width*3) + this.Width
                while (randomPos >= player.Position.X - (this.Width + this.distance) && randomPos <= player.Position.X + player.Width + this.distance)
                
                this.PosX = randomPos
            
                this.Draw = function(){
                    if (this.PosX > screenWidth - this.Width*2) this.PosX = screenWidth - this.Width*2

                    ctx.beginPath()
                    ctx.rect(this.PosX, screenHeight- navbarOffset - this.Height*2, this.Width, this.Width)
                    ctx.shadowColor = this.shadow
                    ctx.shadowBlur = this.Blur
                    ctx.fillStyle = this.Color
                    ctx.fill()
                }
            
                this.Update = function(){
                    this.Draw()
                }            
            }


            /////////GAME OVER HANDLER        
            const GameOver = () => { 
                if (!isGameOver && isAttempted){

                player.TimeSpan = new Date().getTime() - player.TimeSpan
                player.TimeEnd = new Date().getTime()
                player.Shadow = 'black'
                player.Color = 'black'

                setgameStatus('over')
                isGameOver = true
                food = {}

                console.log(player.EatCount + " " + player.TimeSpan)
            }}
                
                
            /////////NEW GAME HANDLER
            const newGameBtn = newGameBtnRef.current
            
            const NewGame = () => {
                setgameStatus('running')
                isGameOver = false

                player = new Player(player.Position.X)
                food = new Food()
            }
            newGameBtn.addEventListener('click', NewGame)


            /////////RUNNING GAME
            const startingPosition = screenWidth < 744 ? screenWidth*10/100 : screenWidth/2-306
            let player = new Player(startingPosition)
            let isGameOver = false
            let shapeIndex = 0 
            let shapes = {}
            let food = {}

            const calcTiming = () => {
                if (player.TimeEnd != 'initial'){
                    return player.TimeSpan
                }else{
                    return new Date().getTime() - player.TimeStart 
                }
            }

            const Updater = setInterval(() => {
                setscore({
                    food: player.EatCount, 
                    time: ((isAttempted ? calcTiming() : 0)/1000).toFixed(2)
                })

                //Reseting canvas
                ctx.clearRect(0, 0, screenWidth, screenHeight)

                //Then, redrawing objects
                if(!isGameOver && isAttempted) food.Update()
                for(let i in shapes) shapes[i].Update()
                player.Update()
                
            }, 10)
            
            const GenerateRain = () => {
                if (!isGameOver && !tabInactive){
                    let randomPos
                    do randomPos = Math.random()*(screenWidth + RainConfig.size*2) - RainConfig.size
                    while (!isAttempted && randomPos > player.Position.X - RainConfig.size*2 && randomPos < player.Position.X + RainConfig.size*2)
                    new Rain(randomPos)
                }  

                //i need the setInterval value to be dynamic, but it can't, 
                //so i use a recursive setTimout instead, it's interval value is dynamically changing based on screenWidth
                setTimeout( GenerateRain, screenWidth > 540 ? 100*(1366/screenWidth) : 100*(1366/screenWidth)/2)
            }
            GenerateRain() 

            /////////EVENT LISTENER HANDLER
            const playerOnResize = () => {
                player.Position.Y = screenHeight - player.Height - navbarOffset
            }
            window.addEventListener('resize', playerOnResize)
            
            let tabInactive = false
            
            document.addEventListener("visibilitychange", function() {
                tabInactive = document.hidden ? true : false
            })        
            
            /////////EVENT LISTENER CLEAN-UP
            return () => {
                document.removeEventListener('keydown', controlling)
                document.removeEventListener('keyup', uncontrolling)
                window.removeEventListener('resize', playerOnResize)
                // clearInterval(GenerateRain)
                clearInterval(Updater)
            }
        }
        /////////END GAMESCRIPT  
        
        
        /////////GLIMPSE HANDLER
        const GlimpseHandler = (score) => {
            const bri = briRef.current
            const nr = nrRef.current
            const et = etRef.current

            const animate = (element) => {
                element.style.opacity = 1

                setTimeout(() => {
                    element.style.opacity = 0
                }, 200)
            }

            const animateIntro = (element) => {
                element.style.transition = '1s'
                element.style.opacity = 0

                setTimeout(() => {
                    element.style.transition = '0.2s'
                }, 1000);
            }

            const animateSpecial = (et, nr, bri) => {
                et.style.opacity = 1
                nr.style.opacity = 1
                bri.style.opacity = 1

                setTimeout(() => {
                    et.style.opacity = 0
                    nr.style.opacity = 0
                    bri.style.opacity = 0
                }, 350)
            }

            if(score % 10 == 0 || score == 'special'){
                animateSpecial(et, nr, bri)
                setTimeout(() => animateSpecial(et, nr, bri), 700)
                setTimeout(() => animateSpecial(et, nr, bri), 1400)
            } else if (score % 5 == 0 || score == 'regular') {
                animate(et)
                setTimeout(() => animate(nr), 150)
                setTimeout(() => animate(bri), 400)
            } else if ( score == 'intro') {
                animateIntro(et)
                setTimeout(() => animateIntro(bri), 500)
                setTimeout(() => animateIntro(nr), 1000)
            }
        } 

        /////////TIMELINE EXECUTION (WEB CINEMATIC INTRO PART)
        const Execute = () => {
            let delay = 1000
            setTimeout(() => GlimpseHandler('intro'), delay)
            setTimeout(() => setgameStatus('subintro'), delay)
            setTimeout(() => GlimpseHandler('regular'), delay + 3900)
            setTimeout(() => setgameStatus('initial'), delay + 4500)
            setTimeout(() => GameScript(), delay + 4500)
        }
        window.addEventListener('load', Execute)
        
        /////////USE-EFFECT CLEAN-UP
        return () => {
            window.removeEventListener('resize', reportWindowSize)
            window.removeEventListener('load', Execute)
        }

    }, []) /////////END USE-EFFECT  


    return (
        <Wrapper> 
            <canvas ref={canvasRef} />
            <div className="control">
                <div className="touch-left" ref={leftTouchRef}></div>
                <div className="touch-right" ref={rightTouchRef}></div>
            </div>
        </Wrapper>
    )
}


const Wrapper = Styled.div(() =>`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    z-index: -1;

    .control{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: -1;

        div{
            height: 100%;
            opacity: 0.2;
            width: 50%;
        }
        
    }
`)

export default Canvas
